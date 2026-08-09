"use client";

import React, { useEffect } from "react";
import { useDailyQuestStore } from "@/src/lib/store/useDailyQuestStore";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { CheckCircle2, Circle, Trophy, Zap, Target, Clock, Brain, FileText, Flame } from "lucide-react";
import { cn } from "@/src/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Target,
  Clock,
  Brain,
  FileText,
  Flame,
};

export function DailyQuestWidget() {
  const { currentUser } = useAuthStore();
  const { generateDailyQuests, getTodayQuests, getCompletionRate, totalXP } = useDailyQuestStore();

  const activeExam = currentUser.activeExam || "kpss_lisans";

  useEffect(() => {
    generateDailyQuests(activeExam);
  }, [generateDailyQuests, activeExam]);

  const quests = getTodayQuests();
  const completionRate = getCompletionRate();
  const allCompleted = quests.length > 0 && completionRate === 100;

  if (quests.length === 0) return null;

  return (
    <div className="rounded-2xl glass-card border border-white/10 p-5 shadow-xl relative overflow-hidden bg-gradient-to-br from-indigo-900/40 to-emerald-900/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300">
            <Trophy className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-white text-lg">Günlük Görevler</h3>
        </div>
        <div className="flex items-center space-x-1 text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full text-sm border border-emerald-500/20">
          <Zap className="w-4 h-4" />
          <span>{totalXP} XP</span>
        </div>
      </div>

      <div className="space-y-3">
        {quests.map((quest) => {
          const IconComponent = iconMap[quest.icon] || Target;
          return (
            <div 
              key={quest.id}
              className={cn(
                "flex items-center p-3 rounded-xl border transition-all duration-300",
                quest.completed 
                  ? "bg-emerald-500/10 border-emerald-500/30" 
                  : "bg-white/5 border-white/5"
              )}
            >
              <div className="mr-3">
                {quest.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 animate-in zoom-in duration-300" />
                ) : (
                  <Circle className="w-6 h-6 text-gray-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className={cn(
                    "font-semibold text-sm",
                    quest.completed ? "text-emerald-300 line-through opacity-70" : "text-white"
                  )}>
                    {quest.description}
                  </span>
                  <span className="text-xs font-bold text-indigo-300">+{quest.xpReward} XP</span>
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
          <p className="font-display font-bold text-emerald-300 flex items-center justify-center space-x-2">
            <SparklesIcon className="w-5 h-5" />
            <span>Tüm görevler tamamlandı! 🎉</span>
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
