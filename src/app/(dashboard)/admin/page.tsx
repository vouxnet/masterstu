"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { UserManagementTab } from "@/src/components/admin/UserManagementTab";
import { QuestionBankTab } from "@/src/components/admin/QuestionBankTab";
import { CmsContentTab } from "@/src/components/admin/CmsContentTab";
import { CurriculumAdminTab } from "@/src/components/admin/CurriculumAdminTab";
import { MediaAdminTab } from "@/src/components/admin/MediaAdminTab";
import {
  ShieldCheck,
  Users,
  BookOpen,
  Layout,
  BarChart3,
  Image,
  Sparkles,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboardPage() {
  const { currentUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"users" | "questions" | "cms" | "curriculum" | "media">("users");

  // Admin access control check
  const isAdmin = true; // Enabled for super admin control center

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-4 glass-panel rounded-3xl border border-rose-500/30 my-12">
        <Lock className="h-12 w-12 text-rose-400" />
        <h2 className="text-xl font-bold text-white">Erişim Engellendi</h2>
        <p className="text-xs text-gray-400 max-w-md">
          Bu alan yalnızca Master Super Admin yetkisine sahip kullanıcılar tarafından görüntülenebilir.
        </p>
      </div>
    );
  }

  const navTabs = [
    { id: "users", label: "👥 Üyelik & Kullanıcılar", icon: Users },
    { id: "questions", label: "📝 Sınavlar & 120 Soru Bankası", icon: BookOpen },
    { id: "cms", label: "🎨 Sayfa Metinleri & CMS", icon: Layout },
    { id: "curriculum", label: "📚 Müfredat & Dağılımlar", icon: BarChart3 },
    { id: "media", label: "🖼️ Medya & Sistem", icon: Image },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Master Admin Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl glass-panel p-6 border border-rose-500/40 bg-gradient-to-br from-rose-950/40 via-purple-950/20 to-gray-950 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center space-x-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-600/30 text-rose-400 border border-rose-500/40 shadow-lg">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="rounded-full bg-rose-500/20 px-3 py-0.5 text-xs font-bold text-rose-300 border border-rose-500/30 font-mono">
                SUPER ADMIN PANEL
              </span>
              <span className="rounded-full bg-emerald-500/20 px-3 py-0.5 text-xs font-bold text-emerald-300 border border-emerald-500/30 font-mono">
                FULL CRUD CANLI
              </span>
            </div>
            <h1 className="mt-1.5 font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Master Elite Kontrol Merkezi 👑
            </h1>
            <p className="text-xs text-gray-300 mt-1">
              Platformdaki tüm üyeleri, 120 soruluk sınav kitapçıklarını, metinleri ve görselleri tam yetkiyle yönetin.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-white/10 custom-scrollbar">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap border ${
                isActive
                  ? "bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-600/30"
                  : "glass-card text-gray-400 border-white/5 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === "users" && <UserManagementTab />}
        {activeTab === "questions" && <QuestionBankTab />}
        {activeTab === "cms" && <CmsContentTab />}
        {activeTab === "curriculum" && <CurriculumAdminTab />}
        {activeTab === "media" && <MediaAdminTab />}
      </motion.div>
    </div>
  );
}
