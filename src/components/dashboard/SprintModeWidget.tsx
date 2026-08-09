"use client";

import React, { useState, useEffect, useRef } from "react";
import { Moon, Zap, Timer, Play, Pause, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { useStudyLogStore } from "@/src/lib/store/useStudyLogStore";

export const SprintModeWidget: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sprintsCompleted, setSprintsCompleted] = useState(0);

  // Timer State
  const SPRINT_DURATION = 15 * 60; // 15 mins
  const [secondsLeft, setSecondsLeft] = useState(SPRINT_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const { addLog } = useStudyLogStore();
  const { currentUser } = useAuthStore();
  const currentUserRef = useRef(currentUser);

  useEffect(() => {
    currentUserRef.current = currentUser;
  }, [currentUser]);

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    setIsActive(hour >= 19 || hour < 6);

    const saved = localStorage.getItem("asimptot_sprint_v1");
    if (saved) {
      setSprintsCompleted(parseInt(saved, 10));
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && secondsLeft === 0) {
      setIsRunning(false);
      
      const newSprints = sprintsCompleted + 1;
      setSprintsCompleted(newSprints);
      localStorage.setItem("asimptot_sprint_v1", newSprints.toString());
      
      setSessionCompleted(true);
      setTimeout(() => setSessionCompleted(false), 3000);
      
      addLog({
        activityType: 'pomodoro',
        subject: "Gece Sprinti",
        durationMinutes: 15,
        questionsCount: 0,
        examType: currentUserRef.current.activeExam,
        date: new Date().toISOString().split('T')[0],
      });
      
      setSecondsLeft(SPRINT_DURATION);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, sprintsCompleted, addLog]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setSecondsLeft(SPRINT_DURATION);
  };

  if (!mounted) return null;

  if (!isActive) {
    return (
      <div className="rounded-3xl glass-panel p-4 border border-white/5 bg-gradient-to-r from-indigo-950/40 to-purple-950/40 opacity-80 transition-opacity hover:opacity-100 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-500/20 rounded-xl">
            <Moon className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-indigo-300">Sprint Modu Beklemede</h3>
            <p className="text-xs text-indigo-200/60">🌙 Sprint Modu saat 19:00'da aktif olacak</p>
          </div>
        </div>
      </div>
    );
  }

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progressPercent = ((SPRINT_DURATION - secondsLeft) / SPRINT_DURATION) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl glass-panel p-6 border border-purple-500/30 bg-gradient-to-br from-indigo-950/80 to-purple-950/80 shadow-[0_0_40px_-15px_rgba(168,85,247,0.3)] relative overflow-hidden"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-purple-600/20 blur-[80px]" />
      
      <AnimatePresence>
        {sessionCompleted && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 z-50 bg-purple-500/20 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="bg-purple-900/90 border border-purple-400 p-6 rounded-2xl flex flex-col items-center">
              <Zap className="h-12 w-12 text-yellow-400 mb-2 animate-bounce" />
              <h2 className="text-2xl font-bold text-white mb-1">Harika!</h2>
              <p className="text-purple-200">15 Dakikalık Sprint Tamamlandı</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row gap-6 relative z-10">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-purple-500/20 rounded-xl border border-purple-500/30">
                <Moon className="h-6 w-6 text-purple-300" />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                  Gece Sprint Modu
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-[10px] text-purple-300 border border-purple-500/30">Aktif</span>
                </h2>
                <p className="text-xs text-purple-200/70">Kısa ve odaklı çalışmalarla maksimum verim.</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-[10px] text-purple-300/60 font-semibold uppercase">Bu Gece</div>
              <div className="text-lg font-bold text-purple-300">{sprintsCompleted} Sprint</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Action 1 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🎯</span>
                <h4 className="text-sm font-bold text-white">Zayıf Konu Sprint</h4>
              </div>
              <p className="text-[11px] text-gray-400 mb-3 line-clamp-2 min-h-[32px]">En zayıf 3 konudan 5'er soru çöz.</p>
              <button className="w-full py-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/40 text-indigo-300 text-xs font-semibold border border-indigo-500/30 transition-colors">
                Hemen Başla
              </button>
            </div>

            {/* Action 2 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🧠</span>
                <h4 className="text-sm font-bold text-white">Erime Kurtarma</h4>
              </div>
              <p className="text-[11px] text-gray-400 mb-3 line-clamp-2 min-h-[32px]">Eriyen 3 konuyu hızlı tekrar et.</p>
              <Link href="/curriculum" className="block w-full text-center py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 text-xs font-semibold border border-purple-500/30 transition-colors">
                Tekrara Git
              </Link>
            </div>

            {/* Action 3 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors group">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🂭</span>
                <h4 className="text-sm font-bold text-white">Flash Sprint</h4>
              </div>
              <p className="text-[11px] text-gray-400 mb-3 line-clamp-2 min-h-[32px]">5 flashcard hızlı tur.</p>
              <Link href="/flashcards" className="block w-full text-center py-1.5 rounded-lg bg-pink-500/20 hover:bg-pink-500/40 text-pink-300 text-xs font-semibold border border-pink-500/30 transition-colors">
                Kartlara Git
              </Link>
            </div>
          </div>
        </div>

        {/* Mini Timer */}
        <div className="w-full md:w-64 bg-black/20 rounded-2xl border border-white/10 p-5 flex flex-col items-center justify-center shrink-0">
          <div className="flex items-center gap-2 text-purple-300 mb-4">
            <Timer className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Hızlı Odak (15')</span>
          </div>

          <div className="relative w-32 h-32 flex items-center justify-center mb-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="rgba(168,85,247,0.2)" 
                strokeWidth="6" 
              />
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="#a855f7" 
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-display font-black text-white tracking-widest">
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full">
            <button 
              onClick={toggleTimer}
              className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-xs font-bold transition-colors ${
                isRunning 
                  ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/30' 
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}
            >
              {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isRunning ? "Duraklat" : "Başlat"}
            </button>
            <button 
              onClick={resetTimer}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
