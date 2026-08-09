"use client";

import React, { useState, useEffect } from "react";
import { Target, Trophy, ChevronDown } from "lucide-react";
import { placementTargets, PlacementTarget } from "@/src/lib/data/placementData";
import { useExamHistoryStore } from "@/src/lib/store/useExamHistoryStore";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import Confetti from "react-confetti";

export function PlacementProgressWidget() {
  const { currentUser } = useAuthStore();
  const activeExam = currentUser.activeExam;
  const { getBestScore } = useExamHistoryStore();

  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const bestExam = getBestScore(activeExam);
  const bestNet = bestExam ? bestExam.totalNet : 0;

  useEffect(() => {
    // Client-side execution
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const savedId = localStorage.getItem("asimptot_placement_target");
    if (savedId) {
      setSelectedTargetId(savedId);
    } else {
      // Default to first target matching exam type
      const defaultTarget = placementTargets.find((t) => t.examType === activeExam);
      if (defaultTarget) setSelectedTargetId(defaultTarget.id);
    }
  }, [activeExam]);

  const target = placementTargets.find((t) => t.id === selectedTargetId) || placementTargets.find((t) => t.examType === activeExam);

  useEffect(() => {
    if (target && bestNet >= target.avgMinNet && bestNet > 0) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [bestNet, target]);

  if (!target) return null;

  const progressPercent = Math.min(100, Math.max(0, (bestNet / target.avgMinNet) * 100));

  const availableTargets = placementTargets.filter((t) => t.examType === activeExam);

  const handleSelect = (id: string) => {
    setSelectedTargetId(id);
    localStorage.setItem("asimptot_placement_target", id);
    setShowDropdown(false);
  };

  return (
    <div className="relative rounded-2xl glass-card border border-white/10 p-5 shadow-xl bg-[#0f0f1a]/80 backdrop-blur-md overflow-hidden">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50">
          <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={200} />
        </div>
      )}
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Atama Hedefi
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center text-xs text-indigo-300 hover:text-indigo-200"
                >
                  <ChevronDown className="h-3 w-3 ml-1" />
                </button>
                {showDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 max-h-60 overflow-y-auto bg-[#1a1a2e] border border-white/10 rounded-xl shadow-2xl z-50 p-2">
                    {availableTargets.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => handleSelect(t.id)}
                        className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-colors ${t.id === selectedTargetId ? 'bg-indigo-500/20 text-indigo-300' : 'text-gray-300 hover:bg-white/5'}`}
                      >
                        {t.institution} - {t.position}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </h3>
            <p className="text-xs text-gray-400">
              {target.institution} — {target.position}
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            %{progressPercent.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-4 w-full bg-black/40 rounded-full overflow-hidden relative border border-white/5">
          <div 
            className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: `${progressPercent}%`,
              background: progressPercent >= 100 
                ? 'linear-gradient(to right, #10b981, #34d399)' 
                : progressPercent > 70 
                  ? 'linear-gradient(to right, #fbbf24, #f59e0b)'
                  : 'linear-gradient(to right, #ef4444, #f87171)'
            }}
          >
            <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
          </div>
        </div>
        
        <div className="flex justify-between text-[11px] font-medium text-gray-400 px-1">
          <span>Mevcut: <strong className="text-white">{bestNet.toFixed(1)}</strong> net</span>
          <span>Hedef: <strong className="text-indigo-300">{target.avgMinNet}</strong> net</span>
        </div>
      </div>

      {progressPercent >= 100 && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center space-x-2 text-emerald-400 font-bold text-sm animate-pulse">
          <Trophy className="h-4 w-4" />
          <span>HEDEFİNE ULAŞTIN! 🎉</span>
        </div>
      )}
    </div>
  );
}
