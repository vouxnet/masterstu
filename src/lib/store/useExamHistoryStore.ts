import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./useAuthStore";

export interface ExamResult {
  id: string;
  examType: string;
  examLabel: string;
  gyCorrect: number;
  gyWrong: number;
  gkCorrect: number;
  gkWrong: number;
  alanCorrect: number;
  alanWrong: number;
  gyNet: number;
  gkNet: number;
  alanNet: number;
  totalNet: number;
  estimatedScore: number;
  scoreType: string;
  notes: string;
  date: string;
  createdAt: string;
}

interface ExamHistoryState {
  results: ExamResult[];
  addResult: (result: Omit<ExamResult, "id" | "createdAt" | "examType"> & { examType?: string }) => void;
  deleteResult: (id: string) => void;
  getLastN: (n: number, examType?: string) => ExamResult[];
  getBestScore: (examType?: string) => ExamResult | null;
  getTrend: (examType?: string) => number[];
  getResultsForExam: (examType: string) => ExamResult[];
}

export const useExamHistoryStore = create<ExamHistoryState>()(
  persist(
    (set, get) => ({
      results: [],

      addResult: (data) => {
        const activeExam = useAuthStore.getState().currentUser.activeExam;
        const newResult: ExamResult = {
          id: `exam-${Date.now()}`,
          ...data,
          examType: data.examType || activeExam,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ results: [newResult, ...state.results] }));
      },

      deleteResult: (id: string) =>
        set((state) => ({ results: state.results.filter((r) => r.id !== id) })),

      getResultsForExam: (examType: string) => 
        get().results.filter((r) => r.examType === examType),

      getLastN: (n: number, examType?: string) => {
        const baseResults = examType ? get().getResultsForExam(examType) : get().results;
        return baseResults.slice(0, n);
      },

      getBestScore: (examType?: string) => {
        const baseResults = examType ? get().getResultsForExam(examType) : get().results;
        if (baseResults.length === 0) return null;
        return baseResults.reduce((best, r) =>
          r.estimatedScore > best.estimatedScore ? r : best
        );
      },

      getTrend: (examType?: string) => {
        const baseResults = examType ? get().getResultsForExam(examType) : get().results;
        return baseResults.slice(0, 5).map((r) => r.totalNet).reverse();
      },
    }),
    { name: "asimptot_exam_history_v1" }
  )
);

