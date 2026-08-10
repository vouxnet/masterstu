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
  targetCode: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export interface AppNotification {
  id: string;
  type: "friend_add" | "poke" | "cheer" | "question";
  senderName: string;
  senderCode?: string;
  targetCode?: string;
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

  // Actions
  syncNetworkRequests: (currentUserCode: string, currentUserName: string) => void;
  sendFriendRequest: (targetCode: string, currentUserCode: string, currentUserName: string, currentUserAvatar?: string) => boolean;
  acceptFriendRequest: (requestId: string, currentUserCode: string) => void;
  rejectFriendRequest: (requestId: string) => void;
  cancelSentRequest: (requestId: string) => void;
  removeFriend: (id: string) => void;
  sendPoke: (friend: FriendUser, senderName: string, senderCode: string) => void;
  sendCheer: (friend: FriendUser, senderName: string, senderCode: string) => void;
  sendQuestionToFriend: (friend: FriendUser, text: string, senderName: string, senderCode: string) => void;
  markNotificationsRead: () => void;
  clearNotifications: () => void;
  clearToast: () => void;
  resetFriends: () => void;
}

const GLOBAL_NETWORK_KEY = "kpss_global_friend_network_v3";
const GLOBAL_NOTIFS_KEY = "kpss_global_notifications_v3";

