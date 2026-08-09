"use client";

import React, { useEffect } from "react";
import { useDailyQuestStore } from "@/src/lib/store/useDailyQuestStore";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { useLeagueStore } from "@/src/lib/store/useLeagueStore";
import { CheckCircle2, Circle, Trophy, Zap, Target, Clock, Brain, FileText, Flame, Check } from "lucide-react";
import { cn } from "@/src/lib/utils";
import confetti from "canvas-confetti";

const iconMap: Record<string, React.ElementType> = {
  Target,
  Clock,
  Brain,
  FileText,
  Flame,
};

export function DailyQuestWidget() {
  const { currentUser } = useAuthStore();
  const { generateDailyQuests, getTodayQuests, getCompletionRate, updateQuestProgress, totalXP } = useDailyQuestStore();
  const { addXP } = useLeagueStore();

  const activeExam = currentUser.activeExam || "kpss_lisans";

  useEffect(() => {
    generateDailyQuests(activeExam);
  }, [generateDailyQuests, activeExam]);

  const quests = getTodayQuests();
  const completionRate = getCompletionRate();
  const allCompleted = quests.length > 0 && completionRate === 100;

  const handleQuestClick = (quest: any) => {
    if (quest.completed) return;

    updateQuestProgress(quest.type, quest.target);
    addXP(quest.xpReward);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#10B981", "#6366F1", "#F59E0B"],
    });
  };

  if (quests.length === 0) return null;

  return (
    <div className="rounded-2xl glass-card border border-white/10 p-5 shadow-xl relative overflow-hidden bg-gradient-to-br from-indigo-900/40 to-emerald-900/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-lg">Günlük Görevler</h3>
            <p className="text-[10px] text-gray-300">Tamamlamak için göreve tıkla ve XP kazan! ⚡</p>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full text-sm border border-emerald-500/20">
          <Zap className="w-4 h-4" />
          <span>{totalXP} XP</span>
        </div>
      </div>

      <div className="space-y-3">
        {quests.map((quest) => {
          return (
            <div 
              key={quest.id}
              onClick={() => handleQuestClick(quest)}
              className={cn(
                "flex items-center p-3.5 rounded-xl border transition-all duration-300 select-none",
                quest.completed 
                  ? "bg-emerald-500/10 border-emerald-500/30 cursor-default" 
                  : "bg-white/5 border-white/10 hover:border-indigo-500/50 hover:bg-white/10 cursor-pointer active:scale-[0.99]"
              )}
            >
              <div className="mr-3 flex-shrink-0">
                {quest.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 animate-in zoom-in duration-300" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-indigo-400/60 hover:border-indigo-400 flex items-center justify-center transition-colors">
                    <Check className="w-3.5 h-3.5 text-transparent hover:text-indigo-300" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className={cn(
                    "font-semibold text-xs sm:text-sm truncate",
                    quest.completed ? "text-emerald-300 line-through opacity-70" : "text-white"
                  )}>
                    {quest.description}
                  </span>
                  <div className="flex items-center space-x-1.5 ml-2 flex-shrink-0">
                    {!quest.completed && (
                      <span className="text-[9px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded font-medium">
                        Tıkla & Tamamla
                      </span>
                    )}
                    <span className="text-xs font-bold text-emerald-400">+{quest.xpReward} XP</span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      quest.completed ? "bg-emerald-400" : "bg-indigo-500"
                    )}
                    style={{ width: `${(quest.progress / quest.target) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {allCompleted && (
        <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-center animate-in fade-in slide-in-from-bottom-2">
          <p className="font-display font-bold text-emerald-300 flex items-center justify-center space-x-2 text-xs sm:text-sm">
            <SparklesIcon className="w-5 h-5" />
            <span>Tüm günlük görevler tamamlandı! Harikasın! 🎉</span>
            <SparklesIcon className="w-5 h-5" />
          </p>
        </div>
      )}
    </div>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/>
      <path d="M19 17v4"/>
      <path d="M3 5h4"/>
      <path d="M17 19h4"/>
    </svg>
  );
}
