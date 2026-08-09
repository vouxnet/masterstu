"use client";

import React, { useState, useEffect } from "react";
import { TodoSummary } from "@/src/components/dashboard/TodoSummary";
import { QuickNavHub } from "@/src/components/dashboard/QuickNavHub";
import { PomodoroWidget } from "@/src/components/dashboard/PomodoroWidget";
import { useAuthStore, EXAM_METADATA } from "@/src/lib/store/useAuthStore";
import { useStudyLogStore } from "@/src/lib/store/useStudyLogStore";
import { useExamHistoryStore } from "@/src/lib/store/useExamHistoryStore";
import MemoryDecayWidget from "@/src/components/dashboard/MemoryDecayWidget";
import { DailyFactWidget } from "@/src/components/dashboard/DailyFactWidget";
import { DailyQuestWidget } from "@/src/components/dashboard/DailyQuestWidget";
import { DuoFriendsWidget } from "@/src/components/dashboard/DuoFriendsWidget";
import { Brain, Clock, Flame, BookOpen, TrendingUp, Sparkles, Camera, Calendar } from "lucide-react";
import { formatTimeRemaining } from "@/src/lib/utils";
import { LiveCurrentNewsWidget } from "@/src/components/dashboard/LiveCurrentNewsWidget";

export default function DashboardPage() {
  const { currentUser, partnerUser } = useAuthStore();

  const { getTodayStats, getWeeklyStats, getStreakCount } = useStudyLogStore();
  const { getLastN } = useExamHistoryStore();

  const activeExam = currentUser.activeExam || "kpss_lisans";
  const examMeta = EXAM_METADATA[activeExam];
  const targetDate = examMeta?.targetDate || "2026-09-06T10:15:00+03:00";

  const [time, setTime] = useState(formatTimeRemaining(targetDate));

  useEffect(() => {
    setTime(formatTimeRemaining(targetDate));
    const interval = setInterval(() => {
      setTime(formatTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const todayStats = getTodayStats(activeExam);
  const weeklyStats = getWeeklyStats(activeExam);
  const streak = getStreakCount();
  const streakFreezeInfo = useStudyLogStore((state) => state.getStreakFreezeInfo());
  const lastExams = getLastN(1, activeExam);

  return (
    <div className="space-y-6">
      {/* Layer 1: Top Banner (Always Visible) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-3xl glass-panel p-6 border border-white/10 shadow-xl">
        {/* Left: Welcome */}
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
              {examMeta?.title || currentUser.roleLabel}
            </span>
            <span className="text-xs text-gray-400 font-medium">Hoş Geldin! 👋</span>
          </div>
          <h1 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Merhaba, {currentUser.name}! 🎯
          </h1>
          <p className="mt-1 text-xs text-gray-300">
            {partnerUser ? `Bugün hedeflerini tamamla ve ${partnerUser.name} ile ortak serini koru!` : 'Bugün hedeflerini tamamla ve harika bir seri yakala!'}
          </p>
        </div>

        {/* Center: Countdown INLINE */}
        <div className="flex flex-col items-center md:border-l md:border-r border-white/10 md:px-8 py-2 md:py-0">
           <div className="flex items-center space-x-1.5 mb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">
             <Calendar className="h-4 w-4 text-indigo-400" />
             <span>Sınava Kalan</span>
           </div>
           <div className="flex items-baseline space-x-2">
             <span className="font-display text-3xl font-extrabold text-white">{String(time.days).padStart(2, "0")}</span>
             <span className="text-xs text-gray-400 font-medium">Gün</span>
             <span className="font-display text-xl font-bold text-gray-300 min-w-[90px] text-center whitespace-nowrap">
               {String(time.hours).padStart(2, "0")}:{String(time.minutes).padStart(2, "0")}:{String(time.seconds).padStart(2, "0")}
             </span>
           </div>
        </div>

        {/* Right: Streak & Daily */}
        <div className="flex items-center justify-end space-x-4 flex-1">
          <div className="flex flex-col items-end">
             <span className="text-[10px] text-gray-400 font-semibold uppercase">Günlük Seri</span>
             <div className="font-display text-lg font-bold text-amber-400 flex items-center">
               {streak > 0 ? `${streak} Gün 🔥` : 'Başla!'}
             </div>
          </div>
          <div className="h-10 w-px bg-white/10"></div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-400 font-semibold uppercase">Bugün</span>
            <span className="font-display text-lg font-bold text-emerald-400">
              {todayStats.totalMinutes > 0 ? `${todayStats.totalMinutes} Dk` : `Hedef: ${currentUser.dailyQuestionTarget}`}
            </span>
          </div>
        </div>
      </div>

      {/* Layer 2: Main Area (Spacious 2-Column Responsive Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Core Area (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          <DailyQuestWidget />
          <DuoFriendsWidget />
          
          {/* Haftalık İstatistik Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl glass-card p-4 border border-white/10 flex items-center space-x-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold">Günlük Seri</p>
                <p className="font-display font-bold text-white text-base flex items-center flex-wrap">
                  {streak > 0 ? `${streak} Gün 🔥` : 'Başla!'}
                  {streakFreezeInfo.freezes > 0 && (
                    <span className="text-[9px] text-cyan-400 ml-1 bg-cyan-900/40 px-1.5 py-0.5 rounded border border-cyan-500/30">🧊×{streakFreezeInfo.freezes}</span>
                  )}
                </p>
              </div>
            </div>

            <div className="rounded-2xl glass-card p-4 border border-white/10 flex items-center space-x-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold">Bu Hafta</p>
                <p className="font-display font-bold text-white text-base">{weeklyStats.totalMinutes > 0 ? `${weeklyStats.totalMinutes} Dk` : '0 Dk'}</p>
              </div>
            </div>

            <div className="rounded-2xl glass-card p-4 border border-white/10 flex items-center space-x-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold">Aktif Gün</p>
                <p className="font-display font-bold text-white text-base">{weeklyStats.activeDays}/7</p>
              </div>
            </div>

            <div className="rounded-2xl glass-card p-4 border border-white/10 flex items-center space-x-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 shrink-0">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold">Son Net</p>
                <p className="font-display font-bold text-white text-base">{lastExams[0] ? `${lastExams[0].totalNet}` : '—'}</p>
              </div>
            </div>
          </div>
          
          <MemoryDecayWidget />
        </div>

        {/* Right Core Area (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          <PomodoroWidget />
          <TodoSummary />
        </div>
      </div>

      {/* Layer 3: Micro-Learning & Current Affairs Hub (Full Width 2-Column Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DailyFactWidget />
        <LiveCurrentNewsWidget />
      </div>

      {/* Layer 4: Bottom Quick Access */}
      <div>
        <h3 className="font-display font-bold text-white text-lg mb-3 flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-indigo-400" />
          <span>Hızlı Modül Erişimi</span>
        </h3>
        <QuickNavHub />
      </div>
    </div>
  );
}

