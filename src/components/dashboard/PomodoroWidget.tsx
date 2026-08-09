"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { useStudyLogStore } from "@/src/lib/store/useStudyLogStore";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";

export const PomodoroWidget: React.FC = () => {
  const { partnerUser, currentUser } = useAuthStore();
  const { addLog, getLogsForDate } = useStudyLogStore();
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");
  const [selectedSubject, setSelectedSubject] = useState("Hukuk");
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [completedToday, setCompletedToday] = useState(0);

  // Refs to avoid stale closures inside the timer useEffect
  const selectedSubjectRef = useRef(selectedSubject);
  useEffect(() => { selectedSubjectRef.current = selectedSubject; }, [selectedSubject]);

  const currentUserRef = useRef(currentUser);
  useEffect(() => { currentUserRef.current = currentUser; }, [currentUser]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayPomodoros = getLogsForDate(today).filter(l => l.activityType === 'pomodoro');
    setCompletedToday(todayPomodoros.length);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      if (mode === "work") {
        // Log the completed pomodoro session
        addLog({
          activityType: 'pomodoro',
          subject: selectedSubjectRef.current,
          durationMinutes: 25,
          questionsCount: 0,
          examType: currentUserRef.current.activeExam,
          date: new Date().toISOString().split('T')[0],
        });
        setCompletedToday(prev => prev + 1);
        setSessionCompleted(true);
        setTimeout(() => setSessionCompleted(false), 3000);
        setMode("break");
        setSecondsLeft(5 * 60);
      } else {
        setMode("work");
        setSecondsLeft(25 * 60);
      }
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, mode]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = (newMode: "work" | "break") => {
    setIsRunning(false);
    setMode(newMode);
    setSecondsLeft(newMode === "work" ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="rounded-3xl glass-panel p-6 border border-white/10 shadow-xl space-y-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-2xl" />

      {/* Session completed toast */}
      {sessionCompleted && (
        <div className="absolute top-4 right-4 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-lg animate-bounce">
          🎉 Pomodoro Tamamlandı! +25 Dk kaydedildi
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Clock className="h-5 w-5 animate-spin" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-display font-bold text-white text-base">Canlı Pomodoro Sayacı</h3>
              {completedToday > 0 && (
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                  Bugün: {completedToday} Oturum ✓
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400">
              {mode === "work" ? "Odaklanma Süresi (25 Dk)" : "Mola Süresi (5 Dk)"}
            </p>
          </div>
        </div>

        {/* Live Partner Status */}
        <div className="hidden sm:flex items-center space-x-2 rounded-full bg-pink-500/10 px-3 py-1 border border-pink-500/30 text-xs font-semibold text-pink-300">
          <span className="h-2 w-2 rounded-full bg-pink-400 animate-ping" />
          <span>{partnerUser.name}: 18. Dk Pomodoro ⏳</span>
        </div>
      </div>

      {/* Subject Selector & Timer Display */}
      <div className="rounded-2xl glass-card p-5 border border-white/5 flex flex-col items-center justify-center space-y-4">
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="rounded-xl bg-gray-900/90 px-3.5 py-1.5 text-xs text-white border border-white/10 focus:border-indigo-500 focus:outline-none"
        >
          <option value="Hukuk">Hukuk Çalışması</option>
          <option value="İktisat">İktisat Çalışması</option>
          <option value="Maliye">Maliye Çalışması</option>
          <option value="Uluslararası İlişkiler">Uluslararası İlişkiler Çalışması</option>
          <option value="Türkçe">Türkçe / Paragraf</option>
          <option value="Matematik">Matematik & Geometri</option>
          <option value="Tarih">Tarih Tekrarı</option>
          <option value="Coğrafya">Coğrafya Çalışması</option>
          <option value="Vatandaşlık">Vatandaşlık Çalışması</option>
        </select>

        {/* Digital Clock */}
        <div className="font-display text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-200 tracking-wider">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTimer}
            className={`flex items-center space-x-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white transition-all shadow-lg ${
              isRunning
                ? "bg-amber-600 hover:bg-amber-700 shadow-amber-600/30"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30"
            }`}
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{isRunning ? "Duraklat" : "Başlat"}</span>
          </button>

          <button
            onClick={() => resetTimer(mode)}
            className="flex items-center space-x-1.5 rounded-xl glass-card px-3.5 py-2.5 text-xs font-semibold text-gray-300 hover:text-white border border-white/10"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Sıfırla</span>
          </button>

          <button
            onClick={() => resetTimer(mode === "work" ? "break" : "work")}
            className="rounded-xl bg-white/5 hover:bg-white/10 px-3.5 py-2.5 text-xs font-semibold text-indigo-300 border border-white/10"
          >
            {mode === "work" ? "Mola (5 Dk)" : "Çalış (25 Dk)"}
          </button>
        </div>
      </div>
    </div>
  );
};
