"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore, EXAM_METADATA } from "@/src/lib/store/useAuthStore";
import { useStudyLogStore } from "@/src/lib/store/useStudyLogStore";
import { useExamHistoryStore } from "@/src/lib/store/useExamHistoryStore";
import { useAdminStore } from "@/src/lib/store/useAdminStore";
import { formatTimeRemaining } from "@/src/lib/utils";
import {
  Brain,
  Clock,
  Flame,
  BookOpen,
  TrendingUp,
  Sparkles,
  Calendar,
  CheckCircle2,
  Circle,
  Play,
  ArrowRight,
  Target,
  Award,
  AlertTriangle,
  Layers,
  ChevronRight,
  Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const { currentUser, partnerUser } = useAuthStore();
  const getCmsContent = useAdminStore((state) => state.getCmsContent);
  const cmsWelcome = getCmsContent(
    "home_welcome",
    `Merhaba, ${currentUser.name}! 🎯`,
    "",
    "Bugün hedeflerini tamamla ve ÖSYM standartlarında netlerini artır!"
  );

  const { getTodayStats, getWeeklyStats, getStreakCount } = useStudyLogStore();
  const { getLastN, results } = useExamHistoryStore();

  const activeExam = currentUser.activeExam || "kpss_lisans";
  const examMeta = EXAM_METADATA[activeExam];
  const targetDate = examMeta?.targetDate || "2026-09-06T10:15:00+03:00";

  const [time, setTime] = useState(formatTimeRemaining(targetDate));
  const router = useRouter();

  // Dynamic Daily Tasks (Interactive Checklist)
  const [tasks, setTasks] = useState([
    { id: "t1", title: "Türkçe: Paragrafta Anlam & Yapı", target: "30 Soru", href: "/exams", done: false, badge: "Öncelikli" },
    { id: "t2", title: "Matematik: Problemler & Sayısal Mantık", target: "25 Soru", href: "/exams", done: false, badge: "Yüksek Net" },
    { id: "t3", title: "Tarih: Kurtuluş Savaşı İnkılap Tarihi", target: "20 Flashcard", href: "/flashcards", done: true, badge: "Tekrar" },
    { id: "t4", title: "Vatandaşlık: Temel Hak ve Hürriyetler", target: "15 Soru", href: "/exams", done: false, badge: "Kritik" },
  ]);

  useEffect(() => {
    if (currentUser.role === "admin" || currentUser.email === "admin@asimptot.app") {
      router.push("/admin");
      return;
    }
    if (typeof window !== "undefined") {
      const onboarded = localStorage.getItem("asimptot_onboarded");
      if (onboarded !== "true" && currentUser.id) {
        router.push("/onboarding");
      }
    }
    setTime(formatTimeRemaining(targetDate));
    const interval = setInterval(() => {
      setTime(formatTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate, currentUser.id, router]);

  const todayStats = getTodayStats(activeExam);
  const weeklyStats = getWeeklyStats(activeExam);
  const streak = getStreakCount();
  const lastExam = results.length > 0 ? results[results.length - 1] : null;

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.done).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  // Subject Mastery Rings Data
  const masterySubjects = [
    { name: "Türkçe", percent: 82, sub: "Paragraf Güçlü", color: "from-indigo-500 to-cyan-400" },
    { name: "Matematik", percent: 68, sub: "Problemler Tekrar", color: "from-purple-500 to-indigo-500" },
    { name: "Tarih", percent: 75, sub: "İnkılap Tamam", color: "from-amber-500 to-orange-400" },
    { name: "Coğrafya & Vat.", percent: 88, sub: "Yüksek Başarı", color: "from-emerald-500 to-teal-400" },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-8">
      {/* 1. TOP UNIFIED STATUS BAR */}
      <div className="rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/30 border border-white/10 shrink-0">
            <Brain className="h-7 w-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="rounded-full bg-indigo-500/20 px-3 py-0.5 text-xs font-bold text-indigo-300 border border-indigo-500/30 font-mono">
                {examMeta?.title || currentUser.roleLabel}
              </span>
              <span className="rounded-full bg-emerald-500/20 px-3 py-0.5 text-xs font-bold text-emerald-300 border border-emerald-500/30 font-mono flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Hedef Odaklı Mod
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
              {cmsWelcome.title.replace("{kullanıcı}", currentUser.name)}
            </h1>
            <p className="text-xs text-gray-300 mt-0.5">
              {cmsWelcome.bodyText}
            </p>
          </div>
        </div>

        {/* Live Countdown & Target Block */}
        <div className="flex items-center space-x-6 md:border-l border-white/10 md:pl-8">
          <div className="text-center md:text-left">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <Calendar className="h-3 w-3 text-indigo-400" />
              <span>Sınava Kalan</span>
            </span>
            <div className="flex items-baseline space-x-1.5 mt-0.5">
              <span className="font-display text-3xl font-black text-white">{String(time.days).padStart(2, "0")}</span>
              <span className="text-xs text-gray-400 font-semibold">Gün</span>
              <span className="font-mono text-sm text-indigo-300 font-bold ml-1">
                {String(time.hours).padStart(2, "0")}:{String(time.minutes).padStart(2, "0")}:{String(time.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="hidden sm:block text-right">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Bugünkü Hedef</span>
            <p className="font-display font-extrabold text-emerald-400 text-lg mt-0.5">
              {todayStats.totalMinutes > 0 ? `${todayStats.totalMinutes} Dk Çalışıldı` : `${currentUser.dailyQuestionTarget} Soru`}
            </p>
          </div>
        </div>
      </div>

      {/* 2. THE 3-COLUMN AWARD-WINNING STUDIO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: FOCUS MASTERY PROGRESS (3.5 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl glass-panel p-6 border border-white/10 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="font-display font-bold text-white text-base">Ders Hakimiyet İlerlemesi</h3>
                <p className="text-[11px] text-gray-400">Konu tamamlama ve net yeterlilik oranları</p>
              </div>
              <Award className="h-5 w-5 text-indigo-400" />
            </div>

            {/* 4 Mastery Cards */}
            <div className="grid grid-cols-2 gap-3.5">
              {masterySubjects.map((subj, i) => (
                <div key={i} className="p-4 rounded-2xl glass-card border border-white/10 text-center space-y-2 relative overflow-hidden group hover:border-indigo-500/40 transition-all">
                  <div className="relative inline-flex items-center justify-center">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="4" className="text-white/10" fill="transparent" />
                      <circle
                        cx="32"
                        cy="32"
                        r="26"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeDasharray={163}
                        strokeDashoffset={163 - (163 * subj.percent) / 100}
                        strokeLinecap="round"
                        className="text-indigo-400 transition-all duration-1000"
                        fill="transparent"
                      />
                    </svg>
                    <span className="absolute font-display font-extrabold text-sm text-white">{subj.percent}%</span>
                  </div>
                  <div>
                    <p className="font-display font-bold text-xs text-white">{subj.name}</p>
                    <p className="text-[10px] text-gray-400">{subj.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Weekly Trend Mini Graph Callout */}
            <div className="p-3.5 rounded-2xl glass-card border border-white/10 bg-black/40 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="h-8 w-8 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Haftalık Net Trendi</p>
                  <p className="text-[10px] text-emerald-400 font-semibold">+6.5 Net Artış (Geçen Haftaya Göre)</p>
                </div>
              </div>
              <Link href="/exams" className="text-[11px] text-indigo-400 hover:text-indigo-300 font-bold flex items-center">
                <span>Detay</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: DYNAMIC LEARNING FOCUS (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <h2 className="font-display font-black text-white text-lg flex items-center gap-2">
                  <span>Dynamic Learning Focus</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono border border-indigo-500/30">
                    ÖSYM 2026
                  </span>
                </h2>
                <p className="text-xs text-gray-400">Bugün öncelikli tamamlaman gereken kritik görevler</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-indigo-300 font-bold">
                  {completedCount}/{tasks.length} Tamamlandı
                </span>
                <div className="w-20 h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                </div>
              </div>
            </div>

            {/* Task Checklist Items */}
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-2xl glass-card border transition-all flex items-center justify-between gap-3 ${
                    task.done ? "border-emerald-500/40 bg-emerald-950/10 opacity-75" : "border-white/10 hover:border-indigo-500/40"
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`h-6 w-6 rounded-lg flex items-center justify-center transition-all ${
                        task.done ? "bg-emerald-500 text-white" : "border border-white/30 hover:border-indigo-400"
                      }`}
                    >
                      {task.done && <CheckCircle2 className="h-4 w-4" />}
                    </button>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className={`font-display font-bold text-xs truncate ${task.done ? "line-through text-gray-400" : "text-white"}`}>
                          {task.title}
                        </p>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-white/10 text-indigo-300 font-mono">
                          {task.badge}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-400 font-medium">{task.target}</p>
                    </div>
                  </div>

                  <Link
                    href={task.href}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-xl glass-button text-[11px] font-bold text-white shrink-0 hover:scale-105 transition-transform"
                  >
                    <span>Derse Git</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>

            {/* Quick Action Bar (Start Pomodoro / Quick Practice) */}
            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/exams"
                className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-display font-extrabold text-xs shadow-xl shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all active:scale-95 text-center"
              >
                <Play className="h-4 w-4" />
                <span>Canlı 120 Soru Denemesine Başla</span>
              </Link>
              <Link
                href="/flashcards"
                className="py-3 px-4 rounded-2xl glass-card border border-white/10 hover:border-white/20 text-xs font-bold text-gray-200 hover:text-white flex items-center space-x-1.5 transition-all text-center"
              >
                <Layers className="h-4 w-4 text-purple-400" />
                <span>Kartları Tekrar Et</span>
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INTELLIGENCE & PERFORMANCE HUB (3.5 Cols) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Performance Overview Card */}
          <div className="rounded-3xl glass-panel p-5 border border-white/10 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <h3 className="font-display font-bold text-white text-sm">Performans Özeti</h3>
              <Activity className="h-4 w-4 text-emerald-400" />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl glass-card border border-white/10 text-center bg-black/30">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Çözülen Soru</span>
                <p className="font-display font-black text-white text-lg mt-0.5">
                  {todayStats.totalQuestions > 0 ? todayStats.totalQuestions : "120"}
                </p>
              </div>
              <div className="p-3 rounded-xl glass-card border border-white/10 text-center bg-black/30">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Başarı Oranı</span>
                <p className="font-display font-black text-emerald-400 text-lg mt-0.5">
                  %84
                </p>
              </div>
            </div>

            {/* Last Exam Card */}
            <div className="p-3.5 rounded-2xl glass-card border border-indigo-500/30 bg-indigo-950/20 space-y-1.5">
              <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider font-mono">
                Son Deneme Sonucu
              </span>
              <div className="flex items-baseline justify-between">
                <p className="font-display font-black text-white text-xl">
                  {lastExam ? `${lastExam.estimatedScore.toFixed(2)} Puan` : "86.450 Puan"}
                </p>
                <span className="text-xs text-emerald-400 font-bold font-mono">
                  {lastExam ? `${lastExam.totalNet.toFixed(2)} Net` : "78.25 Net"}
                </span>
              </div>
              <p className="text-[10px] text-gray-400">ÖSYM Standart Katsayı P3 Tahmini</p>
            </div>

            {/* Critical Memory Retention Alert */}
            <div className="p-3.5 rounded-2xl glass-card border border-amber-500/30 bg-amber-950/20 space-y-2">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                <p className="text-xs font-bold text-white">Ebbinghaus Kritik Tekrar</p>
              </div>
              <p className="text-[11px] text-gray-300 leading-relaxed">
                <span className="text-amber-300 font-bold">2 konu</span> unutma eğrisinde kritik seviyede: <em>İdare Hukuku & İklim Bilgisi</em>.
              </p>
              <Link
                href="/curriculum"
                className="inline-flex items-center text-[11px] font-bold text-amber-400 hover:text-amber-300 gap-1"
              >
                <span>Hemen Tekrar Et</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
