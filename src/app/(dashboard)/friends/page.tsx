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
    sentRequests,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    cancelSentRequest,
    removeFriend,
    sendPoke,
    sendCheer,
    syncNetworkRequests,
    toastMessage,
    clearToast,
  } = useFriendStore();

  const [inputCode, setInputCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (currentUser.friendCode) {
      syncNetworkRequests(currentUser.friendCode, currentUser.name);
    }

    const handleStorageChange = () => {
      if (currentUser.friendCode) {
        syncNetworkRequests(currentUser.friendCode, currentUser.name);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(handleStorageChange, 3000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [currentUser.friendCode, currentUser.name, syncNetworkRequests]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentUser.friendCode || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddFriendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sendFriendRequest(inputCode, currentUser.friendCode, currentUser.name, currentUser.avatarUrl)) {
      setInputCode("");
    }
  };

  const triggerCheerWithConfetti = (friend: FriendUser) => {
    sendCheer(friend, currentUser.name, currentUser.friendCode);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#F59E0B", "#10B981", "#6366F1"],
    });
  };

  // Filter out self and deduplicate friends by code & name
  const myCodeNorm = (currentUser.friendCode || "").trim().toUpperCase();
  const myNameNorm = (currentUser.name || "").trim().toUpperCase();
  const myIdNorm = currentUser.id;

  const validFriends = friends.filter((f) => {
    const fCodeNorm = (f.friendCode || "").trim().toUpperCase();
    const fNameNorm = (f.name || "").trim().toUpperCase();
    
    // Self filtering
    if (f.id === myIdNorm) return false;
    if (fCodeNorm && fCodeNorm === myCodeNorm) return false;
    if (fNameNorm && fNameNorm === myNameNorm) return false;
    return true;
  });

  // Deduplicate remaining friends
  const seenCodes = new Set<string>();
  const seenNames = new Set<string>();
  const displayFriends: FriendUser[] = [];

  for (const f of validFriends) {
    const fCodeNorm = (f.friendCode || "").trim().toUpperCase();
    const fNameNorm = (f.name || "").trim().toUpperCase();

    if (fCodeNorm && seenCodes.has(fCodeNorm)) continue;
    if (fNameNorm && seenNames.has(fNameNorm)) continue;

    if (fCodeNorm) seenCodes.add(fCodeNorm);
    if (fNameNorm) seenNames.add(fNameNorm);
    displayFriends.push(f);
  }

  if (!isClient) return null;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 rounded-2xl bg-indigo-950/90 text-white border border-indigo-500/40 p-4 shadow-2xl flex items-center space-x-3 text-xs font-semibold backdrop-blur-xl"
          >
            <span>{toastMessage}</span>
            <button
              onClick={clearToast}
              className="rounded-lg bg-white/10 p-1 hover:bg-white/20 text-gray-300"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
              Co-Op Duo Sistemi
            </span>
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/30">
              Birlikte Kazanın 🤝
            </span>
          </div>
          <h1 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">
            Arkadaş Yönetimi & Duo Pano
          </h1>
          <p className="text-xs text-gray-300 mt-1">
            Arkadaş kodunu paylaş, çalışma arkadaşlarını ekle ve birlikte seri yakala!
          </p>
        </div>

        {/* User's Own Friend Code Card */}
        <div className="rounded-2xl glass-card p-3.5 border border-indigo-500/30 bg-indigo-950/40 flex items-center space-x-3 shadow-lg">
          <div>
            <p className="text-[10px] uppercase font-bold text-indigo-300">Senin Arkadaş Kodun</p>
            <p className="font-display font-black text-amber-400 text-sm tracking-wider">
              {currentUser.friendCode || "#ADAY2026"}
            </p>
          </div>
          <button
            onClick={handleCopyCode}
            className="rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white p-2 text-xs font-bold shadow-md flex items-center space-x-1 transition-transform active:scale-95"
            title="Kodu Kopyala"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
          </button>
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
                placeholder="Örn: #AHMET2026"
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

        {/* Pending & Sent Requests (2 Cols) */}
        <div className="md:col-span-2 rounded-3xl glass-panel p-5 border border-white/10 shadow-xl space-y-4">
          {/* Gelen İstekler */}
          <div>
            <div className="flex items-center space-x-2 border-b border-white/10 pb-2 mb-3">
              <UserCheck className="h-5 w-5 text-amber-400" />
              <h3 className="font-display font-bold text-white text-sm">
                Gelen İstekler ({pendingRequests.length})
              </h3>
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

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => acceptFriendRequest(req.id, currentUser.friendCode)}
                        className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 text-xs font-bold shadow-md flex items-center space-x-1 transition-transform active:scale-95"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Kabul Et</span>
                      </button>
                      <button
                        onClick={() => rejectFriendRequest(req.id)}
                        className="rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/30 px-2.5 py-1.5 text-xs font-bold transition-transform active:scale-95"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 py-2">
                Sana gönderilmiş bekleyen bir arkadaşlık isteği yok.
              </p>
            )}
          </div>

          {/* Gönderilen İstekler */}
          {sentRequests.length > 0 && (
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center space-x-2 pb-2 mb-2">
                <Clock className="h-4 w-4 text-indigo-400" />
                <h4 className="font-display font-bold text-gray-300 text-xs">
                  Gönderdiğin İstekler (Yanıt Bekleniyor) ({sentRequests.length})
                </h4>
              </div>
              <div className="space-y-2">
                {sentRequests.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center justify-between rounded-2xl bg-indigo-950/30 p-2.5 border border-indigo-500/20"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-indigo-300 font-mono font-bold">{req.targetCode}</span>
                      <span className="text-[10px] text-gray-400">⏳ Yanıt bekleniyor</span>
                    </div>

                    <button
                      onClick={() => cancelSentRequest(req.id)}
                      className="text-[10px] font-bold text-rose-400 hover:text-rose-300 bg-rose-500/10 px-2.5 py-1.5 rounded-lg border border-rose-500/20"
                    >
                      İptal Et
                    </button>
                  </div>
                ))}
              </div>
            </div>
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
                    onClick={() => sendPoke(friend, currentUser.name, currentUser.friendCode)}
                    className="rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 px-3 py-2 text-xs font-bold border border-indigo-500/40 transition-transform active:scale-95 flex items-center justify-center space-x-1"
                  >
                    <Zap className="h-4 w-4 text-amber-300" />
                    <span>Dürt 👉</span>
                  </button>

                  <button
                    onClick={() => {
                      sendCheer(friend, currentUser.name, currentUser.friendCode);
                      confetti({
                        particleCount: 60,
                        spread: 70,
                        origin: { y: 0.7 },
                        colors: ["#F59E0B", "#10B981", "#6366F1"],
                      });
                    }}
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
