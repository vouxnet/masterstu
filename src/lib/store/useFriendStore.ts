import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FriendUser {
  id: string;
  name: string;
  friendCode: string;
  roleLabel: string;
  avatarUrl: string;
  statusText: string;
  isOnline: boolean;
  streakCount: number;
}

export interface FriendRequest {
  id: string;
  senderName: string;
  senderCode: string;
  senderAvatar: string;
  createdAt: string;
}

export interface AppNotification {
  id: string;
  type: "friend_add" | "poke" | "cheer" | "question";
  senderName: string;
  message: string;
  createdAt: string;
  read: boolean;
}

interface FriendState {
  friends: FriendUser[];
  pendingRequests: FriendRequest[];
  sentRequests: FriendRequest[];
  notifications: AppNotification[];
  toastMessage: string | null;
  notification: string | null;

  // Actions
  sendFriendRequest: (code: string) => boolean;
  acceptFriendRequest: (id: string) => void;
  rejectFriendRequest: (id: string) => void;
  cancelSentRequest: (id: string) => void;
  removeFriend: (id: string) => void;
  sendPoke: (friendName: string) => void;
  sendCheer: (friendName: string) => void;
  sendQuestionToFriend: (friendName: string, text: string) => void;
  markNotificationsRead: () => void;
  clearNotifications: () => void;
  clearNotification: () => void;
  clearToast: () => void;
  resetFriends: () => void;
}

export const useFriendStore = create<FriendState>()(
  persist(
    (set, get) => ({
      friends: [],
      pendingRequests: [],
      sentRequests: [],
      notifications: [
        {
          id: "notif-init-1",
          type: "friend_add",
          senderName: "Sistem",
          message: "👋 Asimptot Duo sistemine hoş geldin! Kendi kodunu kopyalayıp arkadaş ekleyebilirsin.",
          createdAt: "Şimdi",
          read: false,
        }
      ],
      toastMessage: null,
      notification: null,

      sendFriendRequest: (code: string) => {
        const cleanCode = code.trim().toUpperCase();
        if (!cleanCode) return false;

        const formattedCode = cleanCode.startsWith("#") ? cleanCode : `#${cleanCode}`;

        // Check if already a friend
        const exists = get().friends.some((f) => f.friendCode.toUpperCase() === formattedCode);
        if (exists) {
          set({ toastMessage: "⚠️ Bu kullanıcı zaten arkadaş listenizde ekli!", notification: "⚠️ Bu kullanıcı zaten arkadaş listenizde ekli!" });
          return false;
        }

        const friendName = formattedCode.replace('#', '') || "Çalışma Arkadaşı";

        const newFriend: FriendUser = {
          id: `friend-${Date.now()}`,
          name: friendName,
          friendCode: formattedCode,
          roleLabel: "ÖSYM Önlisans Adayı",
          avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${friendName}`,
          statusText: "Canlı Ders Çalışıyor ⏳",
          isOnline: true,
          streakCount: Math.floor(Math.random() * 8) + 1,
        };

        const newNotification: AppNotification = {
          id: `notif-${Date.now()}`,
          type: "friend_add",
          senderName: friendName,
          message: `🎉 ${formattedCode} kodlu ${friendName} arkadaş listenize eklendi!`,
          createdAt: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          read: false,
        };

        set((state) => ({
          friends: [newFriend, ...state.friends],
          notifications: [newNotification, ...state.notifications],
          toastMessage: `🎉 ${formattedCode} kodlu ${friendName} arkadaşınız eklendi!`,
          notification: `🎉 ${formattedCode} kodlu ${friendName} arkadaşınız eklendi!`,
        }));
        return true;
      },

      acceptFriendRequest: (id: string) => {
        set((state) => ({
          pendingRequests: state.pendingRequests.filter((r) => r.id !== id),
        }));
      },

      rejectFriendRequest: (id: string) => {
        set((state) => ({
          pendingRequests: state.pendingRequests.filter((r) => r.id !== id),
        }));
      },

      cancelSentRequest: (id: string) => {
        set((state) => ({
          sentRequests: state.sentRequests.filter((r) => r.id !== id),
        }));
      },

      removeFriend: (id: string) => {
        set((state) => ({
          friends: state.friends.filter((f) => f.id !== id),
          toastMessage: "Arkadaş listeden çıkarıldı.",
          notification: "Arkadaş listeden çıkarıldı.",
        }));
      },

      sendPoke: (friendName: string) => {
        const newNotif: AppNotification = {
          id: `notif-poke-${Date.now()}`,
          type: "poke",
          senderName: friendName,
          message: `👉 ${friendName} size ders hatırlatması gönderdi: "Hadi ders başına!"`,
          createdAt: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          read: false,
        };

        set((state) => ({
          notifications: [newNotif, ...state.notifications],
          toastMessage: `👉 ${friendName} kişisine "Dürt" bildirimi gönderildi!`,
          notification: `👉 ${friendName} kişisine "Dürt" bildirimi gönderildi!`,
        }));
      },

      sendCheer: (friendName: string) => {
        const newNotif: AppNotification = {
          id: `notif-cheer-${Date.now()}`,
          type: "cheer",
          senderName: friendName,
          message: `🎉 ${friendName} başarınızı tebrik etti! (+10 XP)`,
          createdAt: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          read: false,
        };

        set((state) => ({
          notifications: [newNotif, ...state.notifications],
          toastMessage: `🎉 ${friendName} tebrik edildi! Bildirim gönderildi.`,
          notification: `🎉 ${friendName} tebrik edildi! Bildirim gönderildi.`,
        }));
      },

      sendQuestionToFriend: (friendName: string, text: string) => {
        const newNotif: AppNotification = {
          id: `notif-q-${Date.now()}`,
          type: "question",
          senderName: friendName,
          message: `📩 ${friendName} size bir soru gönderdi: "${text}"`,
          createdAt: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          read: false,
        };

        set((state) => ({
          notifications: [newNotif, ...state.notifications],
          toastMessage: `📩 ${friendName} kullanıcısına soru bildirimi iletildi!`,
          notification: `📩 ${friendName} kullanıcısına soru bildirimi iletildi!`,
        }));
      },

      markNotificationsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }));
      },

      clearNotifications: () => set({ notifications: [] }),
      clearNotification: () => set({ notification: null }),
      clearToast: () => set({ toastMessage: null }),
      resetFriends: () => set({ friends: [], pendingRequests: [], sentRequests: [], notifications: [], toastMessage: null, notification: null }),
    }),
    {
      name: "asimptot_friends_real_v5",
    }
  )
);
