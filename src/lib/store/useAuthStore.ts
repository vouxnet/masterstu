import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createClient } from "@/src/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

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
  partnerUser: UserProfile | null;
  duoStreak: number;
  sharedQuestions: SharedQuestionItem[];
  todos: TodoItem[];
  notificationMessage: string | null;
  isQuickActionOpen: boolean;
  
  // New auth state
  authMode: 'demo' | 'supabase';
  supabaseUser: User | null;

  // Actions
  setSelectedExams: (exams: ExamType[]) => void;
  setActiveExam: (exam: ExamType) => void;
  toggleTodo: (id: string) => void;
  addTodo: (title: string, subject: string) => void;
  addSharedQuestion: (subject: string, text: string, imageUrl?: string) => void;
  answerSharedQuestion: (id: string, text: string, imageUrl?: string) => void;
  setQuickActionOpen: (open: boolean) => void;
  clearNotification: () => void;
  updateUserProfile: (name: string, email: string, avatarUrl: string) => void;
  
  // Supabase Actions
  setAuthMode: (mode: 'demo' | 'supabase') => void;
  signUpWithEmail: (email: string, password: string, name: string) => Promise<{error: string | null}>;
  signInWithEmail: (email: string, password: string) => Promise<{error: string | null}>;
  signOut: () => Promise<void>;
  initAuth: () => Promise<void>;
}

const guestUser: UserProfile = {
  id: '',
  name: 'Misafir',
  email: '',
  friendCode: '',
  role: 'lisans_alan' as const,
  roleLabel: 'KPSS Lisans',
  selectedExams: ['kpss_lisans'],
  activeExam: 'kpss_lisans',
  avatarUrl: '',
  dailyQuestionTarget: 100,
  completedQuestionsToday: 0,
  completedTopicsToday: 0,
  streakCount: 0,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: guestUser,
      partnerUser: null,
      duoStreak: 0,
      notificationMessage: null,
      isQuickActionOpen: false,
      authMode: 'supabase',
      supabaseUser: null,

      sharedQuestions: [],
      todos: [],

      setSelectedExams: (exams) => {
        set((state) => ({
          currentUser: { ...state.currentUser, selectedExams: exams },
        }));
      },

      setActiveExam: (exam) => {
        set((state) => ({
          currentUser: { ...state.currentUser, activeExam: exam },
        }));
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
          notificationMessage: partner ? `📸 Soru ${partner.name} kullanıcısının panosuna başarıyla yüklendi!` : `📸 Soru eklendi!`,
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

      setAuthMode: (mode) => set({ authMode: mode }),

      signUpWithEmail: async (email, password, name) => {
        const supabase = createClient();
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
          },
        });
        if (error) return { error: error.message };
        
        if (data.user) {
          set({ 
            authMode: 'supabase',
            supabaseUser: data.user,
            currentUser: {
              ...guestUser,
              id: data.user.id,
              name: data.user.user_metadata?.name || name,
              email: data.user.email || email,
              roleLabel: `${data.user.user_metadata?.name || name} (Lisans + Alan)`,
            }
          });
        }
        return { error: null };
      },

      signInWithEmail: async (email, password) => {
        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) return { error: error.message };
        
        if (data.user) {
          set({ 
            authMode: 'supabase',
            supabaseUser: data.user,
            currentUser: {
              ...guestUser,
              id: data.user.id,
              name: data.user.user_metadata?.name || email.split('@')[0],
              email: data.user.email || email,
              roleLabel: `${data.user.user_metadata?.name || email.split('@')[0]} (Lisans + Alan)`,
            }
          });
        }
        return { error: null };
      },

      signOut: async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        set({ 
          authMode: 'supabase',
          supabaseUser: null,
          currentUser: guestUser,
          partnerUser: null
        });
      },

      initAuth: async () => {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          set({
            authMode: 'supabase',
            supabaseUser: session.user,
            currentUser: {
              ...guestUser,
              id: session.user.id,
              name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || "User",
              email: session.user.email || "",
              roleLabel: `${session.user.user_metadata?.name || session.user.email?.split('@')[0] || "User"} (Lisans + Alan)`,
            }
          });
        } else {
          set({ authMode: 'supabase', supabaseUser: null });
        }
        
        // Subscribe to auth changes
        supabase.auth.onAuthStateChange((_event, session) => {
          if (session?.user) {
            set({
              authMode: 'supabase',
              supabaseUser: session.user,
              currentUser: {
                ...get().currentUser,
                id: session.user.id,
                email: session.user.email || "",
                name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || "User",
              }
            });
          } else {
            set({ authMode: 'supabase', supabaseUser: null });
          }
        });
      },
    }),
    {
      name: "asimptot_auth_v1",
    }
  )
);
