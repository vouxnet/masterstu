"use client";

import React, { useState, useEffect } from "react";
import { useAuthStore, EXAM_METADATA } from "@/src/lib/store/useAuthStore";
import { useStudyLogStore } from "@/src/lib/store/useStudyLogStore";
import { useCurriculumStore } from "@/src/lib/store/useCurriculumStore";
import { useExamHistoryStore } from "@/src/lib/store/useExamHistoryStore";
import { useLeagueStore } from "@/src/lib/store/useLeagueStore";
import { Sparkles, Calendar as CalendarIcon, Clock, Target, AlertCircle, CheckCircle2, Circle, RefreshCw, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export interface ScheduleDay {
  id: string;
  day: string;
  subject: string;
  targetQuestions: number;
  tasks: { id: string; text: string; completed: boolean }[];
  focus: "critical" | "high" | "medium" | "low";
}

export default function AiSchedulePage() {
  const { currentUser } = useAuthStore();
  const { logs } = useStudyLogStore();
  const { getTopicsForExam } = useCurriculumStore();
  const { results } = useExamHistoryStore();
  const { addXP } = useLeagueStore();

  const activeExam = currentUser.activeExam || "kpss_lisans";
  const userTopics = getTopicsForExam(activeExam);

  const [days, setDays] = useState<ScheduleDay[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const getExamCourses = (exam: string) => {
    switch (exam) {
      case "kpss_onlisans":
        return ["Türkçe (Paragraf & Dil Bilgisi)", "Matematik (Problemler)", "Tarih (İnkılap Tarihi)", "Coğrafya (Türkiye Beşeri)", "Vatandaşlık (Anayasa & İdare)"];
      case "kpss_ortaogretim":
        return ["Türkçe", "Matematik", "Tarih", "Coğrafya", "Vatandaşlık", "Güncel Bilgiler"];
      case "yds":
        return ["İngilizce Gramer", "Kelime Bilgisi", "Paragraf Çeviri"];
      case "ales":
        return ["Sayısal Mantık", "Sözel Mantık", "Matematik"];
      case "kpss_lisans":
      default:
        return ["Türkçe", "Matematik", "Tarih", "Coğrafya", "Vatandaşlık", "Hukuk", "İktisat", "Maliye"];
    }
  };

  const generatePlan = (forceNew = false) => {
    setIsGenerating(true);

    setTimeout(() => {
      const courses = getExamCourses(activeExam);
      const dayNames = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

      // Shuffle array for variation on re-generate
      const shuffledCourses = [...courses].sort(() => Math.random() - 0.5);

      const generatedDays: ScheduleDay[] = dayNames.map((dayName, idx) => {
        const isSaturday = idx === 5;
        const isSunday = idx === 6;

        let subject = "";
        let targetQuestions = 40;
        let tasksText: string[] = [];

        if (isSaturday) {
          subject = "Türkiye Geneli Deneme";
          targetQuestions = 120;
          tasksText = [
            "Tam Zamanlı ÖSYM Formatında Deneme Çöz",
            "Yanlış ve Boş Soruların Detaylı Analizini Yap",
            "Yanlış Kutusuna Eksik Soruları Ekle"
          ];
        } else if (isSunday) {
          subject = "Haftalık Tekrar & Dinlenme";
          targetQuestions = 25;
          tasksText = [
            "Zayıf Konulardan 20 Flashcard Tekrarı Yap",
            "Gelecek Haftanın Konu Hedeflerini Gözden Geçir"
          ];
        } else {
          subject = shuffledCourses[idx % shuffledCourses.length];
          targetQuestions = 50 + (idx % 3) * 15;
          tasksText = [
            `${subject} Konu Notlarını Oku & Özet Çıkar`,
            `${subject} Soru Bankasından ${targetQuestions} Soru Çöz`,
            `Çözülemeyen Soruları Yapay Zeka Koçuna Sor`
          ];
        }

        return {
          id: `day-${idx}-${Date.now()}`,
          day: dayName,
          subject,
          targetQuestions,
          focus: isSaturday ? "critical" : isSunday ? "low" : idx % 2 === 0 ? "high" : "medium",
          tasks: tasksText.map((t, tidx) => ({
            id: `task-${idx}-${tidx}`,
            text: t,
            completed: false
          }))
        };
      });

      setDays(generatedDays);
      localStorage.setItem(`asimptot_ai_schedule_${activeExam}`, JSON.stringify(generatedDays));
      setIsGenerating(false);

      if (forceNew) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#F59E0B", "#6366F1", "#10B981"]
        });
      }
    }, 600);
  };

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem(`asimptot_ai_schedule_${activeExam}`);
    if (saved) {
      try {
        setDays(JSON.parse(saved));
      } catch (e) {
        generatePlan();
      }
    } else {
      generatePlan();
    }
  }, [activeExam]);

  const toggleTask = (dayId: string, taskId: string) => {
    const updated = days.map((d) => {
      if (d.id !== dayId) return d;
      return {
        ...d,
        tasks: d.tasks.map((t) => {
          if (t.id !== taskId) return t;
          const nextState = !t.completed;
          if (nextState) {
            addXP(15);
          }
          return { ...t, completed: nextState };
        })
      };
    });

    setDays(updated);
    localStorage.setItem(`asimptot_ai_schedule_${activeExam}`, JSON.stringify(updated));
  };

  const totalTasks = days.reduce((acc, d) => acc + d.tasks.length, 0);
  const completedTasks = days.reduce((acc, d) => acc + d.tasks.filter(t => t.completed).length, 0);
  const progressPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (!isClient) return null;

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/30">
              {EXAM_METADATA[activeExam]?.title} Sınavına Özel
            </span>
            <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
              Dinamik AI Planı 🤖
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-2 flex items-center gap-2">
            🗓️ AI Akıllı Haftalık Çalışma Programı
          </h1>
          <p className="text-xs text-gray-300 mt-1">
            Seçtiğin sınava, hedeflerine ve eksik konularına özel oluşturulan haftalık ders takvimi.
          </p>
        </div>

        <button
          onClick={() => generatePlan(true)}
          disabled={isGenerating}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-5 py-3 rounded-2xl font-bold shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all text-xs flex-shrink-0 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
          <span>{isGenerating ? "AI Program Oluşturuyor..." : "Takvimi Yeniden Oluştur (Yenile)"}</span>
        </button>
      </div>

      {/* AI Analysis Summary Banner */}
      <div className="glass-panel p-6 border-amber-500/30 relative overflow-hidden rounded-3xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-amber-500/20 rounded-2xl text-amber-400 flex-shrink-0">
              <Target className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white mb-1">AI Koç Analizi & Tamamlama Oranı</h2>
              <p className="text-xs text-gray-300 leading-relaxed max-w-2xl">
                {currentUser.name}, bu haftalık program **{EXAM_METADATA[activeExam]?.title}** müfredatındaki ders ağırlıklarına göre hazırlandı. Görevleri tamamladıkça üzerine tıkla ve **+15 XP kazan!**
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 bg-black/40 px-4 py-2.5 rounded-2xl border border-white/10 self-stretch sm:self-auto justify-center">
            <Zap className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-xs font-bold text-white">{completedTasks} / {totalTasks} Görev Tamamlandı</div>
              <div className="w-32 h-1.5 bg-gray-800 rounded-full mt-1 overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Grid (7 Days) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
        {days.map((d, idx) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`glass-card rounded-2xl p-4 flex flex-col justify-between border transition-all ${
              d.focus === "critical"
                ? "border-red-500/40 bg-red-500/10 shadow-lg shadow-red-500/10"
                : d.focus === "high"
                ? "border-amber-500/30 bg-amber-500/5"
                : "border-white/10 bg-black/30"
            }`}
          >
            <div>
              <div className="text-center pb-3 border-b border-white/10 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">{d.day}</span>
                <h3 className="font-display font-bold text-white text-xs sm:text-sm mt-0.5">{d.subject}</h3>
                <span className="text-[9px] font-semibold text-emerald-400 mt-1 block">🎯 Hedef: {d.targetQuestions} Soru</span>
              </div>

              {/* Tasks List */}
              <div className="space-y-2.5">
                {d.tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleTask(d.id, task.id)}
                    className="flex items-start space-x-2 cursor-pointer group select-none"
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5 animate-in zoom-in" />
                    ) : (
                      <Circle className="w-4 h-4 text-gray-500 group-hover:text-indigo-400 flex-shrink-0 mt-0.5 transition-colors" />
                    )}
                    <span className={`text-[11px] leading-snug ${task.completed ? "text-emerald-300 line-through opacity-70 font-medium" : "text-gray-300 group-hover:text-white"}`}>
                      {task.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {d.focus === "critical" && (
              <div className="mt-4 flex items-center justify-center space-x-1 text-[10px] font-bold text-red-300 bg-red-500/20 py-1 rounded-lg border border-red-500/30">
                <AlertCircle className="w-3 h-3" />
                <span>Deneme Sınavı Günü</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
