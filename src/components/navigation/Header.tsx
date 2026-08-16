"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore, EXAM_METADATA } from "@/src/lib/store/useAuthStore";
import { useStudyLogStore } from "@/src/lib/store/useStudyLogStore";
import { useFriendStore } from "@/src/lib/store/useFriendStore";
import { useThemeStore } from "@/src/lib/store/useThemeStore";
import {
  GraduationCap,
  Flame,
  Plus,
  LogOut,
  Bell,
  Check,
  Trash2,
  X,
  Sun,
  Moon,
  LayoutDashboard,
  Calendar,
  BookOpen,
  FileSpreadsheet,
  BarChart3,
  Settings,
  Infinity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, setActiveExam } = useAuthStore();
  const activeExam = currentUser.activeExam || "kpss_lisans";
  const streak = useStudyLogStore((state) => state.getStreakCount());

  const { notifications, markNotificationsRead, clearNotifications } = useFriendStore();
  const { theme, toggleTheme } = useThemeStore();

  const [isNotifOpen, setIsNotifOpen] = useState(false);

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

  // Center Horizontal Navigation Tabs matching the Visual Mockup
  const navTabs = [
    { href: "/", label: "Gösterge Paneli", icon: LayoutDashboard },
    { href: "/ai-schedule", label: "Programım", icon: Calendar },
    { href: "/curriculum", label: "Dersler", icon: BookOpen },
    { href: "/exams", label: "Denemeler", icon: FileSpreadsheet },
    { href: "/placement", label: "Analiz & Atama", icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-40 flex h-20 w-full items-center justify-between border-b border-white/10 glass-panel px-4 sm:px-8 backdrop-blur-2xl">
      {/* 1. Left Brand & Tagline */}
      <div className="flex items-center space-x-3.5">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 text-white shadow-xl shadow-indigo-500/30 group-hover:scale-105 transition-transform border border-white/10">
            <Infinity className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="font-display text-lg font-black tracking-tight text-white sm:text-xl">
                ASIMPTOT
              </h1>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30 font-mono">
                PRO
              </span>
            </div>
            <p className="text-[11px] font-medium text-gray-400">
              ÖSYM Hazırlık Portalı
            </p>
          </div>
        </Link>
      </div>

      {/* 2. Center Pill Navigation Tabs (The Award-Winning Mockup Style) */}
      <nav className="hidden md:flex items-center space-x-1.5 rounded-2xl bg-black/40 p-1.5 border border-white/10 shadow-inner">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex items-center space-x-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                isActive
                  ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/40"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-gray-400"}`} />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* 3. Right Controls: Theme Toggle + Streak + User Card + Logout */}
      <div className="flex items-center space-x-2.5 sm:space-x-3">
        {/* Streak Pill */}
        <div className="hidden lg:flex items-center space-x-1.5 rounded-2xl glass-card px-3 py-2 border border-amber-500/30 text-amber-400 shadow-md">
          <Flame className="h-4 w-4 fill-amber-500 text-amber-500 animate-pulse" />
          <span className="font-display font-black text-xs">{streak} Gün Seri</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="rounded-2xl glass-card p-2.5 text-gray-300 hover:text-white border border-white/10 transition-transform active:scale-95 shadow-md"
          title={theme === "dark" ? "Açık Temaya Geç" : "Koyu Temaya Geç"}
        >
          {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-400" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={handleToggleNotif}
            className="relative rounded-2xl glass-card p-2.5 text-gray-300 hover:text-white border border-white/10 transition-transform active:scale-95 shadow-md"
            title="Bildirimler"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white shadow-md animate-pulse">
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
                      className="text-[10px] text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Temizle</span>
                    </button>
                  )}
                </div>

                <div className="max-h-60 overflow-y-auto space-y-2 custom-scrollbar">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-2.5 rounded-xl border text-xs flex items-start space-x-2.5 ${
                          n.read ? "bg-white/5 border-white/5 text-gray-400" : "bg-indigo-600/20 border-indigo-500/30 text-white"
                        }`}
                      >
                        <span className="text-base">{n.type === "poke" ? "👉" : n.type === "cheer" ? "🎉" : "📩"}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[11px] truncate">{n.senderName}</p>
                          <p className="text-[10px] text-gray-300">{n.message}</p>
                        </div>
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
            className="h-8 w-8 rounded-xl object-cover border border-indigo-500/40"
          />
          <div className="text-left hidden sm:block">
            <p className="font-display font-bold text-white text-xs truncate max-w-[110px]">{currentUser.name}</p>
            <p className="text-[10px] text-indigo-300 font-semibold">{EXAM_METADATA[activeExam]?.shortLabel || "KPSS"}</p>
          </div>
          <Link href="/settings" className="text-gray-400 hover:text-white ml-1" title="Ayarlar">
            <Settings className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-1.5 rounded-2xl bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 px-3 py-2 text-xs font-bold border border-rose-500/30 transition-all active:scale-95"
          title="Çıkış Yap"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden md:inline">Çıkış</span>
        </button>
      </div>
    </header>
  );
};
