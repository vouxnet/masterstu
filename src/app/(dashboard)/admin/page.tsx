"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { useAdminStore } from "@/src/lib/store/useAdminStore";
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
  Lock,
  Activity,
  CheckCircle2,
  Database,
  Cpu,
  FileCheck,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboardPage() {
  const { currentUser } = useAuthStore();
  const { users, customExamPacks, cmsContents } = useAdminStore();
  const [activeTab, setActiveTab] = useState<"users" | "questions" | "cms" | "curriculum" | "media">("users");

  // Strict Admin access control check
  const isAdmin = currentUser.role === "admin" || currentUser.email === "admin@asimptot.app";

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-4 glass-panel rounded-3xl border border-rose-500/30 my-12 shadow-2xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-600/20 text-rose-400 border border-rose-500/30">
          <Lock className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">403 - Yetkisiz Erişim Engellendi</h2>
        <p className="text-xs text-gray-400 max-w-md leading-relaxed">
          Bu yönetim konsolu yalnızca yetkili Master Super Admin hesabı (`admin@asimptot.app`) tarafından görüntülenebilir.
        </p>
      </div>
    );
  }

  // Calculate System Metrics
  const totalUsersCount = users.length;
  const totalPacksCount = customExamPacks.length;
  const totalQuestionsCount = customExamPacks.reduce((acc, p) => acc + p.questions.length, 0);

  const navTabs = [
    { id: "users", label: "👥 Üyelik & Kullanıcılar", icon: Users, badge: `${totalUsersCount} Üye` },
    { id: "questions", label: "📝 Sınavlar & 120 Soru Bankası", icon: BookOpen, badge: `${totalQuestionsCount} Soru` },
    { id: "cms", label: "🎨 Sayfa Metinleri & CMS", icon: Layout, badge: `${cmsContents.length} Sayfa` },
    { id: "curriculum", label: "📚 Müfredat & Dağılımlar", icon: BarChart3, badge: "Tam Kapsam" },
    { id: "media", label: "🖼️ Medya & Sistem", icon: Image, badge: "%100 Aktif" },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Premium Executive Header Banner */}
      <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-rose-500/30 bg-gradient-to-br from-rose-950/50 via-purple-950/30 to-gray-950 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-600 to-purple-600 text-white shadow-xl shadow-rose-600/40 border border-rose-400/40 shrink-0">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <div>
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <span className="rounded-full bg-rose-500/20 px-3 py-0.5 text-xs font-bold text-rose-300 border border-rose-500/40 font-mono">
                  SUPER ADMIN STUDIO
                </span>
                <span className="rounded-full bg-emerald-500/20 px-3 py-0.5 text-xs font-bold text-emerald-300 border border-emerald-500/40 font-mono flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                  FULL CRUD CANLI
                </span>
              </div>
              <h1 className="mt-1.5 font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
                Executive Control Studio 👑
              </h1>
              <p className="text-xs text-gray-300 mt-1 max-w-xl">
                Asimptot ÖSYM Hazırlık Platformu'nun tüm veritabanı, 120 soruluk deneme kitapçıkları, üyelik sistemi ve metin içeriklerini yönetin.
              </p>
            </div>
          </div>
        </div>

        {/* Executive KPI Metric Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 relative z-10">
          <div className="rounded-2xl glass-card p-3.5 border border-white/10 flex items-center space-x-3 bg-black/40">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Kayıtlı Üyeler</p>
              <p className="font-display font-extrabold text-white text-base">{totalUsersCount} Üye</p>
            </div>
          </div>

          <div className="rounded-2xl glass-card p-3.5 border border-white/10 flex items-center space-x-3 bg-black/40">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 shrink-0">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Deneme Kitapçıkları</p>
              <p className="font-display font-extrabold text-white text-base">{totalPacksCount} Kitapçık</p>
            </div>
          </div>

          <div className="rounded-2xl glass-card p-3.5 border border-white/10 flex items-center space-x-3 bg-black/40">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
              <FileCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Toplam Sorular</p>
              <p className="font-display font-extrabold text-white text-base">{totalQuestionsCount} Soru</p>
            </div>
          </div>

          <div className="rounded-2xl glass-card p-3.5 border border-white/10 flex items-center space-x-3 bg-black/40">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Veritabanı Durumu</p>
              <p className="font-display font-extrabold text-emerald-400 text-base">● Canlı & Aktif</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modern High-Contrast Sub-Tabs Navigation */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-white/10 custom-scrollbar">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2.5 px-4 py-3 rounded-2xl font-bold text-xs transition-all whitespace-nowrap border ${
                isActive
                  ? "bg-gradient-to-r from-rose-600 to-purple-600 text-white border-rose-500 shadow-xl shadow-rose-600/30 ring-2 ring-rose-400/40"
                  : "glass-card text-gray-400 border-white/5 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              <span
                className={`ml-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono ${
                  isActive ? "bg-black/30 text-rose-200" : "bg-white/10 text-gray-400"
                }`}
              >
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Animated Tab Workbench */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
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
