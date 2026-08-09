import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAuthStore } from './useAuthStore';

export type LeagueTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'obsidian';

export interface LeagueMember {
  id: string;
  name: string;
  avatarUrl: string;
  weeklyXP: number;
  rank: number;
  isCurrentUser: boolean;
}

export const LEAGUE_CONFIG: Record<LeagueTier, { name: string; emoji: string; color: string; minXP: number; promotionSlots: number; relegationSlots: number }> = {
  bronze: { name: 'Bronz', emoji: '🥉', color: '#CD7F32', minXP: 0, promotionSlots: 3, relegationSlots: 0 },
  silver: { name: 'Gümüş', emoji: '🥈', color: '#C0C0C0', minXP: 200, promotionSlots: 3, relegationSlots: 3 },
  gold: { name: 'Altın', emoji: '🥇', color: '#FFD700', minXP: 500, promotionSlots: 3, relegationSlots: 3 },
  platinum: { name: 'Platin', emoji: '💎', color: '#E5E4E2', minXP: 1000, promotionSlots: 3, relegationSlots: 3 },
  diamond: { name: 'Elmas', emoji: '💠', color: '#B9F2FF', minXP: 2000, promotionSlots: 3, relegationSlots: 3 },
  obsidian: { name: 'Obsidyen', emoji: '🖤', color: '#3D0C4F', minXP: 5000, promotionSlots: 0, relegationSlots: 3 },
};

const LEAGUE_ORDER: LeagueTier[] = ['bronze', 'silver', 'gold', 'platinum', 'diamond', 'obsidian'];

const BOT_NAMES = ['Elif Yıldız', 'Mehmet Kaya', 'Zeynep Demir', 'Ahmet Çelik', 'Ayşe Şahin', 'Burak Öztürk', 'Fatma Aydın', 'Emre Koç', 'Seda Arslan', 'Can Yılmaz', 'Merve Polat', 'Barış Eren', 'Deniz Güneş', 'Gizem Ak'];

interface LeagueState {
  currentTier: LeagueTier;
  weeklyXP: number;
  totalXP: number;
  weekStartDate: string;
  leaderboard: LeagueMember[];
  addXP: (amount: number) => void;
  getCurrentRank: () => number;
  checkWeekEnd: () => void;
  getLeagueInfo: () => { tier: LeagueTier; config: typeof LEAGUE_CONFIG[LeagueTier]; rank: number; totalMembers: number };
  resetWeek: () => void;
  resetLeague: () => void;
}

const generateLeaderboard = (tier: LeagueTier, currentUserXP: number): LeagueMember[] => {
  const minBaseXP = LEAGUE_CONFIG[tier].minXP;
  
  const bots: LeagueMember[] = BOT_NAMES.map((name, idx) => ({
    id: `bot-${idx}`,
    name,
    avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    weeklyXP: Math.floor(Math.random() * 500) + minBaseXP,
    rank: 0,
    isCurrentUser: false,
  }));

  const user: LeagueMember = {
    id: 'current-user',
    name: useAuthStore.getState().currentUser.name,
    avatarUrl: useAuthStore.getState().currentUser.avatarUrl,
    weeklyXP: currentUserXP,
    rank: 0,
    isCurrentUser: true,
  };

  const allMembers = [...bots, user].sort((a, b) => b.weeklyXP - a.weeklyXP);
  return allMembers.map((m, idx) => ({ ...m, rank: idx + 1 }));
};

export const useLeagueStore = create<LeagueState>()(
  persist(
    (set, get) => ({
      currentTier: 'bronze',
      weeklyXP: 0,
      totalXP: 0,
      weekStartDate: new Date().toISOString(),
      leaderboard: generateLeaderboard('bronze', 0),
      
      addXP: (amount) => set((state) => {
        const newWeeklyXP = state.weeklyXP + amount;
        
        // Update user in leaderboard
        let members = state.leaderboard.map(m => 
          m.isCurrentUser ? { ...m, weeklyXP: newWeeklyXP } : m
        );
        
        // Re-sort and update ranks
        members = members.sort((a, b) => b.weeklyXP - a.weeklyXP);
        members = members.map((m, idx) => ({ ...m, rank: idx + 1 }));
        
        return {
          weeklyXP: newWeeklyXP,
          totalXP: state.totalXP + amount,
          leaderboard: members
        };
      }),

      getCurrentRank: () => {
        const user = get().leaderboard.find(m => m.isCurrentUser);
        return user?.rank || 0;
      },

      checkWeekEnd: () => {
        const state = get();
        const start = new Date(state.weekStartDate);
        const now = new Date();
        const diff = now.getTime() - start.getTime();
        const days = diff / (1000 * 3600 * 24);

        if (days >= 7) {
          get().resetWeek();
        }
      },

      getLeagueInfo: () => {
        const state = get();
        return {
          tier: state.currentTier,
          config: LEAGUE_CONFIG[state.currentTier],
          rank: state.getCurrentRank(),
          totalMembers: state.leaderboard.length
        };
      },

      resetWeek: () => set((state) => {
        const rank = state.getCurrentRank();
        const config = LEAGUE_CONFIG[state.currentTier];
        const tierIdx = LEAGUE_ORDER.indexOf(state.currentTier);
        let newTier = state.currentTier;

        // Promote
        if (rank <= config.promotionSlots && tierIdx < LEAGUE_ORDER.length - 1) {
          newTier = LEAGUE_ORDER[tierIdx + 1];
        } 
        // Relegate
        else if (rank > state.leaderboard.length - config.relegationSlots && tierIdx > 0) {
          newTier = LEAGUE_ORDER[tierIdx - 1];
        }

        return {
          currentTier: newTier,
          weeklyXP: 0,
          weekStartDate: new Date().toISOString(),
          leaderboard: generateLeaderboard(newTier, 0)
        };
      }),

      resetLeague: () => set({
        currentTier: 'bronze',
        weeklyXP: 0,
        totalXP: 0,
        weekStartDate: new Date().toISOString(),
        leaderboard: generateLeaderboard('bronze', 0)
      })
    }),
    {
      name: 'asimptot-league-storage'
    }
  )
);
