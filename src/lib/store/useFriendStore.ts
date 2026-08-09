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
  pendingRequests: FriendRequest[];
  notification: string | null;

  // Actions
  sendFriendRequest: (code: string) => boolean;
  acceptFriendRequest: (id: string) => void;
  removeFriend: (id: string) => void;
  sendPoke: (friendName: string) => void;
  sendCheer: (friendName: string) => void;
  clearNotification: () => void;
}

// No hardcoded realFriendsOnly

export const useFriendStore = create<FriendState>()(
  persist(
    (set, get) => ({
      friends: [],
      pendingRequests: [],
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

        // Check if already pending
        const alreadyPending = get().pendingRequests.some((r) => r.senderCode.toUpperCase() === cleanCode);
        if (alreadyPending) {
          set({ notification: "⏳ Bu kullanıcıya zaten istek gönderildi." });
          return false;
        }

        // Add to pending sent requests
        const newRequest: FriendRequest = {
          id: `req-${Date.now()}`,
          senderName: cleanCode.replace('#', ''),
          senderCode: cleanCode,
          senderAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          pendingRequests: [...state.pendingRequests, newRequest],
          notification: `✅ ${cleanCode} kodlu kullanıcıya arkadaşlık daveti gönderildi! Kabul etmesini bekleyin.`,
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
    }),
    {
      name: "kpss_friends_v2", // Updated storage key for clean real users
    }
  )
);
