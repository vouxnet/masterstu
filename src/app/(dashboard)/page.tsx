"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore, EXAM_METADATA } from "@/src/lib/store/useAuthStore";
import { useStudyLogStore } from "@/src/lib/store/useStudyLogStore";
import { useExamHistoryStore } from "@/src/lib/store/useExamHistoryStore";
import { formatTimeRemaining } from "@/src/lib/utils";
import {
  CheckCircle2,
  Circle,
  Play,
  ArrowRight,
  TrendingUp,
  Clock,
  Calendar,
  Layers,
  Award,
  BookOpen,
  Sparkles,
  ChevronRight,
  Zap,
  Radio,
  BarChart2,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const router = useRouter();
  const { currentUser } = useAuthStore();
  const { getTodayStats, getWeeklyStats } = useStudyLogStore();
  const { results } = useExamHistoryStore();

  const activeExam = currentUser.activeExam || "kpss_lisans";
  const examMeta = EXAM_METADATA[activeExam];
  const targetDate = examMeta?.targetDate || "2026-09-06T10:15:00+03:00";

  const [time, setTime] = useState(formatTimeRemaining(targetDate));

  // Dynamic Task List
  const [tasks, setTasks] = useState([
    {
      id: "t1",
      number: "1.",
      subject: "Matematik",
      topic: "Fonksiyonlar & Problemler",
      detail: "5 Test",
      tag: "Tamamla",
      tagType: "success",
      completed: true,
      href: "/exams",
    },
    {
      id: "t2",
      number: "2.",
      subject: "Tarih & İnkılap",
      topic: "Kurtuluş Savaşı Muharebeler",
      detail: "Konu Çalış",
      tag: "Konu Çalış",
      tagType: "info",
      completed: false,
      href: "/curriculum",
    },
    {
      id: "t3",
      number: "3.",
      subject: "Türkçe",
      topic: "Paragrafta Anlam ve Yapı",
      detail: "4 Test",
      tag: "0 / 4",
      tagType: "neutral",
      completed: false,
      href: "/exams",
    },
    {
      id: "t4",
      number: "4.",
      subject: "Vatandaşlık",
      topic: "Temel Hak ve Hürriyetler",
      detail: "3 Test",
      tag: "1 / 3",
      tagType: "neutral",
      completed: false,
      href: "/exams",
    },
  ]);

  useEffect(() => {
    if (currentUser.role === "admin" || currentUser.email === "admin@asimptot.app") {
      router.push("/admin");
      return;
    }
    if (typeof window !== "undefined") {
      const onboarded = localStorage.getItem("asimptot_onboarded");
      if (onboarded !== "true" && currentUser.id) {
        router.push("/onboarding");
      }
    }
    setTime(formatTimeRemaining(targetDate));
    const interval = setInterval(() => {
      setTime(formatTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate, currentUser.id, router]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  const masterySubjects = [
    { name: "MATEMATİK", percent: 78, tip: "Önerilen: Trigonometri", color: "#6366F1" },
    { name: "TARİH", percent: 62, tip: "Önerilen: İnkılap Tarihi", color: "#38BDF8" },
    { name: "TÜRKÇE", percent: 85, tip: "Önerilen: Dil Bilgisi", color: "#10B981" },
    { name: "COĞRAFYA & VAT.", percent: 71, tip: "Önerilen: İdare Hukuku", color: "#F59E0B" },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* 3-COLUMN AWARD-WINNING STUDIO WORKSPACE (PIXEL-PERFECT FROM MOCKUP) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================= */}
        {/* 1. LEFT COLUMN: FOCUS MASTERY PROGRESS (3.5 Cols)         */}
        {/* ========================================================= */}
        <div className="lg:col-span-4 rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl space-y-6">
          <div>
            <h2 className="font-display font-bold text-white text-lg tracking-tight">
              Focus Mastery Progress
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">Ders bazlı kazanım ve yeterlilik seviyeleri</p>
          </div>

          {/* 4 Mastery Rings Grid */}
          <div className="grid grid-cols-2 gap-4">
            {masterySubjects.map((subj, idx) => (
              <div
                key={idx}
                className="rounded-2xl glass-card p-4 border border-white/10 text-center space-y-2 hover:border-indigo-500/40 transition-all group"
              >
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="currentColor"
                      strokeWidth="5"
                      className="text-white/10"
                      fill="transparent"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke={subj.color}
                      strokeWidth="5"
                      strokeDasharray={201}
                      strokeDashoffset={201 - (201 * subj.percent) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-1000 shadow-lg"
                      fill="transparent"
                    />
                  </svg>
                  <span className="absolute font-display font-black text-base text-white">
                    {subj.percent}%
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xs text-white tracking-wide">
                    {subj.name}
                  </h3>
                  <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                    {subj.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Smooth SVG Wave Trend Graph */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-300">Net İlerleme Eğrisi</span>
              <span className="text-emerald-400 font-bold font-mono">+12.4 Net</span>
            </div>
            
            <div className="relative h-28 w-full">
              {/* SVG Smooth Wave */}
              <svg className="w-full h-full overflow-visible" viewBox="0 0 300 90" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="waveGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#6366F1" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,75 Q 40,60 80,68 T 160,35 T 220,55 T 300,20 L 300,90 L 0,90 Z"
                  fill="url(#waveGrad)"
                />
                <path
                  d="M 0,75 Q 40,60 80,68 T 160,35 T 220,55 T 300,20"
                  fill="none"
                  stroke="#818CF8"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* X-Axis Scale */}
            <div className="flex justify-between text-[10px] font-mono text-gray-500 px-1">
              <span>10</span>
              <span>30</span>
              <span>50</span>
              <span>70</span>
              <span>90</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. CENTER HERO CARD: DYNAMIC LEARNING FOCUS (5.2 Cols)     */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl space-y-6">
          {/* Header Row: Title + Countdown Banner */}
          <div className="flex items-start justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="font-display font-black text-white text-xl tracking-tight">
                Dynamic Learning Focus
              </h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className="font-display font-bold text-xs text-white">Bugünün Görevleri</span>
                <span className="text-[11px] font-mono text-indigo-300 font-semibold">
                  Completed: {completedCount} / {tasks.length}
                </span>
              </div>
            </div>

            {/* Countdown Badge */}
            <div className="text-right">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block font-mono">
                {examMeta?.shortLabel || "ÖSYM"}&apos;ye Kalan Süre
              </span>
              <p className="font-display font-black text-white text-base sm:text-lg mt-0.5">
                <span className="text-emerald-400 font-extrabold">{String(time.days).padStart(2, "0")}</span> GÜN{" "}
                <span className="text-indigo-300">{String(time.hours).padStart(2, "0")}</span> SAAT{" "}
                <span className="text-indigo-400 font-mono text-sm">{String(time.minutes).padStart(2, "0")}</span> DK
              </p>
            </div>
          </div>

          {/* Linear Progress Bar */}
          <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / tasks.length) * 100}%` }}
            />
          </div>

          {/* 4 Interactive Task Cards */}
          <div className="space-y-3.5">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-2xl glass-card border transition-all flex items-center justify-between gap-3 ${
                  task.completed
                    ? "border-emerald-500/40 bg-emerald-950/15"
                    : "border-white/10 hover:border-indigo-500/40"
                }`}
              >
                <div className="flex items-center space-x-3.5 min-w-0">
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`h-6 w-6 rounded-lg flex items-center justify-center transition-all ${
                      task.completed
                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                        : "border border-white/30 hover:border-indigo-400"
                    }`}
                  >
                    {task.completed && <Check className="h-4 w-4 stroke-[3]" />}
                  </button>

                  <div className="min-w-0">
                    <p
                      className={`font-display font-bold text-xs truncate ${
                        task.completed ? "line-through text-gray-400" : "text-white"
                      }`}
                    >
                      {task.number} {task.subject}: {task.topic}
                    </p>
                    <p className="text-[11px] text-gray-400 font-medium">{task.detail}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {/* Status Pill Badge */}
                  {task.tagType === "success" && (
                    <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 font-mono">
                      {task.tag}
                    </span>
                  )}
                  {task.tagType === "info" && (
                    <span className="px-3 py-1 rounded-xl bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 font-mono">
                      {task.tag}
                    </span>
                  )}
                  {task.tagType === "neutral" && (
                    <span className="px-3 py-1 rounded-xl bg-white/10 text-gray-300 text-xs font-bold font-mono">
                      {task.tag}
                    </span>
                  )}

                  {/* Direct Action Button */}
                  <Link
                    href={task.href}
                    className="px-3.5 py-1.5 rounded-xl glass-button text-xs font-bold text-white shadow-md hover:scale-105 transition-all"
                  >
                    Derse Git
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action Footer Link */}
          <div className="pt-2">
            <Link
              href="/exams"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white font-display font-black text-xs shadow-xl shadow-indigo-600/30 flex items-center justify-center space-x-2 transition-all active:scale-95 text-center tracking-wide"
            >
              <Play className="h-4 w-4" />
              <span>Canlı 120 Soru ÖSYM Deneme Sınavına Başla</span>
            </Link>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. RIGHT COLUMN: PERFORMANCE & EXAM HUB (3.3 Cols)        */}
        {/* ========================================================= */}
        <div className="lg:col-span-3 space-y-5">
          
          {/* Card 1: Performans Özeti */}
          <div className="rounded-3xl glass-panel p-5 border border-white/10 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-white text-sm">Performans Özeti</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 font-mono">
                Son 7 Gün: +15% Başarı
              </span>
            </div>

            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Çözülen Soru:</span>
                </span>
                <span className="font-display font-black text-white text-sm">1250</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Doğru Oranı:</span>
                </span>
                <span className="font-display font-black text-emerald-400 text-sm">84%</span>
              </div>
            </div>
          </div>

          {/* Card 2: Son Deneme Sonuçları */}
          <div className="rounded-3xl glass-panel p-5 border border-white/10 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-white text-sm">Son Deneme Sonuçları</h3>
              <span className="text-gray-500 text-xs">•••</span>
            </div>

            <div className="space-y-1">
              <p className="text-[11px] text-gray-400 font-medium">KPSS / ÖSYM Genel 3</p>
              <p className="font-display font-black text-2xl text-white tracking-tight">
                412.500 <span className="text-xs text-indigo-300 font-semibold">Puan</span>
              </p>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-gray-400">Türkiye Sıralaması:</span>
              <span className="font-display font-black text-amber-400 font-mono">3125</span>
            </div>
          </div>

          {/* Card 3: Yaklaşan Canlı Ders / AI Çalışma */}
          <div className="rounded-3xl glass-panel p-5 border border-white/10 shadow-xl space-y-3.5 bg-gradient-to-b from-white/5 to-transparent">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-white text-sm flex items-center gap-1.5">
                <Radio className="h-3.5 w-3.5 text-rose-500 animate-pulse" />
                <span>Yaklaşan AI Etüt</span>
              </h3>
              <span className="text-gray-500 text-xs">•••</span>
            </div>

            <p className="text-xs font-bold text-gray-200">
              16:30 - Matematik: İntegral & Problemler
            </p>

            <Link
              href="/ai-hub"
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-display font-bold text-xs border border-white/10 flex items-center justify-center transition-all hover:scale-[1.02] text-center"
            >
              Başla
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
