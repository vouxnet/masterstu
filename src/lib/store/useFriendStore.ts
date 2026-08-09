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

interface FriendState {
  friends: FriendUser[];
  pendingRequests: FriendRequest[]; // Incoming requests
  sentRequests: FriendRequest[];    // Outgoing requests
  notification: string | null;

  // Actions
  sendFriendRequest: (code: string) => boolean;
  cancelSentRequest: (id: string) => void;
  acceptFriendRequest: (id: string) => void;
  rejectFriendRequest: (id: string) => void;
  removeFriend: (id: string) => void;
  sendPoke: (friendName: string) => void;
  sendCheer: (friendName: string) => void;
  clearNotification: () => void;
  resetFriends: () => void;
}

export const useFriendStore = create<FriendState>()(
  persist(
    (set, get) => ({
      friends: [],
      pendingRequests: [],
      sentRequests: [],
      notification: null,

      sendFriendRequest: (code: string) => {
        const cleanCode = code.trim().toUpperCase();
        if (!cleanCode) return false;

        // Check if already a friend
        const exists = get().friends.some((f) => f.friendCode.toUpperCase() === cleanCode);
        if (exists) {
          set({ notification: "⚠️ Bu kullanıcı zaten arkadaş listenizde ekli!" });
          return false;
        }

        // Check if already sent
        const alreadySent = get().sentRequests.some((r) => r.senderCode.toUpperCase() === cleanCode);
        if (alreadySent) {
          set({ notification: "⏳ Bu kullanıcıya zaten istek gönderdiniz. Yanıt bekleniyor." });
          return false;
        }

        // Add to sentRequests (Outgoing)
        const newRequest: FriendRequest = {
          id: `sent-${Date.now()}`,
          senderName: cleanCode.replace('#', ''),
          senderCode: cleanCode,
          senderAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
          createdAt: new Date().toLocaleDateString("tr-TR"),
        };

        set((state) => ({
          sentRequests: [...state.sentRequests, newRequest],
          notification: `✅ ${cleanCode} kodlu kullanıcıya arkadaşlık daveti gönderildi! Kabul etmesi bekleniyor.`,
        }));
        return true;
      },

      cancelSentRequest: (id: string) => {
        set((state) => ({
          sentRequests: state.sentRequests.filter((r) => r.id !== id),
          notification: "İstek iptal edildi.",
        }));
      },

      acceptFriendRequest: (id: string) => {
        const req = get().pendingRequests.find((r) => r.id === id);
        if (!req) return;

        const newFriend: FriendUser = {
          id: `friend-${Date.now()}`,
          name: req.senderName,
          friendCode: req.senderCode,
          roleLabel: "ÖSYM Adayı",
          avatarUrl: req.senderAvatar,
          statusText: "Yeni eklendi 🎉",
          isOnline: true,
          streakCount: 1,
        };

        set((state) => ({
          friends: [...state.friends, newFriend],
          pendingRequests: state.pendingRequests.filter((r) => r.id !== id),
          notification: `🎉 ${req.senderName} arkadaş olarak eklendi!`,
        }));
      },

      rejectFriendRequest: (id: string) => {
        set((state) => ({
          pendingRequests: state.pendingRequests.filter((r) => r.id !== id),
          notification: "Gelen istek reddedildi.",
        }));
      },

      removeFriend: (id: string) => {
        set((state) => ({
          friends: state.friends.filter((f) => f.id !== id),
          notification: "Arkadaş listeden çıkarıldı.",
        }));
      },

      sendPoke: (friendName: string) => {
        set({
          notification: `👉 ${friendName} kullanıcısına ders hatırlatma "Dürt" gönderildi!`,
        });
      },

      sendCheer: (friendName: string) => {
        set({
          notification: `🎉 ${friendName} tebrik edildi! Konfeti patlatıldı!`,
        });
      },

      clearNotification: () => set({ notification: null }),
      resetFriends: () => set({ friends: [], pendingRequests: [], sentRequests: [], notification: null }),
    }),
    {
      name: "asimptot_friends_v3",
    }
  )
);
