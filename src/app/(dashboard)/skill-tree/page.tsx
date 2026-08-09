"use client";

import React, { useState, useEffect } from "react";
import { Lock, Unlock, Star, Trophy, ChevronRight } from "lucide-react";
import confetti from "canvas-confetti";
import { useCurriculumStore } from "@/src/lib/store/useCurriculumStore";
import { lisansSkillTree, skillTiers, SkillNode } from "@/src/lib/data/skillTreeData";

export default function SkillTreePage() {
  const { topics } = useCurriculumStore();
  
  // Hesaplanan XP (tamamlanan konu sayısı)
  const [xp, setXp] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  // Modal State
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const solvedCount = topics.filter(t => t.status === "solved").length;
    setXp(solvedCount);
  }, [topics]);

  // Determine current tier based on XP
  const currentTier = [...skillTiers].reverse().find(t => xp >= t.minXP) || skillTiers[0];

  const checkUnlocked = (node: SkillNode): boolean => {
    // Check prerequisites first
    const hasPrereqs = node.prerequisites.every(prereqId => {
      const prereqNode = lisansSkillTree.find(n => n.id === prereqId);
      return prereqNode ? checkUnlocked(prereqNode) : true;
    });
    
    return hasPrereqs && xp >= node.xpRequired;
  };

  const handleNodeClick = (node: SkillNode) => {
    const isUnlocked = checkUnlocked(node);
    
    if (isUnlocked) {
      // Unlocked
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      setSelectedNode(node);
      setIsModalOpen(true);
    }
  };

  if (!mounted) return null;

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-display font-bold text-white mb-4">🌳 Bilişsel Yetenek Ağacı</h1>
        
        {/* Overall Level Display */}
        <div className="glass-panel p-6 rounded-3xl max-w-md mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${currentTier.color}-500/20 text-${currentTier.color}-400`}>
                <Trophy className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-400 font-medium">Seviye {currentTier.level}</p>
                <p className={`text-lg font-bold text-${currentTier.color}-400`}>{currentTier.title}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-3xl font-display font-bold text-white">{xp} <span className="text-sm text-gray-400">XP</span></p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
             {/* Progress Calculation: relative to next tier */}
             <div 
               className={`h-full bg-${currentTier.color}-500 rounded-full transition-all duration-1000 ease-out relative`}
               style={{ 
                 width: `${Math.min(100, (xp / (skillTiers[skillTiers.length-1].minXP || 100)) * 100)}%` 
               }}
             >
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse"></div>
             </div>
          </div>
        </div>
      </header>

      {/* Skill Tree Visualization */}
      <div className="space-y-12 relative pb-20">
        {skillTiers.map(tier => {
          const tierNodes = lisansSkillTree.filter(n => n.tier === tier.level);
          if (tierNodes.length === 0) return null;
          
          return (
            <div key={tier.level} className="relative">
              {/* Connecting line to next tier */}
              {tier.level < 5 && (
                <div className="absolute left-1/2 -bottom-12 w-0.5 h-12 bg-white/10 -translate-x-1/2 hidden md:block"></div>
              )}
              
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Tier Label */}
                <div className="md:w-48 flex-shrink-0 text-center md:text-left">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-${tier.color}-500/10 text-${tier.color}-400 border border-${tier.color}-500/20`}>
                    Seviye {tier.level}: {tier.title}
                  </span>
                </div>
                
                {/* Skill Cards Row */}
                <div className="flex-1 flex flex-wrap justify-center gap-4">
                  {tierNodes.map(node => {
                    const isUnlocked = checkUnlocked(node);
                    
                    return (
                      <button
                        key={node.id}
                        onClick={() => handleNodeClick(node)}
                        className={`group relative w-64 p-4 rounded-2xl border text-left transition-all duration-300 ${
                          isUnlocked 
                            ? 'glass-card border-indigo-500/30 hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/20' 
                            : 'bg-white/5 border-white/5 opacity-70 hover:opacity-100 backdrop-blur-sm grayscale'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-3xl filter drop-shadow-md">{node.iconEmoji}</span>
                          {isUnlocked ? (
                            <Unlock className="w-4 h-4 text-indigo-400" />
                          ) : (
                            <Lock className="w-4 h-4 text-gray-500" />
                          )}
                        </div>
                        
                        <h3 className={`font-bold text-sm mb-1 ${isUnlocked ? 'text-white' : 'text-gray-400'}`}>
                          {node.title}
                        </h3>
                        
                        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                          {node.description}
                        </p>
                        
                        {/* Status/Prerequisite Line */}
                        <div className="mt-auto flex items-center justify-between text-[10px] font-medium">
                          {isUnlocked ? (
                            <span className="text-emerald-400 flex items-center">
                              <Star className="w-3 h-3 mr-1" /> Aktif
                            </span>
                          ) : (
                            <span className="text-amber-500/70">
                              {node.xpRequired} XP Gerekli
                            </span>
                          )}
                          
                          <span className="text-gray-600">
                            {node.course}
                          </span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="glass-panel max-w-md w-full rounded-3xl p-6 border border-white/10 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8" />
            </div>
            
            <h3 className="text-xl font-bold text-center text-white mb-2">
              Henüz Erken!
            </h3>
            
            <p className="text-center text-gray-400 mb-6 text-sm">
              ⚠️ Önce <strong>{selectedNode.prerequisites.length > 0 ? "önceki seviye" : `${selectedNode.xpRequired} XP değerinde`}</strong> konularını tamamlamanı öneriyoruz. Yine de açmak istiyor musun?
            </p>
            
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => {
                  setIsModalOpen(false);
                  // Force unlock action
                  confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                  });
                }}
                className="w-full py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                Yine de Aç <ChevronRight className="w-4 h-4 ml-1" />
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/30"
              >
                İzle ve Bekle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
