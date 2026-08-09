"use client";

import React from "react";
import Link from "next/link";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { useFriendStore } from "@/src/lib/store/useFriendStore";
import { Users, Flame, Zap, HelpCircle, UserPlus, Copy, Check, MessageSquare, BookOpen } from "lucide-react";
import confetti from "canvas-confetti";

export function DuoFriendsWidget() {
  const { currentUser, partnerUser } = useAuthStore();
  const { friends, sendPoke, sendCheer } = useFriendStore();

  const displayFriends = partnerUser 
    ? [
        {
          id: partnerUser.id,
          name: partnerUser.name,
          friendCode: partnerUser.friendCode,
          roleLabel: partnerUser.roleLabel,
          avatarUrl: partnerUser.avatarUrl,
          statusText: "Ders Çalışmaya Hazır ⏳",
          isOnline: true,
          streakCount: partnerUser.streakCount || 14
        },
        ...friends.filter(f => f.id !== partnerUser.id)
      ]
    : friends;

  const handleCheer = (name: string) => {
    sendCheer(name);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#F59E0B", "#10B981", "#6366F1"],
    });
  };

  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(currentUser.friendCode || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl glass-panel p-5 border border-white/10 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-sm sm:text-base">
              Duo Çalışma Ortakların
            </h3>
            <p className="text-[11px] text-gray-400">
              Arkadaşlarınla etkileşime geç, canlı durumlarını gör ve dürt!
            </p>
          </div>
        </div>

        <Link
          href="/friends"
          className="rounded-xl glass-card px-3 py-1.5 text-xs font-bold text-indigo-300 hover:text-white border border-indigo-500/30 flex items-center space-x-1"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Yönet</span>
        </Link>
      </div>

      {displayFriends.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {displayFriends.map((friend) => (
            <div
              key={friend.id}
              className="rounded-2xl bg-black/40 p-3.5 border border-white/5 space-y-3 relative overflow-hidden"
            >
              {/* Friend Top Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="relative">
                    <img
                      src={friend.avatarUrl}
                      alt={friend.name}
                      className="h-10 w-10 rounded-xl object-cover border border-indigo-500/40"
                    />
                    {friend.isOnline && (
                      <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-gray-900" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-xs">
                      {friend.name}
                    </h4>
                    <span className="text-[10px] text-gray-400 block">{friend.roleLabel}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20 text-[10px] font-bold text-amber-400">
                  <Flame className="w-3 h-3" />
                  <span>{friend.streakCount || 1} Gün</span>
                </div>
              </div>

              {/* Quick Interactive Actions */}
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                <button
                  onClick={() => sendPoke(friend.name)}
                  className="rounded-xl bg-amber-500/15 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 py-1.5 text-[10px] font-bold transition-all active:scale-95 flex items-center justify-center space-x-1"
                  title="Ders Çalış Hatırlatması Gönder"
                >
                  <span>👉 Dürt</span>
                </button>

                <button
                  onClick={() => handleCheer(friend.name)}
                  className="rounded-xl bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 py-1.5 text-[10px] font-bold transition-all active:scale-95 flex items-center justify-center space-x-1"
                  title="Tebrik Et ve Konfeti Patlat"
                >
                  <span>🎉 Tebrik</span>
                </button>

                <Link
                  href="/mistakes"
                  className="rounded-xl bg-indigo-500/15 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 py-1.5 text-[10px] font-bold transition-all active:scale-95 flex items-center justify-center space-x-1 text-center"
                  title="Yanlış Soru Kartları"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Yanlışlar</span>
                </Link>

                <Link
                  href="/shared-qa"
                  className="rounded-xl bg-purple-500/15 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 py-1.5 text-[10px] font-bold transition-all active:scale-95 flex items-center justify-center space-x-1 text-center"
                  title="Canlı Soru Gönder"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Soru At</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-indigo-950/30 p-4 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="text-xs font-bold text-white">Henüz ekli çalışma arkadaşın yok!</p>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Arkadaş kodunu paylaş veya bir kod ekle, birlikte ders çalış ve birbirinizin yanlış kartlarını inceleyin!
            </p>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-xs font-mono font-bold text-amber-400 bg-black/40 px-2.5 py-1 rounded-xl border border-white/10">
              {currentUser.friendCode || "#ADAY2026"}
            </span>
            <button
              onClick={handleCopy}
              className="rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white p-2 text-xs font-bold"
              title="Kodu Kopyala"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
