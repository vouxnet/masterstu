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

interface AdminState {
  users: AdminUserRecord[];
  cmsContents: CmsContentItem[];
  customExamPacks: ExamPack[];
  customDistributions: DistributionAdminRecord[];
  customFlashcards: FlashcardAdminRecord[];

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

  // Helper reader
  getCmsContent: (sectionKey: string, defaultTitle: string, defaultSubtitle?: string, defaultBody?: string) => { title: string; subtitle: string; bodyText: string };

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

const DEFAULT_CMS_CONTENTS: CmsContentItem[] = [
  // --- ANA SAYFA METİNLERİ ---
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
    id: "cms-home-timer",
    page: "Gösterge Paneli (/)",
    category: "home",
    sectionKey: "home_timer",
    title: "Sınava Kalan Süre",
    subtitle: "Canlı Geri Sayım & Sayaç",
    bodyText: "ÖSYM Sınav gününe kadar kalan zamanınızı saniye saniye takip edin.",
    updatedAt: new Date().toISOString().split("T")[0],
  },
  {
    id: "cms-home-quests",
    page: "Gösterge Paneli (/)",
    category: "home",
    sectionKey: "home_quests",
    title: "Günlük Çalışma Görevleri",
    subtitle: "20 Soru Çöz, 30 Dk Çalış",
    bodyText: "Her gün düzenli görevleri tamamlayarak disiplinli çalışma alışkanlığı kazanın.",
    updatedAt: new Date().toISOString().split("T")[0],
  },
  {
    id: "cms-home-news",
    page: "Gösterge Paneli (/)",
    category: "home",
    sectionKey: "home_news",
    title: "ÖSYM Canlı Duyurular & Güncel Haberler",
    subtitle: "2025/2026 Sınav Takvimi ve Resmi Açıklamalar",
    bodyText: "KPSS Lisans ve Önlisans sınav kılavuzları, başvuru tarihleri ve güncel gelişmeleri anında öğrenin.",
    updatedAt: new Date().toISOString().split("T")[0],
  },
  {
    id: "cms-home-blindspot",
    page: "Gösterge Paneli (/)",
    category: "home",
    sectionKey: "home_blindspot",
    title: "Kör Nokta & Eksik Konu Analizi",
    subtitle: "Yapay Zeka Hata Haritası",
    bodyText: "Sık yanlış yaptığınız soru tiplerini ve öncelikli tekrar etmeniz gereken konuları tespit edin.",
    updatedAt: new Date().toISOString().split("T")[0],
  },
  {
    id: "cms-home-memorydecay",
    page: "Gösterge Paneli (/)",
    category: "home",
    sectionKey: "home_memorydecay",
    title: "Hafıza Eğrisi & Unutma Analizi",
    subtitle: "Ebbinghaus Tekrar Sistemi",
    bodyText: "Öğrendiğiniz bilgilerin hafızanızda kalıcılığını artırmak için ideal tekrar zamanlamasını görün.",
    updatedAt: new Date().toISOString().split("T")[0],
  },

  // --- DENEME SINAVLARI MERKEZİ ---
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
  {
    id: "cms-exams-brans",
    page: "Deneme Sınavları (/exams)",
    category: "exams",
    sectionKey: "exams_brans",
    title: "⚡ DERS BRANŞ DENEMELERİ",
    subtitle: "Ders Bazlı Branş Denemeleri",
    bodyText: "Zamanınız kısıtlıysa doğrudan Türkçe (30 Soru), Matematik (30 Soru), Tarih (27 Soru), Coğrafya (18 Soru) veya Vatandaşlık (15 Soru) çözün!",
    updatedAt: new Date().toISOString().split("T")[0],
  },

  // --- ATAMA HEDEFLERİ ---
  {
    id: "cms-placement-header",
    page: "Atama Hedefleri (/placement)",
    category: "placement",
    sectionKey: "placement_header",
    title: "🎯 Atama Hedefi & Taban Netler",
    subtitle: "Hedeflediğiniz Devlet Kadrosu & Bakanlık VHKİ / Uzmanlık Netleri",
    bodyText: "Ticaret Bakanlığı, İçişleri, Gelir İdaresi ve Sağlık Bakanlığı atanma net hedeflerinizi belirleyin.",
    updatedAt: new Date().toISOString().split("T")[0],
  },

  // --- MÜFREDAT & SORU DAĞILIMLARI ---
  {
    id: "cms-curriculum-header",
    page: "Müfredat Takibi (/curriculum)",
    category: "curriculum",
    sectionKey: "curriculum_header",
    title: "📚 ÖSYM Müfredat Takip Haritası",
    subtitle: "Tüm Derslerin Alt Konuları ve İlerleme Durumu",
    bodyText: "Tamamladığınız konuları işaretleyin, kalan konularınızı yüzde olarak izleyin.",
    updatedAt: new Date().toISOString().split("T")[0],
  },

  // --- BİLGİ KARTLARI ---
  {
    id: "cms-flashcards-header",
    page: "Bilgi Kartları (/flashcards)",
    category: "flashcards",
    sectionKey: "flashcards_header",
    title: "🎴 Hızlı Tekrar Bilgi Kartları",
    subtitle: "Tarih, Coğrafya, Vatandaşlık ve Güncel Kapsülleri",
    bodyText: "Kartları çevirerek kilit bilgileri saniyeler içinde zihninize kazıyın.",
    updatedAt: new Date().toISOString().split("T")[0],
  },

  // --- AI HUB ---
  {
    id: "cms-aihub-header",
    page: "Asimptot AI Hub (/ai-hub)",
    category: "aihub",
    sectionKey: "aihub_header",
    title: "🤖 Asimptot AI Soru Koçu & Asistanı",
    subtitle: "7/24 Canlı Yapay Zeka Rehberlik ve Çözüm Motoru",
    bodyText: "Anlamadığınız soruları sorun, kişiselleştirilmiş çalışma tavsiyeleri alın.",
    updatedAt: new Date().toISOString().split("T")[0],
  },

  // --- YANLIŞ KUTUSU ---
  {
    id: "cms-mistakes-header",
    page: "Yanlış Kutusu (/mistakes)",
    category: "mistakes",
    sectionKey: "mistakes_header",
    title: "📸 Hatalı Sorular Kasa ve Analizi",
    subtitle: "Fotoğrafını Çek, Yükle ve Yanlışlarını Tekrar Çöz",
    bodyText: "Sınavlarda ve testlerde yanlış yaptığınız soruları arşivleyin, mantığını kavrayana kadar tekrar edin.",
    updatedAt: new Date().toISOString().split("T")[0],
  },

  // --- GENEL SLOGAN ---
  {
    id: "cms-global-manifesto",
    page: "Genel Platform Metinleri",
    category: "global",
    sectionKey: "global_manifesto",
    title: "Asimptot ÖSYM Hazırlık Platformu",
    subtitle: "Sınırlarını zorla, başarıya yaklaş.",
    bodyText: "ÖSYM formatında hazırlanmış özgün içerikler, yapay zeka analitiği ve net takip sistemleri.",
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

      // Helper reader for components
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

      resetToDefaults: () => {
        set({
          users: DEFAULT_USERS,
          cmsContents: DEFAULT_CMS_CONTENTS,
          customExamPacks: ALL_EXAM_PACKS,
          customDistributions: [],
          customFlashcards: [],
        });
      },
    }),
    {
      name: "asimptot_admin_store_v2",
    }
  )
);
