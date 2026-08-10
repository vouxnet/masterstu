"use client";

import React, { useState, useEffect } from "react";
import { Lightbulb, ChevronRight, ChevronLeft, BookOpen } from "lucide-react";
import { getTodaysFact, dailyFacts, DailyFact } from "@/src/lib/data/dailyFacts";
import { useAuthStore } from "@/src/lib/store/useAuthStore";

export function DailyFactWidget() {
  const { currentUser } = useAuthStore();
  const activeExam = currentUser.activeExam || "kpss_lisans";
  const [currentFact, setCurrentFact] = useState<DailyFact | null>(null);

  const getFilteredFacts = () => {
    if (activeExam === "kpss_onlisans") {
      return dailyFacts.filter(f => f.category !== "hukuk" && f.category !== "iktisat" && f.category !== "maliye");
    }
    return dailyFacts;
  };

  useEffect(() => {
    const facts = getFilteredFacts();
    const todaysFact = getTodaysFact();
    if (activeExam === "kpss_onlisans" && (todaysFact.category === "hukuk" || todaysFact.category === "iktisat" || todaysFact.category === "maliye")) {
      setCurrentFact(facts[0] || todaysFact);
    } else {
      setCurrentFact(todaysFact);
    }
  }, [activeExam]);

  const handleNextFact = () => {
    const facts = getFilteredFacts();
    const randomIndex = Math.floor(Math.random() * facts.length);
    setCurrentFact(facts[randomIndex]);
  };

  const handlePrevFact = () => {
    const facts = getFilteredFacts();
    if (!currentFact) return;
    const idx = facts.findIndex(f => f.id === currentFact.id);
    const prev = idx > 0 ? idx - 1 : facts.length - 1;
    setCurrentFact(facts[prev]);
  };

  if (!currentFact) return null;

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'hukuk': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      case 'iktisat': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'tarih': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'cografya': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'vatandaslik': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'maliye': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'genel_kultur': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryName = (cat: string) => {
    switch (cat) {
      case 'hukuk': return 'Hukuk';
      case 'iktisat': return 'İktisat';
      case 'tarih': return 'Tarih';
      case 'cografya': return 'Coğrafya';
      case 'vatandaslik': return 'Vatandaşlık';
      case 'maliye': return 'Maliye';
      case 'genel_kultur': return 'Genel Kültür';
      default: return cat;
    }
  };

  const getRelevanceColor = (rel: string) => {
    switch (rel) {
      case 'yüksek': return 'bg-emerald-500/20 text-emerald-400';
      case 'orta': return 'bg-amber-500/20 text-amber-400';
      case 'düşük': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="rounded-3xl glass-panel p-4 sm:p-5 border border-white/10 shadow-xl relative overflow-hidden group">
      {/* Gradient glow */}
      <div className="pointer-events-none absolute -right-12 -bottom-12 h-36 w-36 rounded-full bg-amber-500/8 blur-3xl" />

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Lightbulb className="h-4 w-4" />
          </div>
          <h3 className="font-display font-bold text-white text-sm sm:text-base">Günün Bilgisi</h3>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getCategoryColor(currentFact.category)}`}>
            {getCategoryName(currentFact.category)}
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase ${getRelevanceColor(currentFact.examRelevance)}`}>
            {currentFact.examRelevance}
          </span>
        </div>
      </div>

      {/* Content — Horizontal */}
      <div className="flex flex-col md:flex-row items-stretch gap-3">
        <button onClick={handlePrevFact} className="hidden md:flex items-center justify-center w-10 shrink-0 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all">
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 rounded-2xl bg-black/30 p-4 border border-white/5 flex flex-col sm:flex-row items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-2xl shrink-0 border border-white/5">
            {currentFact.emoji}
          </div>
          <div className="flex-1 min-w-0 space-y-1">
            <h4 className="font-display font-bold text-white text-xs sm:text-sm leading-snug">
              {currentFact.title}
            </h4>
            <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed font-medium line-clamp-2">
              {currentFact.content}
            </p>
            {currentFact.source && (
              <span className="text-[10px] text-gray-500 italic flex items-center space-x-1 font-medium">
                <BookOpen className="h-3 w-3 shrink-0" />
                <span>{currentFact.source}</span>
              </span>
            )}
          </div>
        </div>

        <button onClick={handleNextFact} className="hidden md:flex items-center justify-center w-10 shrink-0 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Nav */}
      <div className="flex md:hidden items-center justify-center space-x-3 mt-3">
        <button onClick={handlePrevFact} className="rounded-xl bg-white/5 hover:bg-white/10 p-2 text-gray-300 hover:text-white border border-white/10 transition-all">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button onClick={handleNextFact} className="rounded-xl bg-amber-500/20 hover:bg-amber-500/30 px-4 py-2 text-xs font-bold text-amber-300 border border-amber-500/30 transition-all flex items-center space-x-1">
          <span>Rastgele Bilgi</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
        <button onClick={handleNextFact} className="rounded-xl bg-white/5 hover:bg-white/10 p-2 text-gray-300 hover:text-white border border-white/10 transition-all">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
