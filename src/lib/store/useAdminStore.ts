import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ALL_EXAM_PACKS, ExamPack } from "@/src/lib/data/examPacks";
import { DuelQuestion } from "@/src/lib/data/duelQuestions";

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  role: "lisans_alan" | "onlisans_alan" | "admin";
  roleLabel: string;
  friendCode: string;
  selectedExams: string[];
  activeExam: string;
  createdAt: string;
  status: "active" | "blocked";
}

export interface CmsContentItem {
  id: string;
  page: string;
  sectionKey: string;
  title: string;
  subtitle: string;
  bodyText: string;
  updatedAt: string;
}

export interface DistributionAdminRecord {
  id: string;
  examType: "kpss_lisans" | "kpss_onlisans";
  subject: string;
  topic: string;
  questionCount: number;
  importance: "high" | "medium" | "low";
}

interface AdminState {
  users: AdminUserRecord[];
  cmsContents: CmsContentItem[];
  customExamPacks: ExamPack[];
  customDistributions: DistributionAdminRecord[];

  // User CRUD
  addUser: (user: Omit<AdminUserRecord, "id" | "createdAt">) => void;
  updateUser: (id: string, data: Partial<AdminUserRecord>) => void;
  deleteUser: (id: string) => void;

  // CMS Content CRUD
  updateCmsContent: (id: string, title: string, subtitle: string, bodyText: string) => void;
  addCmsContent: (item: Omit<CmsContentItem, "id" | "updatedAt">) => void;
  deleteCmsContent: (id: string) => void;

  // Exam & Question CRUD
  addExamPack: (pack: ExamPack) => void;
  updateExamPack: (id: string, updated: Partial<ExamPack>) => void;
  deleteExamPack: (id: string) => void;
  updateQuestionInPack: (packId: string, questionId: string, updatedQuestion: Partial<DuelQuestion>) => void;
  addQuestionToPack: (packId: string, newQuestion: DuelQuestion) => void;
  deleteQuestionFromPack: (packId: string, questionId: string) => void;

  // Distribution CRUD
  addDistributionRecord: (record: Omit<DistributionAdminRecord, "id">) => void;
  updateDistributionRecord: (id: string, updated: Partial<DistributionAdminRecord>) => void;
  deleteDistributionRecord: (id: string) => void;

  // Reset
  resetToDefaults: () => void;
}

const DEFAULT_USERS: AdminUserRecord[] = [
  {
    id: "usr-admin-1",
    name: "Sistem Yöneticisi",
    email: "admin@asimptot.app",
    role: "admin",
    roleLabel: "Master Super Admin",
    friendCode: "#ADMIN2026",
    selectedExams: ["kpss_lisans", "kpss_onlisans"],
    activeExam: "kpss_lisans",
    createdAt: "2026-01-01",
    status: "active",
  },
  {
    id: "usr-demo-1",
    name: "Örnek Lisans Adayı",
    email: "lisans@asimptot.app",
    role: "lisans_alan",
    roleLabel: "KPSS Lisans",
    friendCode: "#LISANS2026",
    selectedExams: ["kpss_lisans"],
    activeExam: "kpss_lisans",
    createdAt: "2026-02-15",
    status: "active",
  },
  {
    id: "usr-demo-2",
    name: "Örnek Önlisans Adayı",
    email: "onlisans@asimptot.app",
    role: "onlisans_alan",
    roleLabel: "KPSS Önlisans",
    friendCode: "#ONLISANS2026",
    selectedExams: ["kpss_onlisans"],
    activeExam: "kpss_onlisans",
    createdAt: "2026-03-10",
    status: "active",
  },
];

