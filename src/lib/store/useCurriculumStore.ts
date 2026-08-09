import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialCurriculumData, CurriculumTopic } from "@/src/lib/data/curriculumData";
import { dbService } from "@/src/lib/services/db";

interface CurriculumState {
  topics: CurriculumTopic[];
  isLoading: boolean;
  isSaving: boolean;
  
  // Async Actions
  fetchInitialData: (userId: string, examType: string) => Promise<void>;
  toggleTopicStatus: (id: string, userId: string) => Promise<void>;
  resetAllTopics: (userRole: string) => Promise<void>;
  setTopicStatus: (id: string, status: CurriculumTopic["status"]) => void;
  getTopicsForExam: (examType: string) => CurriculumTopic[];
}

export function examTypeToRole(examType: string): string {
  const map: Record<string, string> = {
    kpss_lisans: "lisans_alan",
    kpss_onlisans: "onlisans",
    kpss_ortaogretim: "ortaogretim",
    yds: "yds",
    ales: "ales",
  };
  return map[examType] || "lisans_alan";
}

export const useCurriculumStore = create<CurriculumState>()(
  persist(
    (set, get) => ({
      topics: initialCurriculumData,
      isLoading: false,
      isSaving: false,

      // Gelecekte Supabase'den veri çekecek olan metod
      fetchInitialData: async (userId: string, examType: string) => {
        set({ isLoading: true });
        try {
          const data = await dbService.fetchCurriculumProgress(userId, examType);
          if (data) {
            // set({ topics: data });
          }
          // Şimdilik LocalStorage'dan (persist) gelen 'topics'i ezmiyoruz ki demo çalışsın.
        } catch (error) {
          console.error("Veri çekme hatası:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      // Asenkron Durum Güncelleme
      toggleTopicStatus: async (id: string, userId: string) => {
        const { topics } = get();
        const topic = topics.find((t) => t.id === id);
        if (!topic) return;

        const nextStatus: CurriculumTopic["status"] =
          topic.status === "not_started"
            ? "studying"
            : topic.status === "studying"
            ? "solved"
            : topic.status === "solved"
            ? "review"
            : "not_started";

        // İyimser Arayüz (Optimistic UI) - Önce arayüzü güncelle, kullanıcının beklemesini engelle
        set((state) => ({
          topics: state.topics.map((t) => (t.id === id ? { ...t, status: nextStatus } : t)),
          isSaving: true,
        }));

        try {
          // Arka planda Supabase servisine yaz
          await dbService.updateTopicStatus(userId, topic.userRole || 'kpss_lisans', topic.topic, nextStatus);
        } catch (error) {
          console.error("Bulut güncelleme hatası:", error);
          // Hata olursa işlemi geri al (Rollback)
          set((state) => ({
            topics: state.topics.map((t) => (t.id === id ? { ...t, status: topic.status } : t)),
          }));
        } finally {
          set({ isSaving: false });
        }
      },

      setTopicStatus: (id: string, status: CurriculumTopic["status"]) =>
        set((state) => ({
          topics: state.topics.map((t) => (t.id === id ? { ...t, status } : t)),
        })),

      getTopicsForExam: (examType: string) => {
        const role = examTypeToRole(examType);
        return get().topics.filter((t) => t.userRole === role);
      },

      resetAllTopics: async (userRole: string) => {
        set({ isSaving: true });
        
        // Optimistic UI
        set((state) => ({
          topics: state.topics.map((t) =>
            t.userRole === userRole ? { ...t, status: "not_started" } : t
          ),
        }));

        try {
          // Gelecekte: await dbService.resetTopics(userId);
          await new Promise((resolve) => setTimeout(resolve, 800)); // Simülasyon
        } finally {
          set({ isSaving: false });
        }
      },
    }),
    {
      // KEY DEĞİŞTİRİLDİ: kpss_curriculum_storage_v3 → asimptot_curriculum_v1 (2026-08-08)
      // NOT: Bu değişiklik mevcut kullanıcıların localStorage'ını temizler. Demo modunda sorun değil.
      name: "asimptot_curriculum_v1",
    }
  )
);
