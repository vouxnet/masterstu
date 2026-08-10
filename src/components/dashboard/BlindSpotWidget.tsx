"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertTriangle, ChevronRight, Target, ShieldAlert, Sparkles, CheckCircle2, RefreshCw } from "lucide-react";
import { computeBlindSpots, BlindSpotItem } from "@/src/lib/utils/blindSpotEngine";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";

interface BlindSpotWidgetProps {
  mistakes?: Array<{ subject: string; topic?: string; questionText?: string }>;
}

export function BlindSpotWidget({ mistakes = [] }: BlindSpotWidgetProps) {
  const { currentUser } = useAuthStore();
  const activeExam = currentUser.activeExam || "kpss_lisans";

  const blindSpots = computeBlindSpots(mistakes, [], activeExam);
  const [activeIdx, setActiveIdx] = useState(0);

  if (blindSpots.length === 0) return null;

  const spot = blindSpots[activeIdx] || blindSpots[0];

  return (
    <div className="rounded-3xl glass-panel p-5 border border-amber-500/30 shadow-xl relative overflow-hidden space-y-4">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-rose-500/10 blur-3xl" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-display font-bold text-white text-sm sm:text-base">🎯 AI Kör Nokta Teşhis Raporu</h3>
              <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 text-[10px] font-extrabold text-rose-300 border border-rose-500/30">
                {blindSpots.length} Kritik Nokta
              </span>
            </div>
            <p className="text-[11px] text-gray-400">
              Yanlış yaptığın sorulardan otomatik kümeleme ile tespit edilen zayıf halkalar
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          {blindSpots.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === activeIdx ? "w-6 bg-amber-400" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Active Blind Spot Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={spot.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="rounded-2xl bg-black/40 p-4 border border-white/10 space-y-3"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/30 mb-1.5 inline-block">
                {spot.subject}
              </span>
              <h4 className="font-display font-bold text-white text-sm sm:text-base">
                ⚠️ {spot.topic}
              </h4>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] text-gray-400 block font-semibold">Hata Oranı</span>
              <span className={`text-base font-black ${spot.errorRate >= 60 ? "text-rose-400" : "text-amber-400"}`}>
                %{spot.errorRate}
              </span>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/10">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                spot.errorRate >= 60
                  ? "bg-gradient-to-r from-amber-500 to-rose-500"
                  : "bg-gradient-to-r from-indigo-500 to-amber-500"
              }`}
              style={{ width: `${spot.errorRate}%` }}
            />
          </div>

          <p className="text-xs text-gray-300 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
            💡 <strong className="text-amber-300">Teşhis:</strong> {spot.advice}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div className="text-xs text-emerald-400 font-semibold flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Öneri: {spot.recommendedAction}</span>
            </div>

            <Link
              href="/mistakes"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-bold text-xs transition-all shadow-lg shadow-amber-600/20 flex items-center justify-center space-x-1 whitespace-nowrap"
            >
              <span>🎯 Kör Noktayı Kapat</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
