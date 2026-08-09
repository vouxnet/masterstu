"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { useFriendStore, FriendUser } from "@/src/lib/store/useFriendStore";
import {
  Users,
  UserPlus,
  Flame,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  Lock,
  Search,
  UserCheck,
  Clock,
  X,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function FriendsPage() {
  const { currentUser, partnerUser } = useAuthStore();
  const {
    friends,
    pendingRequests,
    sendFriendRequest,
    acceptFriendRequest,
    removeFriend,
    sendPoke,
    sendCheer,
    notification,
    clearNotification,
  } = useFriendStore();

  const [inputCode, setInputCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentUser.friendCode || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddFriendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sendFriendRequest(inputCode)) {
      setInputCode("");
    }
  };

  const triggerCheerWithConfetti = (friendName: string) => {
    sendCheer(friendName);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#F59E0B", "#10B981", "#6366F1"],
    });
  };

  const partnerAsFriend: FriendUser | null = partnerUser ? {
    id: partnerUser.id,
    name: partnerUser.name,
    friendCode: partnerUser.friendCode,
    roleLabel: partnerUser.roleLabel,
    avatarUrl: partnerUser.avatarUrl,
    statusText: "Ders Çalışmaya Hazır ⏳",
    isOnline: true,
    streakCount: partnerUser.streakCount || 14
  } : null;

  const displayFriends = [
    ...(partnerAsFriend ? [partnerAsFriend] : []),
    ...friends.filter(f => f.name !== currentUser.name && f.name !== partnerUser?.name)
  ];

  if (!isClient) {
    return <div className="p-8 text-center text-gray-400">Yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification Banner */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-between rounded-2xl bg-indigo-950/90 p-4 border border-indigo-500/40 text-xs text-indigo-200 shadow-xl backdrop-blur-md"
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-indigo-400 animate-spin" />
              <span>{notification}</span>
            </div>
            <button
              onClick={clearNotification}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl glass-panel p-6 border border-white/10 shadow-xl relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="z-10">
          <div className="flex items-center space-x-3">
            <div className="rounded-2xl bg-indigo-500/20 p-3 text-indigo-300">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-white tracking-tight">
                Arkadaşlık ve Duo Pano
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Arkadaşlarınla eşleş, ortak seriler yakala ve birbirinize sorular gönderin.
              </p>
            </div>
          </div>
        </div>
        <div className="z-10 flex flex-col items-start sm:items-end bg-black/40 p-4 rounded-2xl border border-white/5">
          <span className="text-[10px] text-gray-400 font-bold uppercase mb-1">
            Senin Arkadaş Kodun
          </span>
          <div className="flex items-center space-x-2">
            <span className="font-display text-lg font-bold text-white bg-white/5 px-3 py-1 rounded-xl">
              {currentUser.friendCode || ""}
            </span>
            <button
              onClick={handleCopyCode}
              className="p-2 rounded-xl glass-button text-gray-300 hover:text-white"
              title="Kodu Kopyala"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Add Friend Box (1 Col) */}
        <div className="md:col-span-1 rounded-3xl glass-panel p-5 border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
            <Search className="h-5 w-5 text-indigo-400" />
            <h3 className="font-display font-bold text-white text-sm">Arkadaş Ekle</h3>
          </div>
          <form onSubmit={handleAddFriendSubmit} className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <input
                type="text"
                required
                placeholder="Örn: #ABC1234"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="w-full rounded-2xl bg-gray-900/90 pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl glass-button py-2.5 text-xs font-bold text-white shadow-lg flex items-center justify-center space-x-2"
            >
              <UserPlus className="h-4 w-4" />
              <span>İstek Gönder</span>
            </button>
          </form>
        </div>

        {/* Pending Requests (2 Cols) */}
        <div className="md:col-span-2 rounded-3xl glass-panel p-5 border border-white/10 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-5 w-5 text-amber-400" />
              <h3 className="font-display font-bold text-white text-sm">
                Bekleyen İSTEKLER ({pendingRequests.length})
              </h3>
            </div>
          </div>

          {pendingRequests.length > 0 ? (
            <div className="space-y-2">
              {pendingRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between rounded-2xl bg-black/40 p-3 border border-white/5"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={req.senderAvatar}
                      alt={req.senderName}
                      className="h-10 w-10 rounded-xl object-cover border border-white/10"
                    />
                    <div>
                      <h4 className="font-display font-bold text-white text-xs">
                        {req.senderName} ({req.senderCode})
                      </h4>
                      <p className="text-[10px] text-gray-400">{req.createdAt}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => acceptFriendRequest(req.id)}
                    className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 text-xs font-bold shadow-md flex items-center space-x-1 transition-transform active:scale-95"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Kabul Et</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 py-4 text-center">
              Bekleyen yeni arkadaşlık isteği yok.
            </p>
          )}
        </div>
      </div>

      {/* Connected Friends Live Co-Op Cards */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-white text-lg flex items-center space-x-2">
          <Users className="h-5 w-5 text-indigo-400" />
          <span>Ekli Arkadaşların & Canlı Durumları</span>
        </h3>

        {displayFriends.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {displayFriends.map((friend) => (
              <div
                key={friend.id}
                className="rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl space-y-4 relative overflow-hidden"
              >
                {/* Top User Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="relative">
                      <img
                        src={friend.avatarUrl}
                        alt={friend.name}
                        className="h-12 w-12 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-lg"
                      />
                      {friend.isOnline && (
                        <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-gray-900 shadow-md" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-display font-bold text-white text-base">
                          {friend.name}
                        </h4>
                        <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                          {friend.friendCode}
                        </span>
                      </div>
                      <p className="text-xs text-indigo-300 font-medium">{friend.roleLabel}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1.5 rounded-xl bg-amber-500/10 px-2.5 py-1 border border-amber-500/30 text-xs font-bold text-amber-400">
                      <Flame className="h-4 w-4 text-amber-400 animate-bounce" />
                      <span>{friend.streakCount} Gün</span>
                    </div>

                    <button
                      onClick={() => removeFriend(friend.id)}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all hover:scale-105 active:scale-95"
                      title="Arkadaşı Sil"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Live Status Widget */}
                <div className="rounded-2xl bg-black/40 p-3.5 border border-white/5 space-y-1">
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-indigo-400" />
                    <span>CANLI ÇALIŞMA DURUMU</span>
                  </p>
                  <p className="text-xs text-emerald-300 font-bold">{friend.statusText}</p>
                </div>

                {/* Duo Co-Op Action Buttons */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
                  <button
                    onClick={() => sendPoke(friend.name)}
                    className="rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 px-3 py-2 text-xs font-bold border border-indigo-500/40 transition-transform active:scale-95 flex items-center justify-center space-x-1"
                  >
                    <Zap className="h-4 w-4 text-amber-300" />
                    <span>Dürt 👉</span>
                  </button>

                  <button
                    onClick={() => triggerCheerWithConfetti(friend.name)}
                    className="rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 px-3 py-2 text-xs font-bold border border-emerald-500/40 transition-transform active:scale-95 flex items-center justify-center space-x-1"
                  >
                    <Sparkles className="h-4 w-4 text-emerald-400" />
                    <span>Tebrik 🎉</span>
                  </button>

                  <Link
                    href="/mistakes"
                    className="rounded-xl bg-pink-600/30 hover:bg-pink-600/50 text-pink-300 px-3 py-2 text-xs font-bold border border-pink-500/40 transition-transform active:scale-95 flex items-center justify-center space-x-1 text-center"
                  >
                    <Lock className="h-3.5 w-3.5 text-pink-400" />
                    <span>Yanlışlar 🔒</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl glass-panel p-8 text-center space-y-3 border border-white/10">
            <Users className="h-10 w-10 text-gray-500 mx-auto" />
            <h4 className="font-display font-bold text-white text-base">Henüz Ekli Bir Arkadaşınız Yok</h4>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              Yukarıdaki "Arkadaş Ekle" kutusundan arkadaşının davet kodunu (Örn: #AHMET2026) girerek istek gönderebilirsin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
