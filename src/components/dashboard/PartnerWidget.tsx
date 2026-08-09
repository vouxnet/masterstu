"use client";

import React from "react";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { Flame, Hand, PartyPopper, CheckCircle2, MessageSquarePlus, Trophy, Target, TrendingUp, BookOpen, Swords } from "lucide-react";
import confetti from "canvas-confetti";
import { useStudyLogStore } from "@/src/lib/store/useStudyLogStore";
import { useExamHistoryStore } from "@/src/lib/store/useExamHistoryStore";
import { useCurriculumStore, examTypeToRole } from "@/src/lib/store/useCurriculumStore";
import { calculatePerformanceScore, simulatePartnerScore } from "@/src/lib/utils/performanceNormalizer";

export const PartnerWidget: React.FC = () => {
  const { currentUser, partnerUser, duoStreak, sendPokeToPartner, sendCheerToPartner, setQuickActionOpen } =
    useAuthStore();

  const studyLogs = useStudyLogStore((state) => state.logs);
  const examResults = useExamHistoryStore((state) => state.results);
  const topics = useCurriculumStore((state) => state.topics);

  const currentUserScore = calculatePerformanceScore(
    examResults.filter(r => r.examType === currentUser.activeExam),
    studyLogs.filter(l => l.examType === currentUser.activeExam),
    topics.filter(t => t.userRole === examTypeToRole(currentUser.activeExam)),
    currentUser.name,
    currentUser.activeExam
  );

  const partnerScore = simulatePartnerScore(partnerUser.name, "kpss_onlisans");

  const totalCombinedScore = currentUserScore.totalScore + partnerScore.totalScore;
  const userRatio = totalCombinedScore > 0 ? (currentUserScore.totalScore / totalCombinedScore) * 100 : 50;

  const scoreDiff = currentUserScore.totalScore - partnerScore.totalScore;
  let comparisonMessage = 'Başa baş gidiyorsunuz! ⚡';
  let comparisonColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
  if (scoreDiff > 0) {
    comparisonMessage = 'Bu hafta partnerini geçtin! 🏆';
    comparisonColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
  } else if (scoreDiff < 0) {
    comparisonMessage = `Partnerin ${Math.abs(scoreDiff).toFixed(1)} puan önde 🔥`;
    comparisonColor = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  }

  const percentage = Math.min(
    100,
    Math.round(
      (partnerUser.completedQuestionsToday / partnerUser.dailyQuestionTarget) * 100
    )
  );

  const handleCheerWithConfetti = () => {
    sendCheerToPartner();
    // Fire confetti cannon
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#6366F1", "#10B981", "#F59E0B", "#EC4899"],
    });
  };

  return (
    <div className="rounded-3xl glass-panel p-6 border border-white/10 shadow-xl relative overflow-hidden">
      {/* Glow Effect */}
      <div className="pointer-events-none absolute -right-12 -bottom-12 h-36 w-36 rounded-full bg-pink-500/10 blur-2xl" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={partnerUser.avatarUrl}
              alt={partnerUser.name}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-pink-500/60 shadow-md"
            />
            <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-[#0B0F19]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-display font-bold text-white text-base">
                {partnerUser.name}
              </h3>
              <span className="rounded-full bg-pink-500/20 px-2 py-0.5 text-[10px] font-semibold text-pink-300 border border-pink-500/30">
                Partner (Co-Op)
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium">
              {partnerUser.roleLabel} • Canlı Çalışıyor ⏳
            </p>
          </div>
        </div>

        {/* Duo Streak Badge */}
        <div className="flex items-center space-x-1.5 rounded-xl bg-amber-500/10 px-3 py-1.5 border border-amber-500/30">
          <Flame className="h-4 w-4 text-amber-400 animate-bounce" />
          <span className="font-display text-xs font-bold text-amber-300">
            {duoStreak} Gün Seri
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-5 rounded-2xl glass-card p-4 border border-white/5">
        <div className="flex justify-between items-center text-xs font-semibold mb-2">
          <span className="text-gray-300">Günlük İlerleme Yüzdesi</span>
          <span className="text-emerald-400 font-display font-bold">{percentage}%</span>
        </div>
        <div className="h-3 w-full rounded-full bg-gray-800 overflow-hidden p-0.5 border border-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-500 shadow-md"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[11px] text-gray-400 mt-2">
          <span>
            Çözülen: <strong className="text-white">{partnerUser.completedQuestionsToday} Soru</strong>
          </span>
          <span>
            Hedef: <strong className="text-gray-300">{partnerUser.dailyQuestionTarget} Soru</strong>
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={sendPokeToPartner}
          className="flex items-center justify-center space-x-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/30 py-2.5 px-3 text-xs font-semibold transition-all active:scale-95"
        >
          <Hand className="h-4 w-4 text-indigo-400" />
          <span>Dürt 👉</span>
        </button>

        <button
          onClick={handleCheerWithConfetti}
          className="flex items-center justify-center space-x-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/30 py-2.5 px-3 text-xs font-semibold transition-all active:scale-95"
        >
          <PartyPopper className="h-4 w-4 text-emerald-400" />
          <span>Tebrik Et 🎉</span>
        </button>

        <button
          onClick={() => setQuickActionOpen(true)}
          className="flex items-center justify-center space-x-1.5 rounded-xl bg-pink-600/30 hover:bg-pink-600/50 text-pink-200 border border-pink-500/30 py-2.5 px-3 text-xs font-semibold transition-all active:scale-95"
        >
          <MessageSquarePlus className="h-4 w-4 text-pink-400" />
          <span>Soru Sor 📸</span>
        </button>
      </div>

      {/* Asymmetric Performance Comparison */}
      <div className="mt-6 border-t border-white/10 pt-5 relative">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2 text-sm font-semibold text-white">
            <Trophy className="h-4 w-4 text-yellow-400" />
            <span>Asimetrik Rekabet Motoru</span>
          </div>
          <div className={`px-2.5 py-1 rounded-lg border text-xs font-bold ${comparisonColor}`}>
            {comparisonMessage}
          </div>
        </div>

        {/* Two-Sided Bar */}
        <div className="flex items-center justify-between text-xs font-display mb-1 px-1">
          <span className="text-indigo-400 font-bold">{currentUser.name} ({currentUserScore.totalScore.toFixed(1)})</span>
          <span className="text-pink-400 font-bold">({partnerScore.totalScore.toFixed(1)}) {partnerUser.name}</span>
        </div>
        <div className="h-4 w-full rounded-full bg-gray-800 flex overflow-hidden border border-white/5 shadow-inner mb-4 relative">
          <div 
            className="h-full bg-indigo-500 transition-all duration-1000 relative"
            style={{ width: `${userRatio}%` }}
          >
            <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
          </div>
          <div 
            className="h-full bg-pink-500 transition-all duration-1000 relative"
            style={{ width: `${100 - userRatio}%` }}
          >
            <div className="absolute inset-0 bg-white/10 w-full" />
          </div>
          
          {/* Middle indicator */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/30 transform -translate-x-1/2 z-10"></div>
        </div>

        {/* Breakdown Mini Bars */}
        <div className="grid grid-cols-2 gap-3">
          {/* Net Improvement */}
          <div className="glass-card p-2.5 rounded-xl border border-white/5">
            <div className="flex justify-between text-[10px] text-gray-400 mb-1.5">
              <span className="flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Net Artışı (%40)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-indigo-400" style={{ width: `${currentUserScore.netImprovementPercent}%` }} />
              </div>
              <span className="text-[10px] font-bold text-gray-300 w-6 text-right">{currentUserScore.netImprovementPercent}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden flex justify-end">
                <div className="h-full bg-pink-400" style={{ width: `${partnerScore.netImprovementPercent}%` }} />
              </div>
              <span className="text-[10px] font-bold text-gray-500 w-6 text-right">{partnerScore.netImprovementPercent}</span>
            </div>
          </div>

          {/* Consistency */}
          <div className="glass-card p-2.5 rounded-xl border border-white/5">
            <div className="flex justify-between text-[10px] text-gray-400 mb-1.5">
              <span className="flex items-center gap-1"><Target className="h-3 w-3" /> İstikrar (%30)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-indigo-400" style={{ width: `${currentUserScore.studyConsistency}%` }} />
              </div>
              <span className="text-[10px] font-bold text-gray-300 w-6 text-right">{currentUserScore.studyConsistency}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden flex justify-end">
                <div className="h-full bg-pink-400" style={{ width: `${partnerScore.studyConsistency}%` }} />
              </div>
              <span className="text-[10px] font-bold text-gray-500 w-6 text-right">{partnerScore.studyConsistency}</span>
            </div>
          </div>

          {/* Curriculum */}
          <div className="glass-card p-2.5 rounded-xl border border-white/5">
            <div className="flex justify-between text-[10px] text-gray-400 mb-1.5">
              <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> İlerleme (%20)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-indigo-400" style={{ width: `${Math.round(currentUserScore.curriculumProgress)}%` }} />
              </div>
              <span className="text-[10px] font-bold text-gray-300 w-6 text-right">{Math.round(currentUserScore.curriculumProgress)}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden flex justify-end">
                <div className="h-full bg-pink-400" style={{ width: `${partnerScore.curriculumProgress}%` }} />
              </div>
              <span className="text-[10px] font-bold text-gray-500 w-6 text-right">{partnerScore.curriculumProgress}</span>
            </div>
          </div>

          {/* Duel */}
          <div className="glass-card p-2.5 rounded-xl border border-white/5">
            <div className="flex justify-between text-[10px] text-gray-400 mb-1.5">
              <span className="flex items-center gap-1"><Swords className="h-3 w-3" /> Düello (%10)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-indigo-400" style={{ width: `${currentUserScore.duelWinRate}%` }} />
              </div>
              <span className="text-[10px] font-bold text-gray-300 w-6 text-right">{currentUserScore.duelWinRate}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden flex justify-end">
                <div className="h-full bg-pink-400" style={{ width: `${partnerScore.duelWinRate}%` }} />
              </div>
              <span className="text-[10px] font-bold text-gray-500 w-6 text-right">{partnerScore.duelWinRate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
