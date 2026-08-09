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
  ShieldCheck,
  Settings,
  Target,
  GitBranch,
} from "lucide-react";
import { useAuthStore, EXAM_METADATA } from "@/src/lib/store/useAuthStore";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { setQuickActionOpen, currentUser } = useAuthStore();

  let curriculumLabel = "📚 Müfredat";
  if (currentUser.activeExam === "kpss_lisans") curriculumLabel = "📚 Lisans Müfredatı";
  else if (currentUser.activeExam === "kpss_onlisans") curriculumLabel = "📚 Önlisans Müfredatı";

  const coreLinks = [
    { href: "/", label: "Gösterge Paneli", icon: Home },
    { href: "/ai-hub", label: "🤖 Asimptot AI Hub", icon: Bot },
    { href: "/curriculum", label: curriculumLabel, icon: BookOpen },
    { href: "/ai-schedule", label: "🗓️ AI Haftalık Takvim", icon: CalendarDays },
  ];

  const practiceLinksRaw = [
    { href: "/placement", label: "🎯 Atama Hedefi", icon: Target },
    { href: "/league", label: "🏆 Haftalık Lig", icon: ShieldCheck },
    { href: "/friends", label: "👥 Duo Pano", icon: Users },
    { href: "/shared-qa", label: "Canlı Panolar", icon: MessageSquarePlus },
    { href: "/mistakes", label: "Yanlış Kutusu", icon: Camera },
    { href: "/flashcards", label: "Bilgi Kartları", icon: Layers },
    { href: "/exams", label: "Net Takibi", icon: FileSpreadsheet },
    { href: "/question-distribution", label: "📊 Soru Dağılımları", icon: BarChart3 },
    { href: "/skill-tree", label: "🌳 Yetenek Ağacı", icon: GitBranch },
  ];

  const practiceLinks = practiceLinksRaw.filter((link) => {
    if (link.href === "/placement" || link.href === "/question-distribution") {
      return currentUser.activeExam === "kpss_lisans" || currentUser.activeExam === "kpss_onlisans";
    }
    return true;
  });

  return (
    <aside className="hidden md:flex w-64 flex-col glass-panel border-r border-white/10 min-h-screen p-4 sticky top-16 overflow-y-auto custom-scrollbar">
      {/* User Header Profile Card */}
      <div className="mb-6 rounded-2xl glass-card p-4 border border-white/10">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-indigo-500/50"
          />
          <div className="flex-1 overflow-hidden">
            <h3 className="font-display font-bold text-white text-sm truncate">{currentUser.name}</h3>
            <p className="text-xs text-indigo-400 font-medium truncate">{currentUser.roleLabel}</p>
          </div>
        </div>
        
        {/* Settings Quick Actions */}
        <div className="flex items-center justify-center border-t border-white/10 pt-3">
          <Link href="/settings" className="flex items-center space-x-1.5 text-xs text-gray-400 hover:text-white transition-colors">
            <Settings className="h-4 w-4" />
            <span>Ayarlar</span>
          </Link>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-6">
        {/* Core Section */}
        <div className="space-y-1.5">
          <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-3 mb-2">Ana Merkez</h4>
          {coreLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600/90 to-indigo-700/90 text-white shadow-lg shadow-indigo-600/30"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Practice Section */}
        <div className="space-y-1.5">
          <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-3 mb-2">Pratik & Sosyal</h4>
          {practiceLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600/90 to-indigo-700/90 text-white shadow-lg shadow-indigo-600/30"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Quick Action Button for Desktop */}
      <button
        onClick={() => setQuickActionOpen(true)}
        className="mt-6 flex w-full items-center justify-center space-x-2 rounded-xl glass-button px-4 py-3 font-display font-semibold text-white shadow-lg"
      >
        <Sparkles className="h-5 w-5 text-amber-300" />
        <span>+ Hızlı Eylem Ekle</span>
      </button>

      {/* Footer Info */}
      <div className="mt-auto pt-6 text-center text-xs text-gray-500 border-t border-white/5">
        <p className="font-medium text-gray-400">Asimptot SaaS PRO</p>
        <p className="mt-0.5">ÖSYM Standartlarında PWA</p>
      </div>
    </aside>
  );
};
