import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ExamType = "kpss_lisans" | "kpss_onlisans" | "kpss_ortaogretim" | "yds" | "ales" | "yks_tyt" | "yks_ayt";

export interface ExamMeta {
  id: ExamType;
  title: string;
  shortLabel: string;
  badgeColor: string;
  targetDate: string; // ISO date string
  iconName: string;
  description: string;
}

export const EXAM_METADATA: Record<ExamType, ExamMeta> = {
  kpss_lisans: {
    id: "kpss_lisans",
    title: "KPSS Lisans + A Grubu",
    shortLabel: "KPSS Lisans",
    badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    targetDate: "2026-09-06T10:15:00+03:00",
    iconName: "GraduationCap",
    description: "GY-GK, Hukuk, İktisat, Maliye, Uluslararası İlişkiler",
  },
  kpss_onlisans: {
    id: "kpss_onlisans",
    title: "KPSS Önlisans",
    shortLabel: "KPSS Önlisans",
    badgeColor: "bg-pink-500/20 text-pink-300 border-pink-500/30",
    targetDate: "2026-10-04T10:15:00+03:00",
    iconName: "Flower2",
    description: "Türkçe, Matematik, Tarih, Coğrafya, Vatandaşlık, Güncel Bilgiler",
  },
  kpss_ortaogretim: {
    id: "kpss_ortaogretim",
    title: "KPSS Ortaöğretim (Lise)",
    shortLabel: "Ortaöğretim",
    badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    targetDate: "2026-11-22T10:15:00+03:00",
    iconName: "School",
    description: "Temel GY-GK, Türkçe, Matematik, Tarih, Coğrafya, Vatandaşlık",
  },
  yds: {
    id: "yds",
    title: "YDS / YÖKDİL İngilizce",
    shortLabel: "YDS / YÖKDİL",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    targetDate: "2026-10-25T10:15:00+03:00",
    iconName: "Globe",
    description: "Gramer, Kelime Bilgisi, Cümle Tamamlama, Paragraf, Çeviri",
  },
  ales: {
    id: "ales",
    title: "ALES / DGS Sınavı",
    shortLabel: "ALES / DGS",
    badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    targetDate: "2026-11-15T10:15:00+03:00",
    iconName: "BrainCircuit",
    description: "Sayısal Mantık, Sözel Mantık, Matematik, Türkçe Paragraf",
  },
  yks_tyt: {
    id: "yks_tyt",
    title: "YKS - TYT (Temel Yeterlilik)",
    shortLabel: "YKS TYT",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    targetDate: "2027-06-21T10:15:00+03:00",
    iconName: "BookOpen",
    description: "Türkçe, Matematik, Fen Bilimleri, Sosyal Bilimler",
  },
  yks_ayt: {
    id: "yks_ayt",
    title: "YKS - AYT (Alan Yeterlilik)",
    shortLabel: "YKS AYT",
    badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    targetDate: "2027-06-22T10:15:00+03:00",
    iconName: "Atom",
    description: "Matematik, Fizik, Kimya, Biyoloji, Edebiyat, Tarih, Coğrafya",
  },
};

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  friendCode: string;
  role: "lisans_alan" | "onlisans";
  roleLabel: string;
  selectedExams: ExamType[];
  activeExam: ExamType;
  avatarUrl: string;
  dailyQuestionTarget: number;
  completedQuestionsToday: number;
  completedTopicsToday: number;
  streakCount: number;
}

export interface SharedQuestionItem {
  id: string;
  senderName: string;
  senderRole: string;
  subject: string;
  questionText: string;
  imageUrl?: string;
  answerText?: string;
  answerImageUrl?: string;
  isResolved: boolean;
  createdAt: string;
}

export interface TodoItem {
  id: string;
  title: string;
  subject: string;
  completed: boolean;
}

interface AuthState {
  currentUser: UserProfile;
  partnerUser: UserProfile;
  duoStreak: number;
  sharedQuestions: SharedQuestionItem[];
  todos: TodoItem[];
  notificationMessage: string | null;
  isQuickActionOpen: boolean;
  
  // Actions
  switchUserRole: (role: "lisans_alan" | "onlisans") => void;
  setSelectedExams: (exams: ExamType[]) => void;
  setActiveExam: (exam: ExamType) => void;
  sendPokeToPartner: () => void;
  sendCheerToPartner: () => void;
  toggleTodo: (id: string) => void;
  addTodo: (title: string, subject: string) => void;
  addSharedQuestion: (subject: string, text: string, imageUrl?: string) => void;
  answerSharedQuestion: (id: string, text: string, imageUrl?: string) => void;
  setQuickActionOpen: (open: boolean) => void;
  clearNotification: () => void;
  updateUserProfile: (name: string, email: string, avatarUrl: string) => void;
}

