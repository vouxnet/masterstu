"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { BlindSpotWidget } from "@/src/components/dashboard/BlindSpotWidget";

export default function DashboardPage() {
  const { currentUser, partnerUser } = useAuthStore();

  const { getTodayStats, getWeeklyStats, getStreakCount } = useStudyLogStore();
  const { getLastN } = useExamHistoryStore();

  const activeExam = currentUser.activeExam || "kpss_lisans";
  const examMeta = EXAM_METADATA[activeExam];
  const targetDate = examMeta?.targetDate || "2026-09-06T10:15:00+03:00";

  const [time, setTime] = useState(formatTimeRemaining(targetDate));
  const [mistakes, setMistakes] = useState<any[]>([]);
  const router = useRouter();

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

      const saved = localStorage.getItem("kpss_mistakes_v2");
      if (saved) {
        try {
          setMistakes(JSON.parse(saved));
        } catch (e) {}
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

        {/* Right: Daily Target */}
        <div className="flex items-center justify-end flex-1">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-400 font-semibold uppercase">Bugün</span>
            <span className="font-display text-lg font-bold text-emerald-400">
              {todayStats.totalMinutes > 0 ? `${todayStats.totalMinutes} Dk` : `Hedef: ${currentUser.dailyQuestionTarget} Soru`}
            </span>
          </div>
        </div>
      </div>

      {/* Layer 3: Güncel Olaylar Akışı (Tam Genişlik — Stat Bar Altı) */}
      <LiveCurrentNewsWidget />

      {/* Layer 4: Günün Bilgisi (Tam Genişlik) */}
      <DailyFactWidget />

      {/* Layer 4.5: AI Kör Nokta Teşhis Raporu */}
      <BlindSpotWidget mistakes={mistakes} />

      {/* Layer 5: Daily Quests & Focus Timer (Equal 2-Column) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DailyQuestWidget />
        <PomodoroWidget />
      </div>

      {/* Layer 6: Social & Daily Planning (Duo + Todo) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DuoFriendsWidget />
        <TodoSummary />
      </div>

      {/* Layer 7: Hafıza Çürümesi (Full Width) */}
      <MemoryDecayWidget />

      {/* Layer 8: Quick Module Access (Full Width) */}
      <div>
        <h3 className="font-display font-bold text-white text-lg mb-4 flex items-center space-x-2.5">
          <Sparkles className="h-5 w-5 text-indigo-400" />
          <span>Hızlı Modül Erişimi</span>
        </h3>
        <QuickNavHub />
      </div>
    </div>
  );
}

