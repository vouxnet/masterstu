"use client";

import React from "react";
import { useAdminStore } from "@/src/lib/store/useAdminStore";
import {
  Users,
  BookOpen,
  Layout,
  BarChart3,
  Activity,
  CheckCircle2,
  Database,
  ShieldCheck,
  TrendingUp,
  Cpu,
  FileCheck,
  Sparkles,
} from "lucide-react";
import { AdminTabType } from "./AdminSidebar";

interface AdminOverviewTabProps {
  setActiveTab: (tab: AdminTabType) => void;
}

export const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({ setActiveTab }) => {
  const { users, customExamPacks, cmsContents, customDistributions } = useAdminStore();

  const totalQuestions = customExamPacks.reduce((acc, p) => acc + p.questions.length, 0);
  const activeUsersCount = users.filter((u) => u.status === "active").length;

  return (
    <div className="space-y-6">
      {/* Executive Welcome Banner */}
      <div className="rounded-3xl glass-panel p-6 border border-rose-500/30 bg-gradient-to-br from-rose-950/40 via-purple-950/20 to-gray-950 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30 font-mono">
              EXECUTIVE ANALYTICS OVERVIEW
            </span>
            <h2 className="text-2xl font-black text-white mt-2">
              Sistem Genel Durumu & Canlı Metrikler 👑
            </h2>
            <p className="text-xs text-gray-300 mt-1 max-w-xl">
              Platform veritabanının anlık durumunu, aktif üyeleri, 120 soruluk sınav kütüphanesini ve CMS metin içeriklerini tek bakışta izleyin.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab("users")}
          className="rounded-2xl glass-card p-5 border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer group bg-black/40"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kullanıcılar</span>
            <div className="h-9 w-9 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <p className="font-display font-black text-white text-2xl mt-2">{users.length} Üye</p>
          <p className="text-[11px] text-emerald-400 font-medium mt-1">● {activeUsersCount} Aktif Kullanıcı</p>
        </div>

        <div
          onClick={() => setActiveTab("questions")}
          className="rounded-2xl glass-card p-5 border border-white/10 hover:border-purple-500/40 transition-all cursor-pointer group bg-black/40"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">120 Soru Bankası</span>
            <div className="h-9 w-9 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
          <p className="font-display font-black text-white text-2xl mt-2">{totalQuestions} Soru</p>
          <p className="text-[11px] text-purple-300 font-medium mt-1">{customExamPacks.length} Kitapçık Paketi</p>
        </div>

        <div
          onClick={() => setActiveTab("cms")}
          className="rounded-2xl glass-card p-5 border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer group bg-black/40"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">CMS Metin Yönetimi</span>
            <div className="h-9 w-9 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Layout className="h-5 w-5" />
            </div>
          </div>
          <p className="font-display font-black text-white text-2xl mt-2">{cmsContents.length} Bölüm</p>
          <p className="text-[11px] text-cyan-300 font-medium mt-1">Tüm Sayfalar Bağlı</p>
        </div>

        <div className="rounded-2xl glass-card p-5 border border-white/10 bg-black/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sistem Sağlığı</span>
            <div className="h-9 w-9 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center">
              <Database className="h-5 w-5" />
            </div>
          </div>
          <p className="font-display font-black text-emerald-400 text-xl mt-2">● %100 Uptime</p>
          <p className="text-[11px] text-gray-400 font-medium mt-1">Sorumlu Gecikme: 24ms</p>
        </div>
      </div>

      {/* Quick Action Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => setActiveTab("users")}
          className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-rose-500/40 transition-all cursor-pointer space-y-2 group"
        >
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-rose-400 group-hover:scale-110 transition-transform" />
            <h4 className="font-display font-bold text-white text-sm">Üyeleri Yönet</h4>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Yeni üyeler ekleyin, kullanıcı rollerini (Lisans/Önlisans/Admin) değiştirin veya hesapları engelleyin.
          </p>
        </div>

        <div
          onClick={() => setActiveTab("questions")}
          className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-purple-500/40 transition-all cursor-pointer space-y-2 group"
        >
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-purple-400 group-hover:scale-110 transition-transform" />
            <h4 className="font-display font-bold text-white text-sm">Soru Bankasını Düzenle</h4>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            120 sorunun metnini, 5 seçeneğini, doğru cevabını ve çözümlerini anlık olarak güncelleyin.
          </p>
        </div>

        <div
          onClick={() => setActiveTab("cms")}
          className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-cyan-500/40 transition-all cursor-pointer space-y-2 group"
        >
          <div className="flex items-center space-x-2">
            <Layout className="h-5 w-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <h4 className="font-display font-bold text-white text-sm">Sayfa Metinlerini Değiştir</h4>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Öğrenci panelindeki tüm duyuruları, sloganları ve başlıkları noktasından virgülüne canlıya alın.
          </p>
        </div>
      </div>
    </div>
  );
};