const getGlobalNetwork = (): FriendRequest[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(GLOBAL_NETWORK_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const saveGlobalNetwork = (network: FriendRequest[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(GLOBAL_NETWORK_KEY, JSON.stringify(network));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {}
};

const getGlobalNotifications = (): AppNotification[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(GLOBAL_NOTIFS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const saveGlobalNotifications = (notifs: AppNotification[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(GLOBAL_NOTIFS_KEY, JSON.stringify(notifs));
    window.dispatchEvent(new Event("storage"));
  } catch (e) {}
};

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
          message: "👋 Asimptot Duo sistemine hoş geldin! Arkadaş kodunu paylaş veya bir kod girerek gerçek istek gönder.",
          createdAt: "Şimdi",
          read: false,
        }
      ],
      toastMessage: null,

      syncNetworkRequests: (userCode: string, userName: string) => {
        if (!userCode) return;
        const myCode = userCode.trim().toUpperCase();

        const network = getGlobalNetwork();
        const globalNotifs = getGlobalNotifications();

        // 1. Incoming requests targeting myCode
        const incoming = network.filter(
          (r) => r.targetCode.toUpperCase() === myCode && r.status === "pending"
        );

        // 2. Sent requests originating from myCode
        const outgoing = network.filter(
          (r) => r.senderCode.toUpperCase() === myCode && r.status === "pending"
        );

        // 3. Accepted requests targeting myCode or sent by myCode
        const newlyAccepted = network.filter(
          (r) =>
            r.status === "accepted" &&
            (r.senderCode.toUpperCase() === myCode || r.targetCode.toUpperCase() === myCode)
        );

        // Deduplicate friends by friendCode & id
        const friendMap = new Map<string, FriendUser>();
        get().friends.forEach((f) => {
          friendMap.set(f.friendCode.toUpperCase(), f);
        });

        let hasNewFriend = false;

        newlyAccepted.forEach((req) => {
          const isSender = req.senderCode.toUpperCase() === myCode;
          const friendCode = (isSender ? req.targetCode : req.senderCode).toUpperCase();
          const friendName = isSender ? req.targetCode.replace("#", "") : req.senderName;
          const friendAvatar = isSender
            ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${friendName}`
            : req.senderAvatar;

          if (!friendMap.has(friendCode)) {
            hasNewFriend = true;
            friendMap.set(friendCode, {
              id: `friend-${friendCode}`,
              name: friendName,
              friendCode: friendCode,
              roleLabel: "ÖSYM Önlisans / Lisans Adayı",
              avatarUrl: friendAvatar,
              statusText: "Canlı Ders Çalışıyor ⏳",
              isOnline: true,
              streakCount: Math.floor(Math.random() * 8) + 1,
            });
          }
        });

        // 4. Fetch incoming notifications targeting myCode
        const myIncomingNotifs = globalNotifs.filter(
          (n) => n.targetCode && n.targetCode.toUpperCase() === myCode
        );

        const notifMap = new Map<string, AppNotification>();
        get().notifications.forEach((n) => notifMap.set(n.id, n));
        myIncomingNotifs.forEach((n) => notifMap.set(n.id, n));

        const mergedNotifications = Array.from(notifMap.values()).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        set({
          pendingRequests: incoming,
          sentRequests: outgoing,
          friends: Array.from(friendMap.values()),
          notifications: mergedNotifications,
        });

        if (hasNewFriend) {
          set({
            toastMessage: "🎉 İstek onaylandı! Yeni çalışma arkadaşınız listenize eklendi.",
          });
        }
      },

      sendFriendRequest: (targetCodeStr: string, currentUserCode: string, currentUserName: string, currentUserAvatar?: string) => {
        const cleanTarget = targetCodeStr.trim().toUpperCase();
        if (!cleanTarget) return false;

        const formattedTarget = cleanTarget.startsWith("#") ? cleanTarget : `#${cleanTarget}`;
        const myCode = (currentUserCode || "#ADAY2026").trim().toUpperCase();

        if (formattedTarget === myCode) {
          set({ toastMessage: "⚠️ Kendi arkadaşlık kodunuza istek gönderemezsiniz!" });
          return false;
        }

        // Check if already friends
        const isFriend = get().friends.some((f) => f.friendCode.toUpperCase() === formattedTarget);
        if (isFriend) {
          set({ toastMessage: "⚠️ Bu kullanıcı zaten arkadaş listenizde ekli!" });
          return false;
        }

        const network = getGlobalNetwork();

        // Check if already sent in global network
        const existing = network.find(
          (r) =>
            r.senderCode.toUpperCase() === myCode &&
            r.targetCode.toUpperCase() === formattedTarget &&
            r.status === "pending"
        );

        if (existing) {
          set({ toastMessage: "⏳ Bu kullanıcıya zaten istek gönderdiniz. Yanıt bekleniyor!" });
          return false;
        }

        const newRequest: FriendRequest = {
          id: `g-req-${Date.now()}-${Math.random()}`,
          senderCode: myCode,
          senderName: currentUserName || "Aday Kullanıcı",
          senderAvatar: currentUserAvatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUserName}`,
          targetCode: formattedTarget,
          status: "pending",
          createdAt: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
        };

        const updatedNetwork = [newRequest, ...network];
        saveGlobalNetwork(updatedNetwork);

        const newNotif: AppNotification = {
          id: `notif-sent-${Date.now()}`,
          type: "friend_add",
          senderName: formattedTarget,
          message: `✉️ ${formattedTarget} kodlu kullanıcıya arkadaşlık isteği gönderildi. Karşı tarafın onayı bekleniyor.`,
          createdAt: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          read: false,
        };

        set((state) => ({
          sentRequests: [newRequest, ...state.sentRequests],
          notifications: [newNotif, ...state.notifications],
          toastMessage: `✉️ ${formattedTarget} kullanıcısına arkadaşlık isteği gönderildi! Karşı tarafın onayı bekleniyor.`,
        }));

        return true;
      },

      acceptFriendRequest: (requestId: string, currentUserCode: string) => {
        const network = getGlobalNetwork();
        const req = network.find((r) => r.id === requestId);

        if (!req) return;

        // Mark as accepted in global network
        const updatedNetwork = network.map((r) =>
          r.id === requestId ? { ...r, status: "accepted" as const } : r
        );
        saveGlobalNetwork(updatedNetwork);

        const friendCode = req.senderCode.toUpperCase();
        const existingFriends = get().friends;

        if (existingFriends.some((f) => f.friendCode.toUpperCase() === friendCode)) {
          set((state) => ({
            pendingRequests: state.pendingRequests.filter((r) => r.id !== requestId),
            toastMessage: `⚠️ ${req.senderName} zaten arkadaş listenizde ekli!`,
          }));
          return;
        }

        const newFriend: FriendUser = {
          id: `friend-${friendCode}`,
          name: req.senderName,
          friendCode: req.senderCode,
          roleLabel: "ÖSYM Önlisans / Lisans Adayı",
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
          pendingRequests: state.pendingRequests.filter((r) => r.id !== requestId),
          friends: [newFriend, ...state.friends],
          notifications: [newNotif, ...state.notifications],
          toastMessage: `🎉 ${req.senderName} ile artık arkadaşsınız!`,
        }));
      },

      rejectFriendRequest: (requestId: string) => {
        const network = getGlobalNetwork();
        const updatedNetwork = network.map((r) =>
          r.id === requestId ? { ...r, status: "rejected" as const } : r
        );
        saveGlobalNetwork(updatedNetwork);

        set((state) => ({
          pendingRequests: state.pendingRequests.filter((r) => r.id !== requestId),
          toastMessage: "Arkadaşlık isteği reddedildi.",
        }));
      },

      cancelSentRequest: (requestId: string) => {
        const network = getGlobalNetwork();
        const updatedNetwork = network.filter((r) => r.id !== requestId);
        saveGlobalNetwork(updatedNetwork);

        set((state) => ({
          sentRequests: state.sentRequests.filter((r) => r.id !== requestId),
          toastMessage: "Gönderilen arkadaşlık isteği iptal edildi.",
        }));
      },

      removeFriend: (id: string) => {
        set((state) => ({
          friends: state.friends.filter((f) => f.id !== id),
          toastMessage: "Arkadaş listeden çıkarıldı.",
        }));
      },

      sendPoke: (friend: FriendUser, senderName: string, senderCode: string) => {
        const targetCode = friend.friendCode.toUpperCase();
        const globalNotifs = getGlobalNotifications();

        const newOutboundNotif: AppNotification = {
          id: `notif-poke-${Date.now()}-${Math.random()}`,
          type: "poke",
          senderName: senderName || "Çalışma Arkadaşın",
          senderCode: senderCode,
          targetCode: targetCode,
          message: `👉 ${senderName} size ders çalışma hatırlatması (Dürt!) gönderdi.`,
          createdAt: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          read: false,
        };

        saveGlobalNotifications([newOutboundNotif, ...globalNotifs]);

        set((state) => ({
          toastMessage: `👉 ${friend.name} kişisine dürtme bildirimi gönderildi!`,
        }));
      },

      sendCheer: (friend: FriendUser, senderName: string, senderCode: string) => {
        const targetCode = friend.friendCode.toUpperCase();
        const globalNotifs = getGlobalNotifications();

        const newOutboundNotif: AppNotification = {
          id: `notif-cheer-${Date.now()}-${Math.random()}`,
          type: "cheer",
          senderName: senderName || "Çalışma Arkadaşın",
          senderCode: senderCode,
          targetCode: targetCode,
          message: `🎉 ${senderName} sizi tebrik etti ve motivasyon gönderdi! (+10 XP)`,
          createdAt: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          read: false,
        };

        saveGlobalNotifications([newOutboundNotif, ...globalNotifs]);

        set((state) => ({
          toastMessage: `🎉 ${friend.name} kişisine tebrik bildirimi iletildi!`,
        }));
      },

      sendQuestionToFriend: (friend: FriendUser, text: string, senderName: string, senderCode: string) => {
        const targetCode = friend.friendCode.toUpperCase();
        const globalNotifs = getGlobalNotifications();

        const newOutboundNotif: AppNotification = {
          id: `notif-q-${Date.now()}-${Math.random()}`,
          type: "question",
          senderName: senderName || "Çalışma Arkadaşın",
          senderCode: senderCode,
          targetCode: targetCode,
          message: `📩 ${senderName} size bir soru gönderdi: "${text}"`,
          createdAt: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
          read: false,
        };

        saveGlobalNotifications([newOutboundNotif, ...globalNotifs]);

        set((state) => ({
          toastMessage: `📩 ${friend.name} kullanıcısına sorunuz iletildi!`,
        }));
      },

      markNotificationsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        }));
      },

      clearNotifications: () => set({ notifications: [] }),
      clearToast: () => set({ toastMessage: null }),
      resetFriends: () => set({ friends: [], pendingRequests: [], sentRequests: [], notifications: [], toastMessage: null }),
    }),
    {
      name: "asimptot_friends_persist_v10",
    }
  )
);
