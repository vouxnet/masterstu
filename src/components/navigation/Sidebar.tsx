"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  Layers,
  Camera,
  FileSpreadsheet,
  MessageSquarePlus,
  BarChart3,
  Users,
  Bot,
  Sparkles,
  CalendarDays,
  Settings,
  Target,
  GitBranch,
  ShieldCheck,
  Award,
  Zap,
} from "lucide-react";
import { useAuthStore, EXAM_METADATA } from "@/src/lib/store/useAuthStore";
import { useAdminStore } from "@/src/lib/store/useAdminStore";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { setQuickActionOpen, currentUser } = useAuthStore();
  const isAdminUser = currentUser.role === "admin" || currentUser.email === "admin@asimptot.app";

  let curriculumLabel = "📚 Müfredat Takibi";
  if (currentUser.activeExam === "kpss_lisans") curriculumLabel = "📚 Lisans Müfredatı";
  else if (currentUser.activeExam === "kpss_onlisans") curriculumLabel = "📚 Önlisans Müfredatı";

  const isPageVisible = useAdminStore((state) => state.isPageVisible);

  // Group 1: 🎯 Çalışma Stüdyosu (Studio)
  const studioLinks = [
    { href: "/", label: "Gösterge Paneli", icon: Home },
    { href: "/curriculum", label: curriculumLabel, icon: BookOpen },
    { href: "/ai-schedule", label: "AI Çalışma Takvimi", icon: CalendarDays },
    { href: "/ai-hub", label: "Asimptot AI Soru Koçu", icon: Bot },
  ].filter((l) => l.href === "/" || isPageVisible(l.href));

  // Group 2: 📝 Deneme & Simülasyon Arenası (Arena)
  const arenaLinks = [
    { href: "/exams", label: "120 Soru & Deneme Sınavları", icon: FileSpreadsheet, badge: "ÖSYM" },
    { href: "/flashcards", label: "Hızlı Tekrar Kartları", icon: Layers },
    { href: "/mistakes", label: "Hatalı Soru Kasası", icon: Camera },
  ].filter((l) => isPageVisible(l.href));

  // Group 3: 📊 Gelişim & Analitik (Intelligence)
  const analyticsLinks = [
    { href: "/placement", label: "Atama Hedefi & Kadrolar", icon: Target },
    { href: "/question-distribution", label: "ÖSYM Soru Dağılımları", icon: BarChart3 },
    { href: "/skill-tree", label: "RPG Yetenek Ağacı", icon: GitBranch },
    { href: "/friends", label: "Duo Arkadaşlık Panosu", icon: Users },
  ].filter((l) => {
    if (!isPageVisible(l.href)) return false;
    if (l.href === "/placement" || l.href === "/question-distribution") {
      return currentUser.activeExam === "kpss_lisans" || currentUser.activeExam === "kpss_onlisans";
    }
    return true;
  });

  return (
    <aside className="hidden md:flex w-64 flex-col glass-panel border-r border-white/10 min-h-screen p-4 sticky top-20 overflow-y-auto custom-scrollbar">
      {/* User Compact Profile Card */}
      <div className="mb-5 rounded-2xl glass-card p-3.5 border border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-2.5 overflow-hidden">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="h-10 w-10 rounded-xl object-cover ring-2 ring-indigo-500/40"
          />
          <div className="overflow-hidden">
            <h3 className="font-display font-bold text-white text-xs truncate">{currentUser.name}</h3>
            <p className="text-[10px] text-indigo-300 font-semibold truncate">{currentUser.roleLabel}</p>
          </div>
        </div>
        
        <Link
          href="/settings"
          className="p-1.5 rounded-xl glass-card text-gray-400 hover:text-white border border-white/10 transition-colors"
          title="Ayarlar"
        >
          <Settings className="h-4 w-4" />
        </Link>
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 space-y-5 text-xs">
        {/* Admin Link (Only for Admin) */}
        {isAdminUser && (
          <div className="mb-2">
            <Link
              href="/admin"
              className="flex items-center space-x-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 text-white px-3 py-2.5 font-bold shadow-lg shadow-rose-600/30 border border-rose-400/40"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>👑 Super Admin Paneli</span>
            </Link>
          </div>
        )}

        {/* 1. Çalışma Stüdyosu */}
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-3 mb-1.5 font-mono">
            🎯 Çalışma Stüdyosu
          </p>
          {studioLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2.5 rounded-xl px-3 py-2 font-medium transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* 2. Deneme & Simülasyon */}
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-3 mb-1.5 font-mono">
            📝 Deneme & Simülasyon
          </p>
          {arenaLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between rounded-xl px-3 py-2 font-medium transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300 font-mono border border-amber-500/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* 3. Gelişim & Analitik */}
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-3 mb-1.5 font-mono">
            📊 Gelişim & Analitik
          </p>
          {analyticsLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2.5 rounded-xl px-3 py-2 font-medium transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Quick Action Button for Desktop */}
      <button
        onClick={() => setQuickActionOpen(true)}
        className="mt-4 flex w-full items-center justify-center space-x-2 rounded-xl glass-button px-3 py-2.5 font-display font-bold text-white text-xs shadow-lg"
      >
        <Sparkles className="h-4 w-4 text-amber-300" />
        <span>+ Hızlı Soru / Not Ekle</span>
      </button>

      {/* Footer Info */}
      <div className="mt-auto pt-4 text-center text-[10px] text-gray-500 border-t border-white/5">
        <p className="font-bold text-gray-400 font-display">Asimptot SaaS PRO</p>
        <p className="mt-0.5">Sınırlarını zorla, başarıya yaklaş. ∞</p>
      </div>
    </aside>
  );
};
