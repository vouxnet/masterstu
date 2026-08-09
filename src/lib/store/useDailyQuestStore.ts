import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DailyQuest {
  id: string;
  type: 'solve_questions' | 'study_minutes' | 'flashcard_review' | 'save_exam' | 'streak_maintain';
  title: string;
  description: string;
  target: number;
  progress: number;
  completed: boolean;
  xpReward: number;
  icon: string;
}

interface DailyQuestState {
  quests: DailyQuest[];
  lastGeneratedDate: string;
  totalXP: number;
  generateDailyQuests: (activeExam: string) => void;
  updateQuestProgress: (questType: string, amount: number) => void;
  getTodayQuests: () => DailyQuest[];
  getCompletionRate: () => number;
}

export const useDailyQuestStore = create<DailyQuestState>()(
  persist(
    (set, get) => ({
      quests: [],
      lastGeneratedDate: '',
      totalXP: 0,

      generateDailyQuests: (activeExam: string) => {
        const today = new Date().toISOString().split('T')[0];
        if (get().lastGeneratedDate === today) return;

        const newQuests: DailyQuest[] = [
          {
            id: `q-solve-${today}`,
            type: 'solve_questions',
            title: 'Soru Canavarı',
            description: '20 soru çöz',
            target: 20,
            progress: 0,
            completed: false,
            xpReward: 50,
            icon: 'Target'
          },
          {
            id: `q-study-${today}`,
            type: 'study_minutes',
            title: 'Odaklanma Zamanı',
            description: '30 dakika çalış',
            target: 30,
            progress: 0,
            completed: false,
            xpReward: 40,
            icon: 'Clock'
          },
          {
            id: `q-flash-${today}`,
            type: 'flashcard_review',
            title: 'Hafıza Ustası',
            description: '10 flashcard tekrarla',
            target: 10,
            progress: 0,
            completed: false,
            xpReward: 30,
            icon: 'Brain'
          },
          {
            id: `q-exam-${today}`,
            type: 'save_exam',
            title: 'Deneme Vakti',
            description: '1 deneme sınavı kaydet',
            target: 1,
            progress: 0,
            completed: false,
            xpReward: 60,
            icon: 'FileText'
          },
          {
            id: `q-streak-${today}`,
            type: 'streak_maintain',
            title: 'İstikrar Şövalyesi',
            description: 'Günlük seriyi koru',
            target: 1,
            progress: 0,
            completed: false,
            xpReward: 25,
            icon: 'Flame'
          }
        ];

        set({
          quests: newQuests,
          lastGeneratedDate: today
        });
      },

      updateQuestProgress: (questType: string, amount: number) => {
        const today = new Date().toISOString().split('T')[0];
        if (get().lastGeneratedDate !== today) return;

        set((state) => {
          let gainedXP = 0;
          const updatedQuests = state.quests.map(quest => {
            if (quest.type === questType && !quest.completed) {
              const newProgress = Math.min(quest.progress + amount, quest.target);
              const completed = newProgress >= quest.target;
              if (completed) {
                gainedXP += quest.xpReward;
              }
              return { ...quest, progress: newProgress, completed };
            }
            return quest;
          });

          return {
            quests: updatedQuests,
            totalXP: state.totalXP + gainedXP
          };
        });
      },

      getTodayQuests: () => {
        const today = new Date().toISOString().split('T')[0];
        if (get().lastGeneratedDate !== today) return [];
        return get().quests;
      },

      getCompletionRate: () => {
        const quests = get().getTodayQuests();
        if (quests.length === 0) return 0;
        const completed = quests.filter(q => q.completed).length;
        return (completed / quests.length) * 100;
      }
    }),
    { name: 'asimptot_daily_quests_v1' }
  )
);