const DEFAULT_CMS_CONTENTS: CmsContentItem[] = [
  {
    id: "cms-home-banner",
    page: "Gösterge Paneli (/)",
    sectionKey: "home_banner",
    title: "ÖSYM Sınav Modu & Hazırlık Paneli",
    subtitle: "Kişiselleştirilmiş yapay zeka çalışma asistanınız ve canlı deneme merkeziniz.",
    bodyText: "Günlük hedeflerinizi tamamlayın, eksik konularınızı tespit edin ve ÖSYM standartlarında netlerinizi artırın.",
    updatedAt: new Date().toISOString().split("T")[0],
  },
  {
    id: "cms-exams-header",
    page: "Deneme Sınavları (/exams)",
    sectionKey: "exams_header",
    title: "Deneme Sınavları Merkezi & ÖSYM Hesaplayıcı",
    subtitle: "ÖSYM standart katsayıları ile P3 (Lisans) ve P93 (Önlisans) Puan Hesaplama & Canlı Deneme Çözümü",
    bodyText: "Gerçek sınav süresi, optik form soru geçiş gridi ve açıklamalı soru analizleriyle canlı çözün.",
    updatedAt: new Date().toISOString().split("T")[0],
  },
];

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      users: DEFAULT_USERS,
      cmsContents: DEFAULT_CMS_CONTENTS,
      customExamPacks: ALL_EXAM_PACKS,
      customDistributions: [],

      // User CRUD
      addUser: (user) => {
        const newUser: AdminUserRecord = {
          ...user,
          id: `usr-${Date.now()}`,
          createdAt: new Date().toISOString().split("T")[0],
        };
        set((state) => ({ users: [newUser, ...state.users] }));
      },

      updateUser: (id, data) => {
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, ...data } : u)),
        }));
      },

      deleteUser: (id) => {
        set((state) => ({
          users: state.users.filter((u) => u.id !== id),
        }));
      },

      // CMS CRUD
      updateCmsContent: (id, title, subtitle, bodyText) => {
        set((state) => ({
          cmsContents: state.cmsContents.map((c) =>
            c.id === id ? { ...c, title, subtitle, bodyText, updatedAt: new Date().toISOString().split("T")[0] } : c
          ),
        }));
      },

      addCmsContent: (item) => {
        const newItem: CmsContentItem = {
          ...item,
          id: `cms-${Date.now()}`,
          updatedAt: new Date().toISOString().split("T")[0],
        };
        set((state) => ({ cmsContents: [newItem, ...state.cmsContents] }));
      },

      deleteCmsContent: (id) => {
        set((state) => ({
          cmsContents: state.cmsContents.filter((c) => c.id !== id),
        }));
      },

      // Exam Pack & Question CRUD
      addExamPack: (pack) => {
        set((state) => ({ customExamPacks: [...state.customExamPacks, pack] }));
      },

      updateExamPack: (id, updated) => {
        set((state) => ({
          customExamPacks: state.customExamPacks.map((p) => (p.id === id ? { ...p, ...updated } : p)),
        }));
      },

      deleteExamPack: (id) => {
        set((state) => ({
          customExamPacks: state.customExamPacks.filter((p) => p.id !== id),
        }));
      },

      updateQuestionInPack: (packId, questionId, updatedQuestion) => {
        set((state) => ({
          customExamPacks: state.customExamPacks.map((pack) => {
            if (pack.id !== packId) return pack;
            const updatedQuestions = pack.questions.map((q) =>
              q.id === questionId ? { ...q, ...updatedQuestion } : q
            );
            return { ...pack, questions: updatedQuestions };
          }),
        }));
      },

      addQuestionToPack: (packId, newQuestion) => {
        set((state) => ({
          customExamPacks: state.customExamPacks.map((pack) => {
            if (pack.id !== packId) return pack;
            return {
              ...pack,
              totalQuestions: pack.questions.length + 1,
              questions: [...pack.questions, newQuestion],
            };
          }),
        }));
      },

      deleteQuestionFromPack: (packId, questionId) => {
        set((state) => ({
          customExamPacks: state.customExamPacks.map((pack) => {
            if (pack.id !== packId) return pack;
            const filtered = pack.questions.filter((q) => q.id !== questionId);
            return {
              ...pack,
              totalQuestions: filtered.length,
              questions: filtered,
            };
          }),
        }));
      },

      // Distribution CRUD
      addDistributionRecord: (record) => {
        const newRecord: DistributionAdminRecord = {
          ...record,
          id: `dist-${Date.now()}`,
        };
        set((state) => ({ customDistributions: [newRecord, ...state.customDistributions] }));
      },

      updateDistributionRecord: (id, updated) => {
        set((state) => ({
          customDistributions: state.customDistributions.map((d) => (d.id === id ? { ...d, ...updated } : d)),
        }));
      },

      deleteDistributionRecord: (id) => {
        set((state) => ({
          customDistributions: state.customDistributions.filter((d) => d.id !== id),
        }));
      },

      resetToDefaults: () => {
        set({
          users: DEFAULT_USERS,
          cmsContents: DEFAULT_CMS_CONTENTS,
          customExamPacks: ALL_EXAM_PACKS,
          customDistributions: [],
        });
      },
    }),
    {
      name: "asimptot_admin_store_v1",
    }
  )
);
