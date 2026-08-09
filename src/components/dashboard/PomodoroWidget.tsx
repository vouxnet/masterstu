"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { useStudyLogStore } from "@/src/lib/store/useStudyLogStore";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";

export const PomodoroWidget: React.FC = () => {
  const { partnerUser, currentUser } = useAuthStore();
  const { addLog, getLogsForDate } = useStudyLogStore();

  const activeExam = currentUser.activeExam || "kpss_lisans";
  const getExamCourses = (exam: string) => {
    switch (exam) {
      case "kpss_onlisans":
        return ["Türkçe", "Matematik", "Tarih", "Coğrafya", "Vatandaşlık"];
      case "kpss_ortaogretim":
        return ["Türkçe", "Matematik", "Tarih", "Coğrafya", "Vatandaşlık", "Güncel Bilgiler"];
      case "yds":
        return ["İngilizce"];
      case "ales":
        return ["Sayısal", "Sözel"];
      case "kpss_lisans":
      default:
        return ["Türkçe", "Matematik", "Tarih", "Coğrafya", "Vatandaşlık", "Hukuk", "İktisat", "Maliye", "Uluslararası İlişkiler"];
    }
  };

  const courses = getExamCourses(activeExam);

  const TECHNIQUES = {
    pomodoro: { name: "⏱️ Pomodoro (25/5 Dk)", work: 25, break: 5 },
    rule50: { name: "🌊 50/10 Kuralı (Deep Work)", work: 50, break: 10 },
    peak90: { name: "🚀 90 Dk Zirve Odak", work: 90, break: 20 },
    method52: { name: "📊 52/17 Üretkenlik", work: 52, break: 17 },
  };

  const [activeTechnique, setActiveTechnique] = useState<keyof typeof TECHNIQUES>("pomodoro");
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");
  const [selectedSubject, setSelectedSubject] = useState(courses[0] || "Türkçe");
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [completedToday, setCompletedToday] = useState(0);

  const activeTechConfig = TECHNIQUES[activeTechnique];

  const handleTechniqueChange = (techKey: keyof typeof TECHNIQUES) => {
    setActiveTechnique(techKey);
    setIsRunning(false);
    setMode("work");
    setSecondsLeft(TECHNIQUES[techKey].work * 60);
  };

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
        addLog({
          activityType: 'pomodoro',
          subject: selectedSubjectRef.current,
          durationMinutes: activeTechConfig.work,
          questionsCount: 0,
          examType: currentUserRef.current.activeExam,
          date: new Date().toISOString().split('T')[0],
        });
        setCompletedToday(prev => prev + 1);
        setSessionCompleted(true);
        setTimeout(() => setSessionCompleted(false), 3000);
        setMode("break");
        setSecondsLeft(activeTechConfig.break * 60);
      } else {
        setMode("work");
        setSecondsLeft(activeTechConfig.work * 60);
      }
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft, mode, activeTechConfig]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = (newMode: "work" | "break") => {
    setIsRunning(false);
    setMode(newMode);
    setSecondsLeft(newMode === "work" ? activeTechConfig.work * 60 : activeTechConfig.break * 60);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="rounded-3xl glass-panel p-5 sm:p-6 border border-white/10 shadow-xl space-y-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-2xl" />

      {/* Session completed toast */}
      {sessionCompleted && (
        <div className="absolute top-4 right-4 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg animate-bounce z-10">
          🎉 Pomodoro Tamamlandı! +25 Dk kaydedildi
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex-shrink-0">
            <Clock className="h-5 w-5 animate-spin" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              <h3 className="font-display font-bold text-white text-sm sm:text-base">Canlı Pomodoro Sayacı</h3>
              {completedToday > 0 && (
                <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">
                  Bugün: {completedToday} Oturum ✓
                </span>
              )}
            </div>
            <p className="text-[11px] text-gray-400">
              {mode === "work" ? "Odaklanma Süresi (25 Dk)" : "Mola Süresi (5 Dk)"}
            </p>
          </div>
        </div>

        {/* Live Partner Status */}
        {partnerUser && (
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-pink-500/10 px-2.5 py-1 border border-pink-500/30 text-[10px] font-semibold text-pink-300 self-start sm:self-auto">
            <span className="h-2 w-2 rounded-full bg-pink-400 animate-ping" />
            <span>{partnerUser.name}: Pomodoro ⏳</span>
          </div>
        )}
      </div>

      {/* Technique Selector Grid (Zero Horizontal Scroll!) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {Object.entries(TECHNIQUES).map(([key, tech]) => (
          <button
            key={key}
            onClick={() => handleTechniqueChange(key as keyof typeof TECHNIQUES)}
            className={`rounded-xl px-2.5 py-2 text-[11px] font-bold transition-all border text-center leading-snug ${
              activeTechnique === key
                ? "bg-amber-500/20 border-amber-500/50 text-amber-300 shadow-md shadow-amber-500/10 scale-[1.02]"
                : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {tech.name}
          </button>
        ))}
      </div>

      {/* Subject Selector & Timer Display */}
      <div className="rounded-2xl glass-card p-4 sm:p-5 border border-white/5 flex flex-col items-center justify-center space-y-4">
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="w-full max-w-xs rounded-xl bg-gray-900/90 px-3 py-2 text-xs font-bold text-white border border-white/10 focus:border-indigo-500 focus:outline-none"
        >
          {courses.map((c) => (
            <option key={c} value={c} className="bg-gray-900 text-white">
              {c} Çalışması
            </option>
          ))}
        </select>

        {/* Digital Clock */}
        <div className="font-display text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-200 tracking-wider">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={toggleTimer}
            className={`flex items-center space-x-1.5 rounded-xl px-4 py-2 text-xs font-bold text-white transition-all shadow-lg ${
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
            className="flex items-center space-x-1 rounded-xl glass-card px-3 py-2 text-xs font-semibold text-gray-300 hover:text-white border border-white/10"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Sıfırla</span>
          </button>

          <button
            onClick={() => resetTimer(mode === "work" ? "break" : "work")}
            className="rounded-xl bg-white/5 hover:bg-white/10 px-3 py-2 text-xs font-semibold text-indigo-300 border border-white/10"
          >
            {mode === "work" ? "Mola (5 Dk)" : "Çalış (25 Dk)"}
          </button>
        </div>
      </div>
    </div>
  );
};
