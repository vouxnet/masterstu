"use client";

import React from "react";
import {
  ShieldCheck,
  Users,
  BookOpen,
  Layout,
  BarChart3,
  Image,
  Activity,
  Layers,
  Settings,
  ArrowLeft,
  LogOut,
  Database,
  Cpu,
  Sparkles,
  GitBranch,
} from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { useAdminStore } from "@/src/lib/store/useAdminStore";

export type AdminTabType = "overview" | "pagenav" | "users" | "questions" | "cms" | "curriculum" | "flashcards" | "media";

interface AdminSidebarProps {
  activeTab: AdminTabType;
  setActiveTab: (tab: AdminTabType) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  const { signOut } = useAuthStore();
  const { users, customExamPacks, cmsContents } = useAdminStore();

  const totalQuestions = customExamPacks.reduce((acc, p) => acc + p.questions.length, 0);

  const menuItems = [
    {
      id: "overview",
      label: "Genel Bakış & Analitik",
      icon: Activity,
      badge: "Özet",
      badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    },
    {
      id: "pagenav",
      label: "Sayfa, Kategori & Rota Mimarı",
      icon: GitBranch,
      badge: "Dinamik Mimari",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    },
    {
      id: "users",
      label: "Kullanıcı & Üyelikler",
      icon: Users,
      badge: `${users.length} Üye`,
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    },
    {
      id: "questions",
      label: "120 Soru & Sınav Bankası",
      icon: BookOpen,
      badge: `${totalQuestions} Soru`,
      badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    },
    {
      id: "cms",
      label: "Sayfa Metinleri & CMS",
      icon: Layout,
      badge: `${cmsContents.length} Bölüm`,
      badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    },
    {
      id: "curriculum",
      label: "Müfredat & Dağılımlar",
      icon: BarChart3,
      badge: "ÖSYM",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    },
    {
      id: "media",
      label: "Medya & Bakım",
      icon: Image,
      badge: "%100 Aktif",
      badgeColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    },
  ] as const;

  return (
    <aside className="w-full md:w-72 flex-shrink-0 space-y-6">
      {/* Admin Studio Header Card */}
      <div className="rounded-3xl glass-panel p-5 border border-rose-500/30 bg-gradient-to-br from-rose-950/40 via-purple-950/20 to-gray-950 shadow-2xl relative overflow-hidden">
        <div className="flex items-center space-x-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-600 to-purple-600 text-white shadow-lg shadow-rose-600/40 border border-rose-400/40 shrink-0">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[9px] font-bold text-rose-300 border border-rose-500/30 font-mono">
                ADMIN CONSOLE
              </span>
            </div>
            <h2 className="font-display text-base font-black text-white tracking-tight mt-0.5">
              Executive Studio 👑
            </h2>
            <p className="text-[10px] text-gray-400 flex items-center gap-1.5 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Canlı Yönetim Modu</span>
            </p>
          </div>
        </div>
      </div>

      {/* Categorized Admin Navigation Menu */}
      <div className="rounded-3xl glass-panel p-3 border border-white/10 shadow-xl space-y-1">
        <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-500 font-mono">
          Yönetim Konsolu Menüsü
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as AdminTabType)}
              className={`w-full flex items-center justify-between p-3 rounded-2xl font-bold text-xs transition-all ${
                isActive
                  ? "bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-lg shadow-rose-600/30 border border-rose-400/40"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`h-4 w-4 ${isActive ? "text-white" : "text-gray-400"}`} />
                <span>{item.label}</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[9px] font-mono border ${
                  isActive ? "bg-black/30 text-white border-white/20" : item.badgeColor
                }`}
              >
                {item.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Switch View & System Quick Actions */}
      <div className="rounded-3xl glass-panel p-4 border border-white/10 shadow-xl space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 font-mono px-1">
          Hızlı Yönlendirme
        </p>

        <Link
          href="/"
          className="w-full flex items-center justify-between p-2.5 rounded-xl glass-card text-xs font-bold text-gray-300 hover:text-white border border-white/5 hover:border-white/20 transition-all"
        >
          <div className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4 text-indigo-400" />
            <span>Öğrenci Görünümüne Dön</span>
          </div>
          <span className="text-[10px] text-gray-500">🎓 Panel</span>
        </Link>

        <button
          onClick={async () => {
            await signOut();
            window.location.href = "/login";
          }}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all"
        >
          <div className="flex items-center space-x-2">
            <LogOut className="h-4 w-4 text-rose-400" />
            <span>Yönetici Oturumunu Kapat</span>
          </div>
          <span className="text-[10px] text-rose-400">🚪 Çıkış</span>
        </button>
      </div>
    </aside>
  );
};
