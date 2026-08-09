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
  simulatePartnerAccept: (requestId: string) => void;
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
          message: "👋 Asimptot Duo sistemine hoş geldin! Arkadaş kopyalayıp istek gönderebilirsin.",
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
        const isFriend = get().friends.some((f) => f.friendCode.toUpperCase() === formattedCode);
        if (isFriend) {
          set({ toastMessage: "⚠️ Bu kullanıcı zaten arkadaş listenizde ekli!", notification: "⚠️ Bu kullanıcı zaten arkadaş listenizde ekli!" });
          return false;
        }

        // Check if request already sent
        const alreadySent = get().sentRequests.some((r) => r.senderCode.toUpperCase() === formattedCode);
        if (alreadySent) {
          set({ toastMessage: "⏳ Bu kullanıcıya zaten arkadaşlık isteği gönderdiniz. Yanıt bekleniyor!", notification: "⏳ Bu kullanıcıya zaten arkadaşlık isteği gönderdiniz." });
          return false;
        }

        const friendName = formattedCode.replace('#', '') || "Aday Kullanıcı";

        const newSentRequest: FriendRequest = {
          id: `sent-${Date.now()}`,
          senderName: friendName,
          senderCode: formattedCode,
          senderAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${friendName}`,
          createdAt: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
        };

        const newNotif: AppNotification = {
          id: `notif-sent-${Date.now()}`,
          type: "friend_add",
          senderName: friendName,
          message: `✉️ ${formattedCode} kodlu kullanıcıya arkadaşlık isteği gönderildi. Karşı tarafın onayı bekleniyor.`,
          createdAt: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          read: false,
        };

        set((state) => ({
          sentRequests: [newSentRequest, ...state.sentRequests],
          notifications: [newNotif, ...state.notifications],
          toastMessage: `✉️ ${formattedCode} kodlu kullanıcıya arkadaşlık isteği gönderildi!`,
          notification: `✉️ ${formattedCode} kodlu kullanıcıya arkadaşlık isteği gönderildi!`,
        }));
        return true;
      },

      acceptFriendRequest: (id: string) => {
        const req = get().pendingRequests.find((r) => r.id === id);
        if (!req) return;

        const newFriend: FriendUser = {
          id: `friend-${Date.now()}`,
          name: req.senderName,
          friendCode: req.senderCode,
          roleLabel: "ÖSYM Önlisans Adayı",
          avatarUrl: req.senderAvatar,
          statusText: "Canlı Ders Çalışıyor ⏳",
          isOnline: true,
          streakCount: Math.floor(Math.random() * 8) + 1,
        };

        const newNotif: AppNotification = {
          id: `notif-acc-${Date.now()}`,
          type: "friend_add",
          senderName: req.senderName,
          message: `🎉 ${req.senderName} (${req.senderCode}) ile artık arkadaşsınız!`,
          createdAt: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          read: false,
        };

        set((state) => ({
          pendingRequests: state.pendingRequests.filter((r) => r.id !== id),
          friends: [newFriend, ...state.friends],
          notifications: [newNotif, ...state.notifications],
          toastMessage: `🎉 ${req.senderName} ile artık arkadaşsınız!`,
        }));
      },

      rejectFriendRequest: (id: string) => {
        set((state) => ({
          pendingRequests: state.pendingRequests.filter((r) => r.id !== id),
          toastMessage: "Arkadaşlık isteği reddedildi.",
        }));
      },

      cancelSentRequest: (id: string) => {
        set((state) => ({
          sentRequests: state.sentRequests.filter((r) => r.id !== id),
          toastMessage: "Gönderilen arkadaşlık isteği iptal edildi.",
        }));
      },

      simulatePartnerAccept: (requestId: string) => {
        const req = get().sentRequests.find((r) => r.id === requestId);
        if (!req) return;

        const newFriend: FriendUser = {
          id: `friend-${Date.now()}`,
          name: req.senderName,
          friendCode: req.senderCode,
          roleLabel: "ÖSYM Önlisans Adayı",
          avatarUrl: req.senderAvatar,
          statusText: "Canlı Ders Çalışıyor ⏳",
          isOnline: true,
          streakCount: Math.floor(Math.random() * 8) + 1,
        };

        const newNotif: AppNotification = {
          id: `notif-approved-${Date.now()}`,
          type: "friend_add",
          senderName: req.senderName,
          message: `🎉 ${req.senderName} (${req.senderCode}) gönderdiğiniz arkadaşlık isteğini kabul etti!`,
          createdAt: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          read: false,
        };

        set((state) => ({
          sentRequests: state.sentRequests.filter((r) => r.id !== requestId),
          friends: [newFriend, ...state.friends],
          notifications: [newNotif, ...state.notifications],
          toastMessage: `🎉 ${req.senderName} isteğinizi kabul etti! Arkadaş listenize eklendi.`,
        }));
      },

      removeFriend: (id: string) => {
        set((state) => ({
          friends: state.friends.filter((f) => f.id !== id),
          toastMessage: "Arkadaş listeden çıkarıldı.",
        }));
      },

      sendPoke: (friendName: string) => {
        const newNotif: AppNotification = {
          id: `notif-poke-${Date.now()}`,
          type: "poke",
          senderName: friendName,
          message: `👉 ${friendName} kullanıcısına ders hatırlatması (Dürt) gönderdiniz.`,
          createdAt: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          read: false,
        };

        set((state) => ({
          notifications: [newNotif, ...state.notifications],
          toastMessage: `👉 ${friendName} kişisine "Dürt" bildirimi başarıyla gönderildi!`,
        }));
      },

      sendCheer: (friendName: string) => {
        const newNotif: AppNotification = {
          id: `notif-cheer-${Date.now()}`,
          type: "cheer",
          senderName: friendName,
          message: `🎉 ${friendName} kullanıcısına tebrik ve motivasyon mesajı ilettiniz! (+10 XP)`,
          createdAt: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          read: false,
        };

        set((state) => ({
          notifications: [newNotif, ...state.notifications],
          toastMessage: `🎉 ${friendName} kişisine tebrik bildirimi iletildi!`,
        }));
      },

      sendQuestionToFriend: (friendName: string, text: string) => {
        const newNotif: AppNotification = {
          id: `notif-q-${Date.now()}`,
          type: "question",
          senderName: friendName,
          message: `📩 ${friendName} kullanıcısına sorunuz iletildi: "${text}"`,
          createdAt: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          read: false,
        };

        set((state) => ({
          notifications: [newNotif, ...state.notifications],
          toastMessage: `📩 ${friendName} kullanıcısına sorunuz iletildi!`,
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
      name: "asimptot_friends_real_v6",
    }
  )
);