const defaultUser1: UserProfile = {
  id: "user-1",
  name: "Bülent",
  email: "bulent@osym.com",
  friendCode: "#BULENT2026",
  role: "lisans_alan",
  roleLabel: "Bülent (Lisans + Alan)",
  selectedExams: ["kpss_lisans", "yds"],
  activeExam: "kpss_lisans",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  dailyQuestionTarget: 150,
  completedQuestionsToday: 85,
  completedTopicsToday: 3,
  streakCount: 14,
};

const defaultUser2: UserProfile = {
  id: "user-2-sena",
  name: "Sena",
  email: "sena@osym.com",
  friendCode: "#SENA2026",
  role: "onlisans",
  roleLabel: "Sena (Önlisans)",
  selectedExams: ["kpss_onlisans"],
  activeExam: "kpss_onlisans",
  avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  dailyQuestionTarget: 120,
  completedQuestionsToday: 95,
  completedTopicsToday: 4,
  streakCount: 14,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: defaultUser1,
      partnerUser: defaultUser2,
      duoStreak: 14,
      notificationMessage: null,
      isQuickActionOpen: false,

      sharedQuestions: [
        {
          id: "q-1",
          senderName: "Sena",
          senderRole: "Sena",
          subject: "Tarih",
          questionText: "2. Göktürk Devleti'nin kurucusu Kutluk Kağan'a verilen unvan nedir? Bülent bakabilir misin?",
          imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&auto=format&fit=crop&q=80",
          answerText: "İlteriş Kağan unvanı verilmiştir! (İli/devleti derleyen toplayan anlamına gelir)",
          isResolved: true,
          createdAt: "10 dakika önce",
        },
      ],

      todos: [
        { id: "t-1", title: "Hukuk - Anayasa Mahkemesi Üye Sayısı Tekrarı", subject: "Hukuk", completed: true },
        { id: "t-2", title: "İktisat - IS-LM Eğrileri 40 Soru Çözümü", subject: "İktisat", completed: false },
      ],

      switchUserRole: (role) => {
        if (role === "lisans_alan") {
          set({ currentUser: defaultUser1, partnerUser: defaultUser2 });
        } else {
          set({ currentUser: defaultUser2, partnerUser: defaultUser1 });
        }
      },

      setSelectedExams: (exams) => {
        const current = get().currentUser;
        const activeExam = exams.includes(current.activeExam) ? current.activeExam : (exams[0] || "kpss_lisans");
        set({
          currentUser: { ...current, selectedExams: exams, activeExam },
        });
      },

      setActiveExam: (activeExam) => {
        const current = get().currentUser;
        set({
          currentUser: { ...current, activeExam },
        });
      },

      sendPokeToPartner: () => {
        const partnerName = get().partnerUser.name;
        set({
          notificationMessage: `👉 ${partnerName} kullanıcısına neşeli ders hatırlatması "Dürt" gönderildi!`,
        });
      },

      sendCheerToPartner: () => {
        const partnerName = get().partnerUser.name;
        set({
          notificationMessage: `🎉 ${partnerName} tebrik edildi! Harika bir çalışma serisi devam ediyor!`,
        });
      },

      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
      },

      addTodo: (title, subject) => {
        const newTodo: TodoItem = {
          id: `t-${Date.now()}`,
          title,
          subject,
          completed: false,
        };
        set((state) => ({ todos: [newTodo, ...state.todos] }));
      },

      addSharedQuestion: (subject, text, imageUrl) => {
        const current = get().currentUser;
        const partner = get().partnerUser;
        const newItem: SharedQuestionItem = {
          id: `q-${Date.now()}`,
          senderName: current.name,
          senderRole: current.name,
          subject,
          questionText: text,
          imageUrl: imageUrl || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop&q=80",
          isResolved: false,
          createdAt: "Şimdi",
        };
        set((state) => ({
          sharedQuestions: [newItem, ...state.sharedQuestions],
          notificationMessage: `📸 Soru ${partner.name} kullanıcısının panosuna başarıyla yüklendi!`,
        }));
      },

      answerSharedQuestion: (id, text, imageUrl) => {
        set((state) => ({
          sharedQuestions: state.sharedQuestions.map((q) =>
            q.id === id
              ? {
                  ...q,
                  answerText: text,
                  answerImageUrl: imageUrl,
                  isResolved: true,
                }
              : q
          ),
          notificationMessage: `✅ Çözüm partnerinize iletildi!`,
        }));
      },

      setQuickActionOpen: (open) => set({ isQuickActionOpen: open }),

      clearNotification: () => set({ notificationMessage: null }),

      updateUserProfile: (name, email, avatarUrl) => {
        set((state) => ({
          currentUser: {
            ...state.currentUser,
            name,
            email,
            avatarUrl,
            roleLabel: `${name} (${state.currentUser.role === 'lisans_alan' ? 'Lisans + Alan' : 'Önlisans'})`,
          },
          notificationMessage: "✅ Profil bilgileriniz başarıyla güncellendi!",
        }));
      },
    }),
    {
      name: "asimptot_auth_v1",
    }
  )
);
