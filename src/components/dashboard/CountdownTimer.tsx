"use client";

import React, { useState, useEffect } from "react";
import { useAuthStore, EXAM_METADATA } from "@/src/lib/store/useAuthStore";
import { formatTimeRemaining } from "@/src/lib/utils";
import { Clock, Calendar, Sparkles, Target } from "lucide-react";

export const CountdownTimer: React.FC = () => {
  const { currentUser } = useAuthStore();
  const activeExam = currentUser.activeExam || "kpss_lisans";
  const examMeta = EXAM_METADATA[activeExam];
  const targetDate = examMeta?.targetDate || "2026-09-06T10:15:00+03:00";

  const [time, setTime] = useState(formatTimeRemaining(targetDate));

  useEffect(() => {
    // Initial sync
    setTime(formatTimeRemaining(targetDate));

    // Live tick every second
    const interval = setInterval(() => {
      setTime(formatTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="relative overflow-hidden rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl">
      {/* Background Gradient Blur Glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 -bottom-10 h-48 w-48 rounded-full bg-emerald-600/20 blur-3xl" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-display text-lg font-bold text-white sm:text-xl">
                {examMeta?.title}
              </h2>
              <span className="rounded-md bg-amber-500/20 px-2 py-0.5 font-display text-[10px] font-bold text-amber-300 border border-amber-500/30">
                CANLI SAYAÇ
              </span>
            </div>
            <p className="text-xs text-gray-400 font-medium">
              Sınav Tarihi:{" "}
              {new Date(targetDate).toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Target Badge */}
        <div className="inline-flex items-center space-x-1.5 rounded-xl bg-white/5 px-3 py-1.5 border border-white/10 text-xs font-semibold text-gray-300">
          <Calendar className="h-4 w-4 text-indigo-400" />
          <span>ÖSYM Resmi Sınav Sayacı</span>
        </div>
      </div>

      {/* Timer Cards Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
        {/* Days */}
        <div className="flex flex-col items-center justify-center rounded-2xl glass-card p-3 sm:p-4 border border-white/10">
          <span className="font-display text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-200">
            {String(time.days).padStart(2, "0")}
          </span>
          <span className="mt-1 font-display text-[10px] sm:text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            GÜN
          </span>
        </div>

        {/* Hours */}
        <div className="flex flex-col items-center justify-center rounded-2xl glass-card p-3 sm:p-4 border border-white/10">
          <span className="font-display text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-200">
            {String(time.hours).padStart(2, "0")}
          </span>
          <span className="mt-1 font-display text-[10px] sm:text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            SAAT
          </span>
        </div>

        {/* Minutes */}
        <div className="flex flex-col items-center justify-center rounded-2xl glass-card p-3 sm:p-4 border border-white/10">
          <span className="font-display text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-200">
            {String(time.minutes).padStart(2, "0")}
          </span>
          <span className="mt-1 font-display text-[10px] sm:text-xs font-semibold text-amber-400 uppercase tracking-wider">
            DAKİKA
          </span>
        </div>

        {/* Seconds */}
        <div className="flex flex-col items-center justify-center rounded-2xl glass-card p-3 sm:p-4 border border-indigo-500/30 bg-indigo-500/10">
          <span className="font-display text-2xl sm:text-4xl font-extrabold text-indigo-300 animate-pulse">
            {String(time.seconds).padStart(2, "0")}
          </span>
          <span className="mt-1 font-display text-[10px] sm:text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            SANİYE
          </span>
        </div>
      </div>
    </div>
  );
};
