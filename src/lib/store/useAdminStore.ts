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
  category: "home" | "exams" | "placement" | "curriculum" | "flashcards" | "aihub" | "mistakes" | "global";
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

export interface FlashcardAdminRecord {
  id: string;
  subject: string;
  frontText: string;
  backText: string;
  category: string;
}

export interface CustomPageRecord {
  id: string;
  title: string;
  slug: string;
  category: "Temel Modüller" | "Pratik & Analiz" | "Özel Sayfalar";
  badge?: string;
  isVisible: boolean;
  isSystem: boolean;
  content: string;
  createdAt: string;
}

interface AdminState {
  users: AdminUserRecord[];
  cmsContents: CmsContentItem[];
  customExamPacks: ExamPack[];
  customDistributions: DistributionAdminRecord[];
  customFlashcards: FlashcardAdminRecord[];
  sitePages: CustomPageRecord[];

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

  // Flashcards CRUD
  addFlashcardRecord: (card: Omit<FlashcardAdminRecord, "id">) => void;
  deleteFlashcardRecord: (id: string) => void;

  // Site Page & Menu Manager CRUD
  addSitePage: (page: Omit<CustomPageRecord, "id" | "createdAt">) => void;
  togglePageVisibility: (id: string) => void;
  updateSitePage: (id: string, updated: Partial<CustomPageRecord>) => void;
  deleteSitePage: (id: string) => void;

  // Helper readers
  getCmsContent: (sectionKey: string, defaultTitle: string, defaultSubtitle?: string, defaultBody?: string) => { title: string; subtitle: string; bodyText: string };
  isPageVisible: (slug: string) => boolean;

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
    friendCode: "",
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

const DEFAULT_SITE_PAGES: CustomPageRecord[] = [
  { id: "page-exams", title: "📝 Deneme Sınavları", slug: "/exams", category: "Temel Modüller", isVisible: true, isSystem: true, content: "Canlı Deneme Sınavları", createdAt: "2026-01-01" },
  { id: "page-aihub", title: "🤖 Asimptot AI Hub", slug: "/ai-hub", category: "Temel Modüller", isVisible: true, isSystem: true, content: "AI Soru Koçu", createdAt: "2026-01-01" },
  { id: "page-curriculum", title: "📚 ÖSYM Müfredatı", slug: "/curriculum", category: "Temel Modüller", isVisible: true, isSystem: true, content: "Ders Müfredat Takibi", createdAt: "2026-01-01" },
  { id: "page-schedule", title: "🗓️ AI Haftalık Takvim", slug: "/ai-schedule", category: "Temel Modüller", isVisible: true, isSystem: true, content: "Haftalık Çalışma Takvimi", createdAt: "2026-01-01" },
  { id: "page-placement", title: "🎯 Atama Hedefi", slug: "/placement", category: "Pratik & Analiz", isVisible: true, isSystem: true, content: "Devlet Kadrosu Net Hedefleri", createdAt: "2026-01-01" },
  { id: "page-friends", title: "👥 Duo Pano", slug: "/friends", category: "Pratik & Analiz", isVisible: true, isSystem: true, content: "Çalışma Arkadaşı ve Duo Pano", createdAt: "2026-01-01" },
  { id: "page-sharedqa", title: "Canlı Panolar", slug: "/shared-qa", category: "Pratik & Analiz", isVisible: true, isSystem: true, content: "Canlı Soru Paylaşım Panosu", createdAt: "2026-01-01" },
  { id: "page-mistakes", title: "Yanlış Kutusu", slug: "/mistakes", category: "Pratik & Analiz", isVisible: true, isSystem: true, content: "Hatalı Soru Kasası", createdAt: "2026-01-01" },
  { id: "page-flashcards", title: "Bilgi Kartları", slug: "/flashcards", category: "Pratik & Analiz", isVisible: true, isSystem: true, content: "Hızlı Tekrar Kapsülleri", createdAt: "2026-01-01" },
  { id: "page-distrib", title: "📊 Soru Dağılımları", slug: "/question-distribution", category: "Pratik & Analiz", isVisible: true, isSystem: true, content: "ÖSYM Soru Dağılımları", createdAt: "2026-01-01" },
  { id: "page-skilltree", title: "🌳 Yetenek Ağacı", slug: "/skill-tree", category: "Pratik & Analiz", isVisible: true, isSystem: true, content: "Kazanım Ağacı", createdAt: "2026-01-01" },
];

const DEFAULT_CMS_CONTENTS: CmsContentItem[] = [
  {
    id: "cms-home-welcome",
    page: "Gösterge Paneli (/)",
    category: "home",
    sectionKey: "home_welcome",
    title: "Hoş Geldin! 🎯",
    subtitle: "Kişiselleştirilmiş ÖSYM Çalışma Stüdyosu",
    bodyText: "Bugün hedeflerinizi tamamlayın, eksik konularınızı tespit edin ve ÖSYM standartlarında netlerinizi artırın.",
    updatedAt: new Date().toISOString().split("T")[0],
  },
  {
    id: "cms-exams-header",
    page: "Deneme Sınavları (/exams)",
    category: "exams",
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
      customFlashcards: [],
      sitePages: DEFAULT_SITE_PAGES,

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

      // Flashcards CRUD
      addFlashcardRecord: (card) => {
        const newCard: FlashcardAdminRecord = {
          ...card,
          id: `fc-${Date.now()}`,
        };
        set((state) => ({ customFlashcards: [newCard, ...state.customFlashcards] }));
      },

      deleteFlashcardRecord: (id) => {
        set((state) => ({
          customFlashcards: state.customFlashcards.filter((c) => c.id !== id),
        }));
      },

      // Site Page & Menu Manager CRUD
      addSitePage: (page) => {
        const newPage: CustomPageRecord = {
          ...page,
          id: `page-${Date.now()}`,
          createdAt: new Date().toISOString().split("T")[0],
        };
        set((state) => ({ sitePages: [...state.sitePages, newPage] }));
      },

      togglePageVisibility: (id) => {
        set((state) => ({
          sitePages: state.sitePages.map((p) => (p.id === id ? { ...p, isVisible: !p.isVisible } : p)),
        }));
      },

      updateSitePage: (id, updated) => {
        set((state) => ({
          sitePages: state.sitePages.map((p) => (p.id === id ? { ...p, ...updated } : p)),
        }));
      },

      deleteSitePage: (id) => {
        set((state) => ({
          sitePages: state.sitePages.filter((p) => (p.isSystem ? p : p.id !== id)),
        }));
      },

      // Helper readers
      getCmsContent: (sectionKey, defaultTitle, defaultSubtitle = "", defaultBody = "") => {
        const found = get().cmsContents.find((c) => c.sectionKey === sectionKey);
        if (found) {
          return {
            title: found.title,
            subtitle: found.subtitle,
            bodyText: found.bodyText,
          };
        }
        return {
          title: defaultTitle,
          subtitle: defaultSubtitle,
          bodyText: defaultBody,
        };
      },

      isPageVisible: (slug) => {
        const found = get().sitePages.find((p) => p.slug === slug);
        return found ? found.isVisible : true;
      },

      resetToDefaults: () => {
        set({
          users: DEFAULT_USERS,
          cmsContents: DEFAULT_CMS_CONTENTS,
          customExamPacks: ALL_EXAM_PACKS,
          customDistributions: [],
          customFlashcards: [],
          sitePages: DEFAULT_SITE_PAGES,
        });
      },
    }),
    {
      name: "asimptot_admin_store_v3",
    }
  )
);
