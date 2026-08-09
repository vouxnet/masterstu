"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore, EXAM_METADATA, ExamType } from "@/src/lib/store/useAuthStore";
import { useStudyLogStore } from "@/src/lib/store/useStudyLogStore";
import { useLeagueStore, LEAGUE_CONFIG } from "@/src/lib/store/useLeagueStore";
import { useFriendStore } from "@/src/lib/store/useFriendStore";
import { GraduationCap, Flame, Plus, LogOut, Bell, Check, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Header: React.FC = () => {
  const router = useRouter();
  const { currentUser, setActiveExam } = useAuthStore();
  const streak = useStudyLogStore((state) => state.getStreakCount());
  const { currentTier } = useLeagueStore();
  const { notifications, markNotificationsRead, clearNotifications } = useFriendStore();

  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const selectedExams: ExamType[] = currentUser.selectedExams || ["kpss_lisans"];
  const activeExam: ExamType = currentUser.activeExam || "kpss_lisans";

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleToggleNotif = () => {
    setIsNotifOpen(!isNotifOpen);
    if (!isNotifOpen && unreadCount > 0) {
      markNotificationsRead();
    }
  };

  const handleLogout = async () => {
    await useAuthStore.getState().signOut();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-white/10 glass-panel px-6 backdrop-blur-xl">
      {/* Brand & Active Exam Badge */}
      <div className="flex items-center space-x-3">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="font-display text-lg font-black tracking-tight text-white sm:text-xl">
                Master<span className="text-indigo-400">ÖSYM</span> AI
              </h1>
              <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                SaaS PRO
              </span>
            </div>
            <p className="text-[11px] font-medium text-gray-400">
              Aktif Sınav: <span className="text-emerald-400 font-bold">{EXAM_METADATA[activeExam]?.title}</span>
            </p>
          </div>
        </Link>
      </div>

      {/* Dynamic Active Exam Switcher Pills */}
      <div className="hidden md:flex items-center space-x-1.5 bg-black/40 p-1.5 rounded-full border border-white/10 shadow-inner">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2">
          Sınavların:
        </span>
        {selectedExams.map((exId) => {
          const meta = EXAM_METADATA[exId];
          const isActive = activeExam === exId;
          return (
            <button
              key={exId}
              onClick={() => setActiveExam(exId)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all border ${
                isActive
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400/50"
                  : "glass-card text-gray-400 border-transparent hover:text-white hover:bg-white/5 hover:border-white/10"
              }`}
            >
              {meta?.shortLabel || exId}
            </button>
          );
        })}

        <Link
          href="/onboarding"
          className="rounded-full glass-card px-3 py-1.5 text-[11px] font-bold text-indigo-300 hover:text-white border border-indigo-500/30 flex items-center space-x-1 ml-1"
          title="Sınav Ekle / Düzenle"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Ekle</span>
        </Link>
      </div>

      {/* Center Duo Streak Badge */}
      <div className="hidden lg:flex items-center space-x-2 rounded-2xl glass-card px-4 py-2 border border-amber-500/30 shadow-lg">
        <Flame className="h-5 w-5 text-amber-400 animate-pulse" />
        <div>
          <span className="text-xs font-bold text-amber-300">
            Duo Streak: {streak} Gün
          </span>
          <div className="flex items-center space-x-2 mt-0.5">
            <span className="text-[10px] text-gray-400 font-medium">{currentUser.friendCode}</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/5 border border-white/10" style={{ color: LEAGUE_CONFIG[currentTier].color }}>
              {LEAGUE_CONFIG[currentTier].emoji} {LEAGUE_CONFIG[currentTier].name}
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls: Notification Bell + User Profile + Logout */}
      <div className="flex items-center space-x-3">
        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={handleToggleNotif}
            className="relative rounded-2xl glass-card p-2.5 text-gray-300 hover:text-white border border-white/10 transition-transform active:scale-95"
            title="Bildirimler"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-md animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Modal Dropdown */}
          <AnimatePresence>
            {isNotifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-80 sm:w-96 rounded-3xl glass-panel p-4 border border-white/20 shadow-2xl z-50 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-indigo-400" />
                    <h3 className="font-display font-bold text-white text-xs">
                      Bildirim Kutusu ({notifications.length})
                    </h3>
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearNotifications}
                      className="text-[10px] font-semibold text-rose-400 hover:text-rose-300 flex items-center space-x-1"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Temizle</span>
                    </button>
                  )}
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3 rounded-2xl border text-xs space-y-1 transition-all ${
                          !n.read
                            ? "bg-indigo-950/60 border-indigo-500/40"
                            : "bg-black/30 border-white/5 opacity-80"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium">
                          <span className="font-bold text-indigo-300">{n.senderName}</span>
                          <span>{n.createdAt}</span>
                        </div>
                        <p className="text-gray-200 font-medium">{n.message}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 py-6 text-center">
                      Henüz bildirim bulunmuyor.
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Card */}
        <div className="flex items-center space-x-2.5 glass-card px-3 py-1.5 rounded-2xl border border-white/10">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="h-8 w-8 rounded-full object-cover border border-indigo-500/40"
          />
          <div className="text-left hidden sm:block">
            <p className="font-display font-bold text-white text-xs">{currentUser.name}</p>
            <p className="text-[10px] text-indigo-300 font-semibold">{currentUser.roleLabel}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-1.5 rounded-2xl bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 px-3.5 py-2 text-xs font-bold border border-rose-500/30 transition-all active:scale-95"
          title="Oturumu Kapat ve Çıkış Yap"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Çıkış Yap</span>
        </button>
      </div>
    </header>
  );
};
