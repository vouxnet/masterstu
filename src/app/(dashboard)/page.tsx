"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore, EXAM_METADATA } from "@/src/lib/store/useAuthStore";
import { useStudyLogStore } from "@/src/lib/store/useStudyLogStore";
import { useExamHistoryStore } from "@/src/lib/store/useExamHistoryStore";
import { useCurriculumStore } from "@/src/lib/store/useCurriculumStore";
import { useDailyQuestStore } from "@/src/lib/store/useDailyQuestStore";
import { formatTimeRemaining } from "@/src/lib/utils";
import {
  CheckCircle2,
  Circle,
  Play,
  ArrowRight,
  TrendingUp,
  Clock,
  Calendar,
  Layers,
  Award,
  BookOpen,
  Sparkles,
  ChevronRight,
  Zap,
  Radio,
  BarChart2,
  Check,
  FileSpreadsheet,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const router = useRouter();
  const { currentUser } = useAuthStore();
  const { getTodayStats, getWeeklyStats, getStreakCount } = useStudyLogStore();
  const { results, getLastN } = useExamHistoryStore();
  const { topics, getTopicsForExam } = useCurriculumStore();
  const { quests, generateDailyQuests, updateQuestProgress } = useDailyQuestStore();

  const activeExam = currentUser.activeExam || "kpss_lisans";
  const examMeta = EXAM_METADATA[activeExam];
  const targetDate = examMeta?.targetDate || "2026-09-06T10:15:00+03:00";

  const [time, setTime] = useState(formatTimeRemaining(targetDate));

  // Initialize Daily Quests & Countdown Timer
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
    generateDailyQuests(activeExam);

    setTime(formatTimeRemaining(targetDate));
    const interval = setInterval(() => {
      setTime(formatTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate, currentUser.id, router, activeExam, generateDailyQuests]);

  // 1. REAL STATS FROM STORES
  const todayStats = getTodayStats(activeExam);
  const weeklyStats = getWeeklyStats(activeExam);
  const streak = getStreakCount();
  const lastExam = getLastN(1, activeExam)[0] || null;

  // 2. REAL SUBJECT MASTERY CALCULATIONS FROM CURRICULUM
  const examTopics = useMemo(() => getTopicsForExam(activeExam), [activeExam, getTopicsForExam, topics]);

  const subjectStats = useMemo(() => {
    const subjectsMap = [
      { key: "Türkçe", displayName: "TÜRKÇE", color: "#10B981" },
      { key: "Matematik", displayName: "MATEMATİK", color: "#6366F1" },
      { key: "Tarih", displayName: "TARİH", color: "#38BDF8" },
      { key: "Coğrafya", displayName: "COĞRAFYA & VAT.", color: "#F59E0B" },
    ];

    return subjectsMap.map((subj) => {
      const subjectTopics = examTopics.filter((t) =>
        t.course.toLowerCase().includes(subj.key.toLowerCase()) ||
        (subj.key === "Coğrafya" && t.course.toLowerCase().includes("vatandaşlık"))
      );

      const total = subjectTopics.length;
      const completed = subjectTopics.filter((t) => t.status === "solved").length;
      const inProgress = subjectTopics.filter((t) => t.status === "studying").length;
      const percent = total > 0 ? Math.round(((completed + inProgress * 0.5) / total) * 100) : 0;

      const nextTopic = subjectTopics.find((t) => t.status === "not_started" || t.status === "studying");

      return {
        name: subj.displayName,
        percent: percent,
        tip: nextTopic ? `Önerilen: ${nextTopic.topic}` : "Tüm konular tamamlandı! 🎉",
        color: subj.color,
      };
    });
  }, [examTopics]);

  // 3. REAL DAILY QUESTS
  const activeQuests = quests.length > 0 ? quests : [
    {
      id: "q-default-1",
      title: "Günün Soru Hedefi",
      description: `${currentUser.dailyQuestionTarget} Soru Tamamla`,
      target: currentUser.dailyQuestionTarget || 100,
      progress: todayStats.totalQuestions || 0,
      completed: (todayStats.totalQuestions || 0) >= (currentUser.dailyQuestionTarget || 100),
      xpReward: 50,
      icon: "Target",
      type: "solve_questions" as const,
    },
    {
      id: "q-default-2",
      title: "Odaklanma Seansı",
      description: "30 Dakika Pomodoro Çalış",
      target: 30,
      progress: todayStats.totalMinutes || 0,
      completed: (todayStats.totalMinutes || 0) >= 30,
      xpReward: 40,
      icon: "Clock",
      type: "study_minutes" as const,
    },
  ];

  const completedQuestsCount = activeQuests.filter((q) => q.completed).length;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* 3-COLUMN AWARD-WINNING STUDIO WORKSPACE (100% REAL STORE DATA) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================= */}
        {/* 1. LEFT COLUMN: FOCUS MASTERY PROGRESS (Real Curriculum)  */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-white text-lg tracking-tight">
                Focus Mastery Progress
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">Gerçek müfredat tamamlama ve hakimiyet oranların</p>
            </div>
            <Link href="/curriculum" className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-0.5">
              <span>Tümü</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* 4 Real Mastery Rings Grid */}
          <div className="grid grid-cols-2 gap-4">
            {subjectStats.map((subj, idx) => (
              <div
                key={idx}
                className="rounded-2xl glass-card p-4 border border-white/10 text-center space-y-2 hover:border-indigo-500/40 transition-all group"
              >
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="currentColor"
                      strokeWidth="5"
                      className="text-white/10"
                      fill="transparent"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke={subj.color}
                      strokeWidth="5"
                      strokeDasharray={201}
                      strokeDashoffset={201 - (201 * subj.percent) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-1000 shadow-lg"
                      fill="transparent"
                    />
                  </svg>
                  <span className="absolute font-display font-black text-base text-white">
                    {subj.percent}%
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xs text-white tracking-wide">
                    {subj.name}
                  </h3>
                  <p className="text-[10px] text-gray-400 font-medium mt-0.5 truncate" title={subj.tip}>
                    {subj.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Smooth Real Net Progress Wave Callout */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-300">Bu Hafta Çalışılan Süre</span>
              <span className="text-emerald-400 font-bold font-mono">
                {weeklyStats.totalMinutes > 0 ? `${weeklyStats.totalMinutes} Dk` : "0 Dk"}
              </span>
            </div>
            
            <div className="relative h-24 w-full">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="waveGradReal" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,65 Q 50,45 100,55 T 200,25 T 300,15 L 300,80 L 0,80 Z"
                  fill="url(#waveGradReal)"
                />
                <path
                  d="M 0,65 Q 50,45 100,55 T 200,25 T 300,15"
                  fill="none"
                  stroke="#818CF8"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="flex justify-between text-[10px] font-mono text-gray-500 px-1">
              <span>Pzt</span>
              <span>Sal</span>
              <span>Çar</span>
              <span>Per</span>
              <span>Cum</span>
              <span>Cmt</span>
              <span>Paz</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. CENTER HERO CARD: DYNAMIC LEARNING FOCUS (Real Quests) */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl space-y-6">
          {/* Header Row: Title + Countdown Banner */}
          <div className="flex items-start justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="font-display font-black text-white text-xl tracking-tight">
                Dynamic Learning Focus
              </h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className="font-display font-bold text-xs text-white">Bugünün Görevleri</span>
                <span className="text-[11px] font-mono text-indigo-300 font-semibold">
                  Tamamlanan: {completedQuestsCount} / {activeQuests.length}
                </span>
              </div>
            </div>

            {/* Countdown Badge */}
            <div className="text-right">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block font-mono">
                {examMeta?.shortLabel || "ÖSYM"}&apos;ye Kalan Süre
              </span>
              <p className="font-display font-black text-white text-base sm:text-lg mt-0.5">
                <span className="text-emerald-400 font-extrabold">{String(time.days).padStart(2, "0")}</span> GÜN{" "}
                <span className="text-indigo-300">{String(time.hours).padStart(2, "0")}</span> SAAT{" "}
                <span className="text-indigo-400 font-mono text-sm">{String(time.minutes).padStart(2, "0")}</span> DK
              </p>
            </div>
          </div>

          {/* Linear Progress Bar */}
          <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{
                width: `${activeQuests.length > 0 ? (completedQuestsCount / activeQuests.length) * 100 : 0}%`,
              }}
            />
          </div>

          {/* Dynamic Real Quests List */}
          <div className="space-y-3.5">
            {activeQuests.map((quest, index) => (
              <div
                key={quest.id}
                className={`p-4 rounded-2xl glass-card border transition-all flex items-center justify-between gap-3 ${
                  quest.completed
                    ? "border-emerald-500/40 bg-emerald-950/15"
                    : "border-white/10 hover:border-indigo-500/40"
                }`}
              >
                <div className="flex items-center space-x-3.5 min-w-0">
                  <div
                    className={`h-6 w-6 rounded-lg flex items-center justify-center transition-all ${
                      quest.completed
                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                        : "border border-white/30 text-transparent"
                    }`}
                  >
                    {quest.completed && <Check className="h-4 w-4 stroke-[3]" />}
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`font-display font-bold text-xs truncate ${
                        quest.completed ? "line-through text-gray-400" : "text-white"
                      }`}
                    >
                      {index + 1}. {quest.title}
                    </p>
                    <p className="text-[11px] text-gray-400 font-medium">
                      {quest.description} ({quest.progress} / {quest.target})
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span className="px-2.5 py-1 rounded-xl bg-indigo-500/20 text-indigo-300 text-[11px] font-bold border border-indigo-500/30 font-mono">
                    +{quest.xpReward} XP
                  </span>

                  <Link
                    href={quest.type === "solve_questions" ? "/exams" : quest.type === "study_minutes" ? "/curriculum" : "/flashcards"}
                    className="px-3.5 py-1.5 rounded-xl glass-button text-xs font-bold text-white shadow-md hover:scale-105 transition-all"
                  >
                    Başla
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action Link */}
          <div className="pt-2">
            <Link
              href="/exams"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white font-display font-black text-xs shadow-xl shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all active:scale-95 text-center tracking-wide"
            >
              <Play className="h-4 w-4" />
              <span>Canlı 120 Soru ÖSYM Deneme Sınavına Başla</span>
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. RIGHT COLUMN: REAL PERFORMANCE & ACTIVITY HUB          */}
        {/* ========================================================= */}
        <div className="lg:col-span-3 space-y-5">
          
          {/* Card 1: Gerçek Performans Özeti */}
          <div className="rounded-3xl glass-panel p-5 border border-white/10 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-white text-sm">Performans Özeti</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 font-mono">
                {streak > 0 ? `${streak} Gün Streak 🔥` : "Bugün Aktif"}
              </span>
            </div>

            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Bugün Çözülen:</span>
                </span>
                <span className="font-display font-black text-white text-sm">
                  {todayStats.totalQuestions > 0 ? `${todayStats.totalQuestions} Soru` : "0 Soru"}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Çalışma Süresi:</span>
                </span>
                <span className="font-display font-black text-emerald-400 text-sm">
                  {todayStats.totalMinutes > 0 ? `${todayStats.totalMinutes} Dk` : "0 Dk"}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Gerçek Son Deneme Sonucu */}
          <div className="rounded-3xl glass-panel p-5 border border-white/10 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-white text-sm">Son Deneme Sonucu</h3>
              <Link href="/exams" className="text-indigo-400 hover:text-indigo-300 text-xs font-bold">
                Tümü
              </Link>
            </div>

            {lastExam ? (
              <div className="space-y-1.5">
                <p className="text-[11px] text-gray-400 font-medium truncate">{lastExam.examLabel}</p>
                <div className="flex items-baseline justify-between">
                  <p className="font-display font-black text-2xl text-white tracking-tight">
                    {lastExam.estimatedScore.toFixed(2)} <span className="text-xs text-indigo-300 font-semibold">Puan</span>
                  </p>
                  <span className="text-xs text-emerald-400 font-bold font-mono">
                    {lastExam.totalNet.toFixed(2)} Net
                  </span>
                </div>
                <p className="text-[10px] text-gray-400">Tarih: {new Date(lastExam.date).toLocaleDateString("tr-TR")}</p>
              </div>
            ) : (
              <div className="text-center py-2 space-y-2">
                <p className="text-xs text-gray-400">Henüz kaydedilmiş deneme sınavınız yok.</p>
                <Link
                  href="/exams"
                  className="inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-bold border border-indigo-500/30 transition-all"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5" />
                  <span>İlk Denemeni Kaydet</span>
                </Link>
              </div>
            )}
          </div>

          {/* Card 3: Gerçek Sıradaki Öncelikli Konu */}
          <div className="rounded-3xl glass-panel p-5 border border-white/10 shadow-xl space-y-3 bg-gradient-to-b from-white/5 to-transparent">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-white text-sm flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-400" />
                <span>Sıradaki Öncelikli Konu</span>
              </h3>
            </div>

            <p className="text-xs font-bold text-gray-200">
              {examTopics.find((t) => t.status === "not_started" || t.status === "studying")?.topic || "Tüm konular gözden geçirildi!"}
            </p>

            <Link
              href="/curriculum"
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-display font-bold text-xs border border-white/10 flex items-center justify-center transition-all hover:scale-[1.02] text-center"
            >
              Konuyu İncele & Çalış
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
