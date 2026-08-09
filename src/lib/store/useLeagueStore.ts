import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAuthStore } from './useAuthStore';
import { useFriendStore } from './useFriendStore';

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

interface LeagueState {
  currentTier: LeagueTier;
  weeklyXP: number;
  totalXP: number;
  weekStartDate: string;
  addXP: (amount: number) => void;
  getCurrentRank: () => number;
  getLeagueInfo: () => { tier: LeagueTier; config: typeof LEAGUE_CONFIG[LeagueTier]; rank: number; totalMembers: number };
  getLeaderboard: () => LeagueMember[];
  resetWeek: () => void;
  resetLeague: () => void;
}

export const useLeagueStore = create<LeagueState>()(
  persist(
    (set, get) => ({
      currentTier: 'bronze',
      weeklyXP: 0,
      totalXP: 0,
      weekStartDate: new Date().toISOString(),

      addXP: (amount: number) => {
        set((state) => ({
          weeklyXP: state.weeklyXP + amount,
          totalXP: state.totalXP + amount,
        }));
      },

      getCurrentRank: () => 1,

      getLeagueInfo: () => {
        const tier = get().currentTier;
        return {
          tier,
          config: LEAGUE_CONFIG[tier],
          rank: get().getCurrentRank(),
          totalMembers: get().getLeaderboard().length,
        };
      },

      getLeaderboard: () => {
        const currentUser = useAuthStore.getState().currentUser;
        const friends = useFriendStore.getState().friends || [];

        const members: LeagueMember[] = [
          {
            id: currentUser.id || 'me',
            name: currentUser.name || 'Sen',
            avatarUrl: currentUser.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
            weeklyXP: get().weeklyXP,
            rank: 1,
            isCurrentUser: true,
          },
          ...friends.map((f, idx) => ({
            id: f.id,
            name: f.name,
            avatarUrl: f.avatarUrl,
            weeklyXP: 0,
            rank: idx + 2,
            isCurrentUser: false,
          })),
        ];

        members.sort((a, b) => b.weeklyXP - a.weeklyXP);
        members.forEach((m, idx) => {
          m.rank = idx + 1;
        });

        return members;
      },

      resetWeek: () => {
        set({
          weeklyXP: 0,
          weekStartDate: new Date().toISOString(),
        });
      },

      resetLeague: () => {
        set({
          currentTier: 'bronze',
          weeklyXP: 0,
          totalXP: 0,
          weekStartDate: new Date().toISOString(),
        });
      },
    }),
    {
      name: 'asimptot_league_clean_v1',
    }
  )
);
