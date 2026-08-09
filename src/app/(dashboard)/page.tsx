"use client";

import React from "react";
import { CountdownTimer } from "@/src/components/dashboard/CountdownTimer";
import { PartnerWidget } from "@/src/components/dashboard/PartnerWidget";
import { TodoSummary } from "@/src/components/dashboard/TodoSummary";
import { QuickNavHub } from "@/src/components/dashboard/QuickNavHub";
import { PomodoroWidget } from "@/src/components/dashboard/PomodoroWidget";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { useStudyLogStore } from "@/src/lib/store/useStudyLogStore";
import { useExamHistoryStore } from "@/src/lib/store/useExamHistoryStore";
import { SprintModeWidget } from "@/src/components/dashboard/SprintModeWidget";
import MemoryDecayWidget from "@/src/components/dashboard/MemoryDecayWidget";
import { RivalRadarWidget } from "@/src/components/dashboard/RivalRadarWidget";
import { DailyFactWidget } from "@/src/components/dashboard/DailyFactWidget";
import { DailyQuestWidget } from "@/src/components/dashboard/DailyQuestWidget";
import { PlacementProgressWidget } from "@/src/components/dashboard/PlacementProgressWidget";
import { AchievementCard } from "@/src/components/share/AchievementCard";
import { Brain, Clock, Flame, BookOpen, TrendingUp, Sparkles, Camera } from "lucide-react";

export default function DashboardPage() {
  const { currentUser, partnerUser } = useAuthStore();

  const { getTodayStats, getWeeklyStats, getStreakCount } = useStudyLogStore();
  const { getLastN } = useExamHistoryStore();

  const [showShareModal, setShowShareModal] = React.useState(false);

  const activeExam = currentUser.activeExam || "kpss_lisans";

  const todayStats = getTodayStats(activeExam);
  const weeklyStats = getWeeklyStats(activeExam);
  const streak = getStreakCount();
  const streakFreezeInfo = useStudyLogStore((state) => state.getStreakFreezeInfo());
  const lastExams = getLastN(1, activeExam);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-3xl glass-panel p-6 border border-white/10 shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
              {currentUser.roleLabel}
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

        <div className="flex items-center space-x-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-400 font-semibold uppercase">Bugün Çalışılan</span>
            <span className="font-display text-lg font-bold text-emerald-400">
              {todayStats.totalMinutes > 0 ? `${todayStats.totalMinutes} Dk` : `Hedef: ${currentUser.dailyQuestionTarget} Soru`}
            </span>
          </div>
          <div className="h-10 w-px bg-white/10"></div>
          <button 
            onClick={() => setShowShareModal(true)}
            className="flex items-center space-x-1.5 px-3 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 rounded-xl transition-colors text-indigo-300 font-medium text-sm"
          >
            <Camera className="w-4 h-4" />
            <span className="hidden sm:inline">Başarı Kartı</span>
          </button>
        </div>
      </div>

      {/* Daily Quest Widget */}
      <div>
        <DailyQuestWidget />
      </div>

      {/* Haftalık İstatistik Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-2xl glass-card p-4 border border-white/10 flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Flame className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-semibold">Günlük Seri</p>
            <p className="font-display font-bold text-white text-lg flex items-center">
              {streak > 0 ? `${streak} Gün 🔥` : 'Başla!'}
              {streakFreezeInfo.freezes > 0 && (
                <span className="text-[9px] text-cyan-400 ml-1 bg-cyan-900/40 px-1.5 py-0.5 rounded border border-cyan-500/30">🧊×{streakFreezeInfo.freezes}</span>
              )}
            </p>
          </div>
        </div>

        <div className="rounded-2xl glass-card p-4 border border-white/10 flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-semibold">Bu Hafta</p>
            <p className="font-display font-bold text-white text-lg">{weeklyStats.totalMinutes > 0 ? `${weeklyStats.totalMinutes} Dk` : '0 Dk'}</p>
          </div>
        </div>

        <div className="rounded-2xl glass-card p-4 border border-white/10 flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-semibold">Aktif Gün</p>
            <p className="font-display font-bold text-white text-lg">{weeklyStats.activeDays}/7</p>
          </div>
        </div>

        <div className="rounded-2xl glass-card p-4 border border-white/10 flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-semibold">Son Net</p>
            <p className="font-display font-bold text-white text-lg">{lastExams[0] ? `${lastExams[0].totalNet}` : '—'}</p>
          </div>
        </div>
      </div>

      {/* Placement Progress Widget */}
      <div>
        <PlacementProgressWidget />
      </div>

      {/* Main Grid: Countdown & Partner Widget */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CountdownTimer />
        </div>
        <div>
          <PartnerWidget />
        </div>
      </div>

      {/* Pomodoro Widget & Todo Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <PomodoroWidget />
        <TodoSummary />
      </div>

      {/* Quick Navigation Hub */}
      <div>
        <h3 className="font-display font-bold text-white text-lg mb-3 flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-indigo-400" />
          <span>Hızlı Modül Erişimi</span>
        </h3>
        <QuickNavHub />
      </div>
      
      {/* Sprint Mode Widget */}
      <div>
        <SprintModeWidget />
      </div>

      {/* Memory Decay Widget */}
      <div>
        <MemoryDecayWidget />
      </div>

      {/* Rival Radar Widget */}
      <div>
        <RivalRadarWidget />
      </div>

      {/* Daily Fact Widget */}
      <div>
        <DailyFactWidget />
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-h-screen overflow-y-auto w-full py-8">
            <AchievementCard type="daily" onClose={() => setShowShareModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
