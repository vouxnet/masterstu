"use client";

import React, { useState, useEffect } from "react";
import { Lightbulb, ChevronRight, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="rounded-3xl glass-panel p-[1px] shadow-xl relative overflow-hidden group">
      {/* Subtle gradient border animation effect wrapper */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/40 via-orange-500/40 to-yellow-500/40 opacity-20 group-hover:opacity-100 transition-opacity duration-700 blur-sm z-0" />
      
      <div className="relative z-10 bg-[#13111C]/90 backdrop-blur-xl rounded-[23px] p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display text-xl font-bold text-white flex items-center space-x-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Lightbulb className="h-5 w-5" />
            </span>
            <span>Günün Bilgisi</span>
          </h2>
          <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryColor(currentFact.category)}`}>
            {getCategoryName(currentFact.category)}
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFact.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-start space-x-4">
                <span className="text-3xl mt-0.5">{currentFact.emoji}</span>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                    {currentFact.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed font-medium">
                    {currentFact.content}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 pl-12">
                {currentFact.source ? (
                  <span className="text-xs text-gray-400 italic flex items-center space-x-1.5 font-medium">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>{currentFact.source}</span>
                  </span>
                ) : <span />}
                
                <span className={`text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wide ${getRelevanceColor(currentFact.examRelevance)}`}>
                  {currentFact.examRelevance} Çıkma İhtimali
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
          <p className="text-xs text-gray-500 font-medium">Her gün yeni bir bilgi! Sınav için birikir.</p>
          <button 
            onClick={handleNextFact}
            className="flex items-center space-x-1 text-xs font-bold text-white/70 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl"
          >
            <span>Sonraki İpucu</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
