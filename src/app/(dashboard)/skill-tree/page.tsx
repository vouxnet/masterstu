"use client";

import React, { useState, useEffect } from "react";
import { Lock, Unlock, Star, Trophy, ChevronRight, HelpCircle, CheckCircle2, BookOpen, Zap } from "lucide-react";
import confetti from "canvas-confetti";
import { useAuthStore, EXAM_METADATA } from "@/src/lib/store/useAuthStore";
import { useCurriculumStore } from "@/src/lib/store/useCurriculumStore";
import { useDailyQuestStore } from "@/src/lib/store/useDailyQuestStore";
import { useLeagueStore } from "@/src/lib/store/useLeagueStore";
import { useStudyLogStore } from "@/src/lib/store/useStudyLogStore";
import { getSkillTreeForExam, skillTiers, SkillNode } from "@/src/lib/data/skillTreeData";

export default function SkillTreePage() {
  const { currentUser } = useAuthStore();
  const { topics } = useCurriculumStore();
  const { totalXP: dailyQuestXP } = useDailyQuestStore();
  const { weeklyXP } = useLeagueStore();
  const { logs } = useStudyLogStore();

  const activeExam = currentUser.activeExam || "kpss_lisans";
  const skillTree = getSkillTreeForExam(activeExam);

  const [mounted, setMounted] = useState(false);
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Solved topics count & total calculated XP
  const solvedTopicsCount = topics.filter((t) => t.status === "solved").length;
  const studyLogQuestions = logs.reduce((acc, l) => acc + (l.questionsCount || 0), 0);
  
  // Total Cumulative XP formula: (Solved topics * 10) + (Daily Quest XP) + (League XP)
  const calculatedXP = solvedTopicsCount * 10 + dailyQuestXP + weeklyXP;

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTier = [...skillTiers].reverse().find((t) => calculatedXP >= t.minXP) || skillTiers[0];

  const checkUnlocked = (node: SkillNode): boolean => {
    const hasPrereqs = node.prerequisites.every((prereqId) => {
      const prereqNode = skillTree.find((n) => n.id === prereqId);
      return prereqNode ? checkUnlocked(prereqNode) : true;
    });

    return hasPrereqs && calculatedXP >= node.xpRequired;
  };

  const handleNodeClick = (node: SkillNode) => {
    const isUnlocked = checkUnlocked(node);

    if (isUnlocked) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#10B981", "#6366F1", "#F59E0B"]
      });
    } else {
      setSelectedNode(node);
      setIsModalOpen(true);
    }
  };

  if (!mounted) return null;

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto min-h-screen space-y-8">
      {/* Header Banner */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-indigo-500/20 px-3.5 py-1 rounded-full border border-indigo-500/30 text-indigo-300 text-xs font-bold">
          <span>{EXAM_METADATA[activeExam]?.title || "KPSS"} Özel Ağaç</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
          🌳 Bilişsel Yetenek Ağacı
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto">
          Müfredat konularını çözdükçe, deneme yaptıkça ve günlük görevleri tamamladıkça kilitler açılır!
        </p>

        {/* Overall Level & XP Breakdown Box */}
        <div className="glass-panel p-6 rounded-3xl max-w-lg mx-auto relative overflow-hidden border border-white/10 shadow-2xl space-y-4">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500"></div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-400 font-medium">Seviye {currentTier.level}</p>
                <p className="text-lg font-bold text-amber-400">{currentTier.title}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-3xl font-display font-black text-white">
                {calculatedXP} <span className="text-xs text-gray-400">XP</span>
              </p>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-amber-400 rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${Math.min(100, (calculatedXP / (skillTiers[skillTiers.length - 1].minXP || 180)) * 100)}%`,
              }}
            />
          </div>

          {/* Solved Data Source Explanation Banner */}
          <div className="pt-2 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-[10px]">
            <div className="bg-black/30 p-2 rounded-xl border border-white/5">
              <span className="text-gray-400 block">Müfredat Konuları</span>
              <span className="font-bold text-emerald-400 text-xs">{solvedTopicsCount} Çözüldü ✓</span>
            </div>
            <div className="bg-black/30 p-2 rounded-xl border border-white/5">
              <span className="text-gray-400 block">Soru Çözüm Kaydı</span>
              <span className="font-bold text-indigo-300 text-xs">{studyLogQuestions} Soru</span>
            </div>
            <div className="bg-black/30 p-2 rounded-xl border border-white/5">
              <span className="text-gray-400 block">Görev & Lig XP</span>
              <span className="font-bold text-amber-400 text-xs">+{dailyQuestXP + weeklyXP} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Tree Tier Visualization */}
      <div className="space-y-10 relative pb-16">
        {skillTiers.map((tier) => {
          const tierNodes = skillTree.filter((n) => n.tier === tier.level);
          if (tierNodes.length === 0) return null;

          return (
            <div key={tier.level} className="relative">
              {tier.level < 5 && (
                <div className="absolute left-1/2 -bottom-10 w-0.5 h-10 bg-white/10 -translate-x-1/2 hidden md:block" />
              )}

              <div className="flex flex-col md:flex-row items-center gap-4">
                {/* Tier Label */}
                <div className="md:w-44 flex-shrink-0 text-center md:text-left">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    Seviye {tier.level}: {tier.title}
                  </span>
                </div>

                {/* Skill Cards Row */}
                <div className="flex-1 flex flex-wrap justify-center md:justify-start gap-3.5">
                  {tierNodes.map((node) => {
                    const isUnlocked = checkUnlocked(node);

                    return (
                      <button
                        key={node.id}
                        onClick={() => handleNodeClick(node)}
                        className={`group relative w-64 p-4 rounded-2xl border text-left transition-all duration-300 ${
                          isUnlocked
                            ? "glass-card border-indigo-500/40 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/20"
                            : "bg-black/40 border-white/5 opacity-60 hover:opacity-90 backdrop-blur-sm grayscale"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-3xl filter drop-shadow-md">{node.iconEmoji}</span>
                          {isUnlocked ? (
                            <Unlock className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Lock className="w-4 h-4 text-gray-500" />
                          )}
                        </div>

                        <h3 className={`font-bold text-xs sm:text-sm mb-1 ${isUnlocked ? "text-white" : "text-gray-400"}`}>
                          {node.title}
                        </h3>

                        <p className="text-[11px] text-gray-400 line-clamp-2 mb-3">
                          {node.description}
                        </p>

                        <div className="mt-auto flex items-center justify-between text-[10px] font-medium pt-2 border-t border-white/5">
                          {isUnlocked ? (
                            <span className="text-emerald-400 flex items-center font-bold">
                              <Star className="w-3 h-3 mr-1" /> Açıldı ✓
                            </span>
                          ) : (
                            <span className="text-amber-400 font-bold">
                              {node.xpRequired} XP Gerekli
                            </span>
                          )}

                          <span className="text-gray-500 font-semibold">{node.course}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Locked Node Modal */}
      {isModalOpen && selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel max-w-md w-full rounded-3xl p-6 border border-white/20 shadow-2xl relative">
            <div className="w-14 h-14 mx-auto bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center mb-3 border border-amber-500/30">
              <Lock className="w-7 h-7" />
            </div>

            <h3 className="text-lg font-bold text-center text-white mb-1">
              Yetenek Kilitli!
            </h3>

            <p className="text-center text-gray-300 mb-5 text-xs leading-relaxed">
              <strong>{selectedNode.title}</strong> yeteneğini açmak için en az <strong>{selectedNode.xpRequired} XP</strong> gerekiyor. Müfredattan konu tamamlayarak veya soru çözerek XP kazanabilirsiniz!
            </p>

            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
                }}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1"
              >
                <span>Yine de Aç (Simülasyon)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full py-2.5 rounded-xl glass-card text-gray-300 font-semibold text-xs hover:text-white"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
