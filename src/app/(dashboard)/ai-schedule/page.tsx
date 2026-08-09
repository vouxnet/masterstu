"use client";

import React from "react";
import { useAuthStore, EXAM_METADATA } from "@/src/lib/store/useAuthStore";
import { useStudyLogStore } from "@/src/lib/store/useStudyLogStore";
import { useCurriculumStore } from "@/src/lib/store/useCurriculumStore";
import { useExamHistoryStore } from "@/src/lib/store/useExamHistoryStore";
import { Sparkles, Calendar as CalendarIcon, Clock, Target, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AiSchedulePage() {
  const { currentUser } = useAuthStore();

  const { logs } = useStudyLogStore();
  const { getTopicsForExam } = useCurriculumStore();
  const { results } = useExamHistoryStore();

  const activeExam = currentUser.activeExam || "kpss_lisans";
  const userTopics = getTopicsForExam(activeExam);

  // Incomplete topics grouped by course/subject
  const incompleteBySubject: Record<string, number> = {};
  userTopics.filter(t => t.status !== 'solved').forEach(t => {
    const key = t.course || 'Diğer';
    incompleteBySubject[key] = (incompleteBySubject[key] || 0) + 1;
  });

  // Most incomplete subjects (priority order)
  const prioritySubjects = Object.entries(incompleteBySubject)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([subject]) => subject);

  // Subjects studied this week
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const recentLogs = logs.filter(l => new Date(l.createdAt) >= weekAgo);
  const studiedSubjects = new Set(recentLogs.map(l => l.subject).filter(Boolean));

  // Last exam result
  const lastExam = results.filter(r => r.examType === activeExam)[0] || null;

  // Generate dynamic 7-day plan
  const dayNames = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
  const defaultSubjects = prioritySubjects.length > 0
    ? [...prioritySubjects, ...prioritySubjects, ...prioritySubjects].slice(0, 7)
    : ["Türkçe", "Matematik", "Tarih", "Coğrafya", "Vatandaşlık", "Genel Tekrar", "Dinlenme"];

  const days = dayNames.map((dayName, idx) => {
    const isSaturday = idx === 5;
    const isSunday = idx === 6;
    const subject = isSaturday
      ? "Genel Deneme"
      : isSunday
      ? "Dinlenme & Tekrar"
      : (defaultSubjects[idx] || "Genel Çalışma");
    const isLeastStudied = !isSaturday && !isSunday && !studiedSubjects.has(subject);

    const tasks = isSaturday
      ? ["Türkiye Geneli Deneme Çözümü", "Yanlış Analizi ve Tekrar"]
      : isSunday
      ? ["Yanlış Kutusuna Göz At", "Flashcard Tekrarı"]
      : [
          `${subject} Konu Tekrarı`,
          isLeastStudied
            ? `⚠️ ${subject} - Bu hafta çalışılmadı!`
            : `${subject} Soru Çözümü (2 Test)`,
        ];

    return {
      day: dayName,
      subject,
      tasks,
      focus: isSaturday ? "critical" : isSunday ? "low" : isLeastStudied ? "high" : "medium",
    };
  });

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
            🗓️ AI Haftalık Çalışma Takvimi
          </h1>
          <p className="text-gray-400 mt-2">
            Yanlış kutunuzdaki verilere göre Asimptot tarafından özel olarak hazırlandı.
          </p>
        </div>
        <button className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-amber-500/20 hover:scale-105 transition-transform">
          <Sparkles className="w-5 h-5" />
          <span>Takvimi Yeniden Oluştur</span>
        </button>
      </div>

      {/* AI Analysis Summary */}
      <div className="glass-panel p-6 border-amber-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-amber-500/20 rounded-2xl text-amber-400">
            <Target className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-2">AI Koç Analizi</h2>
            <p className="text-gray-300 leading-relaxed">
              {prioritySubjects.length > 0
                ? `${currentUser.name}, müfredatında en çok ${
                    prioritySubjects.slice(0, 2).join(' ve ')
                  } konularında eksik var. Bu haftaki program bu alanlara odaklandı.${
                    lastExam ? ` Son denemende toplam net: ${lastExam.totalNet}.` : ''
                  } Cumartesi günü çözeceğin denemede hedefin bir öncekinden daha iyi olmak!`
                : `${currentUser.name}, henüz müfredat ilerlemesi kaydedilmedi. Müfredat sayfasından konuları işaretlemeye başla, AI Koç senin için kişisel program oluşturur!`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        {days.map((d, idx) => (
          <motion.div
            key={d.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`glass-card rounded-2xl p-4 flex flex-col h-full border ${
              d.focus === 'critical' ? 'border-red-500/30 bg-red-500/5' : 
              d.focus === 'high' ? 'border-amber-500/30 bg-amber-500/5' : 'border-white/5'
            }`}
          >
            <div className="text-center pb-3 border-b border-white/10 mb-3">
              <h3 className="font-display font-bold text-white text-lg">{d.day}</h3>
              <p className="text-xs font-medium text-indigo-400">{d.subject}</p>
            </div>
            <div className="flex-1 space-y-3">
              {d.tasks.map((task, i) => (
                <div key={i} className="flex items-start space-x-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{task}</span>
                </div>
              ))}
            </div>
            {d.focus === 'critical' && (
              <div className="mt-4 flex items-center justify-center space-x-1 text-xs font-bold text-red-400 bg-red-500/10 py-1.5 rounded-lg">
                <AlertCircle className="w-3 h-3" />
                <span>Deneme Günü</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
