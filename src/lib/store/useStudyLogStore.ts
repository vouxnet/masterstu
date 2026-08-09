import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./useAuthStore";

export interface StudyLog {
  id: string;
  activityType: "pomodoro" | "curriculum" | "exam" | "flashcard";
  subject: string;
  durationMinutes: number;
  questionsCount: number;
  examType: string;
  date: string;
  createdAt: string;
}

interface StudyLogState {
  logs: StudyLog[];
  streakFreezes: number;
  streakInsurance: boolean;
  streakFreezeUsedDates: string[];
  addLog: (log: Omit<StudyLog, "id" | "createdAt" | "examType"> & { examType?: string }) => void;
  getLogsForDate: (date: string, examType?: string) => StudyLog[];
  getLogsForWeek: (examType?: string) => StudyLog[];
  getTodayStats: (examType?: string) => { totalMinutes: number; totalQuestions: number; subjects: string[] };
  getWeeklyStats: (examType?: string) => { totalMinutes: number; totalQuestions: number; activeDays: number };
  getStreakCount: (examType?: string) => number;
  getLogsForExam: (examType: string) => StudyLog[];
  clearLogs: () => void;
  checkAndAwardFreezes: () => void;
  getStreakFreezeInfo: () => { freezes: number; insurance: boolean; streakProtected: boolean };
}

export const useStudyLogStore = create<StudyLogState>()(
  persist(
    (set, get) => ({
      logs: [],
      streakFreezes: 0,
      streakInsurance: false,
      streakFreezeUsedDates: [],

      addLog: (logData) => {
        const now = new Date();
        const activeExam = useAuthStore.getState().currentUser.activeExam;
        const newLog: StudyLog = {
          id: `log-${Date.now()}`,
          ...logData,
          examType: logData.examType || activeExam,
          date: logData.date || now.toISOString().split('T')[0],
          createdAt: now.toISOString(),
        };
        set((state) => ({ logs: [newLog, ...state.logs] }));
        get().checkAndAwardFreezes();
      },

      getLogsForExam: (examType: string) =>
        get().logs.filter((l) => l.examType === examType),

      getLogsForDate: (date: string, examType?: string) => {
        const baseLogs = examType ? get().getLogsForExam(examType) : get().logs;
        return baseLogs.filter((l) => l.date === date);
      },

      getLogsForWeek: (examType?: string) => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const baseLogs = examType ? get().getLogsForExam(examType) : get().logs;
        return baseLogs.filter((l) => new Date(l.createdAt) >= weekAgo);
      },

      getTodayStats: (examType?: string) => {
        const today = new Date().toISOString().split('T')[0];
        const baseLogs = examType ? get().getLogsForExam(examType) : get().logs;
        const todayLogs = baseLogs.filter((l) => l.date === today);
        return {
          totalMinutes: todayLogs.reduce((sum, l) => sum + l.durationMinutes, 0),
          totalQuestions: todayLogs.reduce((sum, l) => sum + l.questionsCount, 0),
          subjects: [...new Set(todayLogs.map((l) => l.subject).filter(Boolean))],
        };
      },

      getWeeklyStats: (examType?: string) => {
        const weekLogs = get().getLogsForWeek(examType);
        const activeDays = new Set(weekLogs.map((l) => l.date)).size;
        return {
          totalMinutes: weekLogs.reduce((sum, l) => sum + l.durationMinutes, 0),
          totalQuestions: weekLogs.reduce((sum, l) => sum + l.questionsCount, 0),
          activeDays,
        };
      },

      getStreakCount: (examType?: string) => {
        const baseLogs = examType ? get().getLogsForExam(examType) : get().logs;
        if (baseLogs.length === 0) return 0;
        const activeDates = new Set(baseLogs.map((l) => l.date));
        const usedFreezeDates = new Set(get().streakFreezeUsedDates);
        let currentFreezes = get().streakFreezes;
        let newUsedFreezeDates = [...get().streakFreezeUsedDates];
        let stateChanged = false;
        
        let streak = 0;
        const today = new Date();
        for (let i = 0; i <= 365; i++) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          const dateStr = d.toISOString().split('T')[0];
          
          if (activeDates.has(dateStr)) {
            streak++;
          } else if (usedFreezeDates.has(dateStr)) {
            streak++;
          } else if (i > 0) {
            if (currentFreezes > 0 && streak > 0) {
              currentFreezes--;
              streak++;
              newUsedFreezeDates.push(dateStr);
              usedFreezeDates.add(dateStr);
              stateChanged = true;
            } else {
              break;
            }
          }
        }
        
        if (stateChanged) {
          setTimeout(() => {
            set({ 
              streakFreezes: currentFreezes, 
              streakFreezeUsedDates: newUsedFreezeDates 
            });
          }, 0);
        }
        
        return streak;
      },

      clearLogs: () => set({ logs: [] }),

      checkAndAwardFreezes: () => {
        const streak = get().getStreakCount();
        const { streakFreezes, streakInsurance } = get();
        
        let newFreezes = streakFreezes;
        let newInsurance = streakInsurance;

        if (streak >= 30 && !streakInsurance) {
          newInsurance = true;
        }
        if (streak >= 3 && streakFreezes < 1) {
          newFreezes = 1;
        }
        if (streak >= 7 && streakFreezes < 2) {
          newFreezes = 2;
        }

        if (newFreezes !== streakFreezes || newInsurance !== streakInsurance) {
          set({ streakFreezes: newFreezes, streakInsurance: newInsurance });
        }
      },

      getStreakFreezeInfo: () => {
        const freezes = get().streakFreezes;
        const insurance = get().streakInsurance;
        return {
          freezes,
          insurance,
          streakProtected: freezes > 0 || insurance,
        };
      },
    }),
    { name: "asimptot_study_log_v1" }
  )
);

