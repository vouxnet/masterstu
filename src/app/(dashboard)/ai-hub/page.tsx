"use client";

import React, { useState, useEffect } from "react";
import { useAuthStore, EXAM_METADATA } from "@/src/lib/store/useAuthStore";
import { useStudyLogStore } from "@/src/lib/store/useStudyLogStore";
import { useExamHistoryStore } from "@/src/lib/store/useExamHistoryStore";
import { useCurriculumStore } from "@/src/lib/store/useCurriculumStore";
import { getRandomQuestions, DuelQuestion } from "@/src/lib/data/duelQuestions";
import { kpssLisansDistributionData } from "@/src/lib/data/kpssLisansDistribution";
import { kpssOnlisansDistributionData } from "@/src/lib/data/kpssOnlisansDistribution";
import { computeTriyaj, calculateExpectedGain } from "@/src/lib/utils/triyajEngine";
import {
  Bot,
  Swords,
  Sparkles,
  Award,
  RefreshCw,
  TrendingUp,
  Headphones,
  Play,
  Timer,
  Target,
  Flame,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import ExamSimulator, { SimulationResult } from "@/src/components/exam-sim/ExamSimulator";

const QuestionReviewCard = ({ q, index }: { q: DuelQuestion, index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-left">
      <div className="flex justify-between items-start gap-4">
        <div>
          <span className="text-xs text-gray-400 font-bold mb-1 block">Soru {index + 1} ({q.subject})</span>
          <p className="text-sm text-gray-200">{q.question}</p>
        </div>
        {q.explanation && (
          <button onClick={() => setIsOpen(!isOpen)} className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1.5 rounded-lg font-bold hover:bg-indigo-500/30 transition-colors whitespace-nowrap flex-shrink-0">
            {isOpen ? "Gizle" : "Açıklama 💡"}
          </button>
        )}
      </div>
      <div className="mt-3 text-xs text-emerald-400 font-medium">
        Doğru Cevap: {String.fromCharCode(65 + q.correctIndex)}) {q.options[q.correctIndex]}
      </div>
      {isOpen && q.explanation && (
        <div className="mt-3 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
          <p className="text-xs text-indigo-300 flex items-start gap-1.5">
            <span className="text-indigo-400 mt-0.5">💡</span>
            <span>{q.explanation}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default function AIHubPage() {
  const { currentUser } = useAuthStore();
  const activeExam = currentUser.activeExam || "kpss_lisans";
  const examTitle = EXAM_METADATA[activeExam]?.title;

  // Store data
  const { getTodayStats, getWeeklyStats, getStreakCount, logs } = useStudyLogStore();
  const { results, getBestScore, addResult } = useExamHistoryStore();
  const { getTopicsForExam } = useCurriculumStore();

  const todayStats = getTodayStats(activeExam);
  const weeklyStats = getWeeklyStats(activeExam);
  const streak = getStreakCount();
  const bestScore = getBestScore(activeExam);

  const examTopics = getTopicsForExam(activeExam);

  // Weak topics: not_started or studying topics from curriculum
  const weakTopics = examTopics
    .filter(t => t.status === "not_started" || t.status === "studying")
    .slice(0, 3);

  // Strong topics: solved topics
  const strongTopics = examTopics
    .filter(t => t.status === "solved")
    .slice(0, 3);

  // Last exam net trend
  const examResults = results.filter(r => r.examType === activeExam);
  const lastExam = examResults[0] || null;
  const prevExam = examResults[1] || null;
  const netTrend = lastExam && prevExam ? lastExam.totalNet - prevExam.totalNet : null;

  // Active AI Tab
  const [activeTab, setActiveTab] = useState<"coach" | "topics" | "podcast" | "triage" | "simulation">("coach");

  // Simulation State
  const [simStatus, setSimStatus] = useState<"idle" | "running" | "finished">("idle");
  const [simDuration, setSimDuration] = useState<number>(activeExam === 'kpss_onlisans' ? 40 : 40);
  const [simResult, setSimResult] = useState<SimulationResult | null>(null);
  const [simHistory, setSimHistory] = useState<SimulationResult[]>([]);
  const [simQuestions, setSimQuestions] = useState<DuelQuestion[]>([]);
  const [simAnswers, setSimAnswers] = useState<Record<number, number | null>>({});

  useEffect(() => {
    const saved = localStorage.getItem('asimptot_simulations_v1');
    if (saved) {
      try {
        setSimHistory(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleStartSimulation = () => {
    let qCount = 30;
    if (simDuration === 130 || simDuration === 120) {
      qCount = 120;
    }
    const questions = getRandomQuestions(qCount, activeExam);
    setSimQuestions(questions);
    setSimAnswers({});
    setSimStatus("running");
  };

  const handleCompleteSimulation = (result: SimulationResult) => {
    setSimResult(result);
    setSimAnswers(result.answers || {});
    setSimStatus("finished");
    const newHistory = [result, ...simHistory];
    setSimHistory(newHistory);
    localStorage.setItem('asimptot_simulations_v1', JSON.stringify(newHistory));

    const examLabel = result.totalQuestions >= 60 ? `ÖSYM Simülasyonu (${result.totalQuestions} Soru)` : `ÖSYM Simülasyonu (${result.totalQuestions} Soru)`;
    const stressNotes = result.gaveUp ? `PES ETTİ | Stres: ${result.stressScore}/100` : `Stres Skoru: ${result.stressScore}/100 | Süre: ${Math.floor(result.durationSeconds / 60)}dk`;

    addResult({
      examType: activeExam,
      examLabel: examLabel,
      gyCorrect: result.correct,
      gyWrong: result.wrong,
      gkCorrect: 0,
      gkWrong: 0,
      alanCorrect: 0,
      alanWrong: 0,
      gyNet: result.net,
      gkNet: 0,
      alanNet: 0,
      totalNet: result.net,
      estimatedScore: result.net,
      scoreType: 'ÖSYM Simülasyon',
      notes: stressNotes,
      date: result.completedAt,
    });
  };

  // Compute Konu Tahmini
  const distributionData = activeExam === "kpss_onlisans" ? kpssOnlisansDistributionData : kpssLisansDistributionData;
  
  const allTopics = Object.entries(distributionData).flatMap(([subject, topics]) =>
    (topics as any[]).map(t => ({ 
      subject, 
      topic: t.topic, 
      avg: t.avg, 
      importance: t.importance,
      trend: (t.y2024 || t.y2023 || 0) >= (t.y2022 || 0) ? "rising" : "falling" 
    }))
  );
  
  const topTopics = allTopics.sort((a, b) => b.avg - a.avg).slice(0, 15);



  const podcastEpisodes = [
    { id: "p1", title: "Anayasa Hukuku Özet", subject: "Hukuk", duration: "24:30", plays: 142, isOfficial: true },
    { id: "p2", title: "İktisat Temel Kavramlar", subject: "İktisat", duration: "31:15", plays: 98, isOfficial: true },
    { id: "p3", title: "Türk Tarihi - Kurtuluş Savaşı", subject: "Tarih", duration: "18:45", plays: 210, isOfficial: true },
    { id: "p4", title: "Coğrafya - İklim Tipleri", subject: "Coğrafya", duration: "22:10", plays: 76, isOfficial: false },
    { id: "p5", title: "Maliye - Kamu Gelirleri", subject: "Maliye", duration: "28:00", plays: 55, isOfficial: true },
    { id: "p6", title: "Vatandaşlık - Temel Haklar", subject: "Vatandaşlık", duration: "15:30", plays: 189, isOfficial: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
              Yapay Zeka & İnovasyon Ekosistemi
            </span>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
              {examTitle}
            </span>
          </div>
          <h1 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">
            🤖 Asimptot Akıllı Çalışma Merkezi
          </h1>
          <p className="text-xs text-gray-300 mt-1">
            Yapay Zeka Koçu ve Canlı 1v1 Düello!
          </p>
        </div>

        <div className="inline-flex items-center space-x-2 rounded-2xl glass-card px-4 py-2 text-xs font-bold text-amber-300 border border-amber-500/30">
          <Sparkles className="h-4 w-4 text-amber-400 animate-spin" />
          <span>5 Yapay Zeka Modülü Aktif</span>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("coach")}
          className={`rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all border flex items-center space-x-1.5 ${
            activeTab === "coach"
              ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30"
              : "glass-card text-gray-400 border-white/5 hover:text-white"
          }`}
        >
          <Bot className="h-4 w-4 text-indigo-300" />
          <span>🤖 AI Koç & Analiz</span>
        </button>
        
        <button
          onClick={() => setActiveTab("topics")}
          className={`rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all border flex items-center space-x-1.5 ${
            activeTab === "topics"
              ? "bg-amber-600 border-amber-500 text-white shadow-lg shadow-amber-600/30"
              : "glass-card text-gray-400 border-white/5 hover:text-white"
          }`}
        >
          <TrendingUp className="h-4 w-4 text-amber-300" />
          <span>📈 Konu Tahmini</span>
        </button>
        
        <button
          onClick={() => setActiveTab("podcast")}
          className={`rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all border flex items-center space-x-1.5 ${
            activeTab === "podcast"
              ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-600/30"
              : "glass-card text-gray-400 border-white/5 hover:text-white"
          }`}
        >
          <Headphones className="h-4 w-4 text-emerald-300" />
          <span>🎧 Podcast Arşivi</span>
        </button>

        <button
          onClick={() => setActiveTab("triage")}
          className={`rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all border flex items-center space-x-1.5 ${
            activeTab === "triage"
              ? "bg-amber-600 border-amber-500 text-white shadow-lg shadow-amber-600/30"
              : "glass-card text-gray-400 border-white/5 hover:text-white"
          }`}
        >
          <Target className="h-4 w-4 text-amber-300" />
          <span>📊 Triyaj</span>
        </button>

        <button
          onClick={() => setActiveTab("simulation")}
          className={`rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all border flex items-center space-x-1.5 ${
            activeTab === "simulation"
              ? "bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-600/30"
              : "glass-card text-gray-400 border-white/5 hover:text-white"
          }`}
        >
          <Flame className="h-4 w-4 text-rose-300" />
          <span>🔥 ÖSYM Simülasyonu</span>
        </button>
      </div>

      {/* TABS CONTENT */}
      {/* 1. AI COACH */}
      {activeTab === "coach" && (
        <div className="rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl space-y-5">
          <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/40">
              <Bot className="h-7 w-7" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">
                Asimptot Çalışma Koçu & Akıllı Hata Teşhisi
              </h3>
              <p className="text-xs text-gray-400">
                {currentUser.name} için kişiselleştirilmiş performans ve soru analizi
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl bg-indigo-950/40 p-3 border border-indigo-500/20 text-center">
              <p className="text-[10px] text-gray-400">Bugün</p>
              <p className="font-display font-bold text-white text-lg">{todayStats.totalMinutes > 0 ? `${todayStats.totalMinutes} Dk` : '—'}</p>
            </div>
            <div className="rounded-2xl bg-amber-950/40 p-3 border border-amber-500/20 text-center">
              <p className="text-[10px] text-gray-400">Seri</p>
              <p className="font-display font-bold text-amber-400 text-lg">{streak > 0 ? `${streak} Gün 🔥` : 'Başla!'}</p>
            </div>
            <div className="rounded-2xl bg-emerald-950/40 p-3 border border-emerald-500/20 text-center">
              <p className="text-[10px] text-gray-400">Bu Hafta</p>
              <p className="font-display font-bold text-emerald-400 text-lg">{weeklyStats.totalMinutes} Dk</p>
            </div>
            <div className="rounded-2xl bg-purple-950/40 p-3 border border-purple-500/20 text-center">
              <p className="text-[10px] text-gray-400">Son Net</p>
              <p className="font-display font-bold text-purple-400 text-lg">{lastExam ? lastExam.totalNet : '—'}</p>
            </div>
          </div>

          {/* Weak / Strong Topics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-rose-950/40 p-4 border border-rose-500/30 space-y-2">
              <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 text-[10px] font-bold text-rose-300 border border-rose-500/30">🎯 Çalışılması Gereken Konular</span>
              {weakTopics.length > 0 ? (
                weakTopics.map((t, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-rose-400 flex-shrink-0" />
                    <p className="text-xs text-gray-300">{t.topic || 'Bilinmeyen konu'}</p>
                    <span className="text-[10px] text-rose-400 ml-auto">{t.status === 'not_started' ? 'Başlanmadı' : 'Devam Ediyor'}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400">Tüm konular tamamlanmış! 🎉</p>
              )}
            </div>

            <div className="rounded-2xl bg-emerald-950/40 p-4 border border-emerald-500/30 space-y-2">
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30">🔥 Tamamlanan Konular</span>
              {strongTopics.length > 0 ? (
                strongTopics.map((t, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    <p className="text-xs text-gray-300">{t.topic || 'Bilinmeyen konu'}</p>
                    <span className="text-[10px] text-emerald-400 ml-auto">✓ Tamamlandı</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400">Henüz tamamlanan konu yok. Müfredattan başla! 📚</p>
              )}
            </div>
          </div>

          {/* Net Trend */}
          {netTrend !== null && (
            <div className={`rounded-2xl p-4 border ${ netTrend >= 0 ? 'bg-emerald-950/40 border-emerald-500/30' : 'bg-rose-950/40 border-rose-500/30'}`}>
              <p className={`text-xs font-bold ${netTrend >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {netTrend >= 0
                  ? `📈 Son denemenizde ${netTrend.toFixed(1)} net artış! Harika gidiyorsunuz.`
                  : `📉 Son denemenizde ${Math.abs(netTrend).toFixed(1)} net düşüş. Daha fazla pratik gerekiyor.`}
              </p>
            </div>
          )}
          {netTrend === null && (
            <div className="rounded-2xl bg-indigo-950/40 p-4 border border-indigo-500/30">
              <p className="text-xs text-gray-400">💡 Henüz deneme kaydedilmedi. Denemeler sayfasından ilk sınavını kaydet ve koç analizi başlasın!</p>
            </div>
          )}
        </div>
      )}




      {/* 3. KONU TAHMİNİ */}
      {activeTab === "topics" && (
        <div className="rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl space-y-5">
          <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600/30 text-amber-300 border border-amber-500/40">
              <TrendingUp className="h-7 w-7" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">Konu Tahmini & Sınav Analizi</h3>
              <p className="text-xs text-gray-400">Son 5 yıl ÖSYM verilerinden algoritmik tahmin</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topTopics.map((topic, index) => (
              <div key={index} className="rounded-2xl glass-card p-4 border border-white/5 hover:border-amber-500/30 transition-colors space-y-3">
                <div className="flex items-start justify-between">
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-gray-300">
                    {topic.subject}
                  </span>
                  <span className={`text-[10px] font-bold flex items-center ${topic.trend === "rising" ? "text-emerald-400" : "text-rose-400"}`}>
                    {topic.trend === "rising" ? "↑ Yükselişte" : "↓ Düşüşte"}
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm line-clamp-2">{topic.topic}</h4>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-xs text-gray-400">Ortalama: <strong className="text-amber-300">{topic.avg} Soru</strong></span>
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                    topic.importance === "Yüksek" ? "bg-rose-500/20 text-rose-300" :
                    topic.importance === "Orta" ? "bg-amber-500/20 text-amber-300" :
                    "bg-gray-500/20 text-gray-300"
                  }`}>
                    {topic.importance}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. PODCAST */}
      {activeTab === "podcast" && (
        <div className="rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl space-y-5">
          <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600/30 text-emerald-300 border border-emerald-500/40">
              <Headphones className="h-7 w-7" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">Podcast Arşivi</h3>
              <p className="text-xs text-gray-400">Yolda, otobüste veya yatmadan önce dinle!</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {podcastEpisodes.map(podcast => (
              <div key={podcast.id} className="rounded-2xl glass-card p-4 border border-white/5 flex items-center space-x-4 hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <Play className="h-4 w-4 ml-0.5" fill="currentColor" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-bold text-white truncate">{podcast.title}</h4>
                    {podcast.isOfficial && (
                      <span className="flex-shrink-0 rounded-full bg-indigo-500/20 px-1.5 py-0.5 text-[9px] font-bold text-indigo-300">
                        Resmi
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-gray-400 mt-1">
                    <span className="text-emerald-300">{podcast.subject}</span>
                    <span>•</span>
                    <span>{podcast.duration}</span>
                    <span>•</span>
                    <span>{podcast.plays} Dinlenme</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* 5. TRIAGE */}
      {activeTab === "triage" && (() => {
        const triyajResults = computeTriyaj(activeExam, examTopics);
        const top3Gain = calculateExpectedGain(triyajResults, 3);
        const displayResults = triyajResults.slice(0, 15);

        return (
          <div className="rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl space-y-5">
            <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600/30 text-amber-300 border border-amber-500/40">
                <Target className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">Algoritmik Triyaj — Net ROI Motoru</h3>
                <p className="text-xs text-gray-400">Hangi konuya çalışırsan en çok net kazanırsın?</p>
              </div>
            </div>

            <div className="rounded-2xl bg-indigo-950/40 p-4 border border-indigo-500/30">
              <p className="text-sm font-bold text-indigo-300">Bu 3 konuya odaklanırsan tahminen +{top3Gain.toFixed(1)} net artış</p>
            </div>

            <div className="space-y-3">
              {displayResults.map((result, idx) => (
                <div key={idx} className="rounded-2xl glass-card p-4 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-amber-500/30 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold text-gray-300 whitespace-nowrap">
                        {result.course}
                      </span>
                    </div>
                    <h4 className={`text-sm font-bold truncate ${result.recommendation === 'skip' ? 'text-gray-500 line-through' : 'text-white'}`}>
                      {result.topic}
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">Ortalama Soru: {result.avgQuestions.toFixed(1)}</p>
                  </div>
                  
                  <div className="flex flex-wrap md:flex-nowrap items-center gap-3">
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] text-gray-400">Tahmini Süre</span>
                      <span className="text-sm font-bold text-white">{result.estimatedStudyHours}s</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] text-gray-400">Net Getirisi</span>
                      <span className="text-sm font-bold text-white">+{result.expectedNetGain.toFixed(2)}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-[10px] text-gray-400">ROI Skoru</span>
                      <span className={`text-sm font-bold ${
                        result.recommendation === 'focus' ? 'text-emerald-400' :
                        result.recommendation === 'maintain' ? 'text-amber-400' :
                        'text-gray-500'
                      }`}>
                        {result.roi.toFixed(2)}
                      </span>
                    </div>
                    <div className="ml-2 flex-shrink-0 w-24 text-right">
                      {result.recommendation === 'focus' && (
                        <span className="inline-flex items-center justify-center rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30 w-full">
                          🎯 Odaklan
                        </span>
                      )}
                      {result.recommendation === 'maintain' && (
                        <span className="inline-flex items-center justify-center rounded-full bg-amber-500/20 px-2.5 py-1 text-xs font-bold text-amber-300 border border-amber-500/30 w-full">
                          📌 Koru
                        </span>
                      )}
                      {result.recommendation === 'skip' && (
                        <span className="inline-flex items-center justify-center rounded-full bg-gray-500/20 px-2.5 py-1 text-xs font-bold text-gray-400 border border-gray-500/30 w-full">
                          ⏭️ Bırak
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* 6. SIMULATION */}
      {activeTab === "simulation" && (
        <div className="rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl space-y-5">
          {simStatus === "idle" && (
            <div className="space-y-6 text-center max-w-2xl mx-auto py-8">
              <Flame className="w-16 h-16 text-rose-500 mx-auto" />
              <h3 className="font-display text-3xl font-bold text-white">Acımasız ÖSYM Simülasyonu</h3>
              <p className="text-gray-400">Gerçek sınav stresini yaşa. Timer durdurulamaz. Çıkarsan PES ETTİ damgası yersin.</p>
              <span className="inline-block rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
                {activeExam === 'kpss_onlisans' ? '📋 Önlisans Soru Havuzu' : '📋 Lisans Soru Havuzu'}
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
                <button
                  onClick={() => setSimDuration(40)}
                  className={`p-5 rounded-2xl font-bold transition-all border text-left flex flex-col justify-between ${
                    simDuration === 40
                      ? 'bg-rose-600/20 border-rose-500 text-rose-300 shadow-xl shadow-rose-600/10'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">⚡ Tür 1 (Nokta Atışı)</span>
                    <span className="text-base font-black block text-white">30 Soruluk Özel Simülasyon</span>
                    <span className="text-xs text-gray-400 block mt-1">
                      {activeExam === 'kpss_onlisans'
                        ? 'Önlisans müfredatından %80+ çıkma ihtimalli sorular'
                        : 'Lisans GY-GK + Alan derslerinden sıcak sorular'}
                    </span>
                  </div>
                  <span className="mt-4 text-xs font-bold text-rose-400 bg-rose-500/10 px-3 py-1.5 rounded-xl border border-rose-500/20 w-fit">
                    ⏱️ 40 Dakika Süre
                  </span>
                </button>

                <button
                  onClick={() => setSimDuration(130)}
                  className={`p-5 rounded-2xl font-bold transition-all border text-left flex flex-col justify-between ${
                    simDuration === 130
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-xl shadow-indigo-600/10'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">🏆 Tür 2 (Tam Prova)</span>
                    <span className="text-base font-black block text-white">
                      {activeExam === 'kpss_onlisans' ? '120 Soruluk Önlisans Sınavı' : '120 Soruluk Lisans Sınavı'}
                    </span>
                    <span className="text-xs text-gray-400 block mt-1">
                      {activeExam === 'kpss_onlisans'
                        ? 'Birebir ÖSYM Önlisans 120 Soru (60 GY + 60 GK) Dağılımı'
                        : 'Birebir ÖSYM Lisans 120 Soru (60 GY + 60 GK) Dağılımı'}
                    </span>
                  </div>
                  <span className="mt-4 text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-500/20 w-fit">
                    ⏱️ 130 Dakika Süre
                  </span>
                </button>
              </div>

              <button
                onClick={handleStartSimulation}
                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-black rounded-2xl text-lg transition-all shadow-xl shadow-rose-600/20 hover:scale-105 active:scale-95"
              >
                🔥 {activeExam === 'kpss_onlisans' ? 'Önlisans' : 'Lisans'} ÖSYM Simülasyonunu Başlat
              </button>

              {simHistory.length > 0 && (
                <div className="mt-12 text-left space-y-4">
                  <h4 className="text-lg font-bold text-white border-b border-white/10 pb-2">Geçmiş Simülasyonlar</h4>
                  <div className="space-y-2">
                    {simHistory.slice(0, 5).map((sh, idx) => (
                      <div key={idx} className="bg-white/5 p-4 rounded-xl flex items-center justify-between border border-white/10">
                        <div>
                          <span className="text-xs text-gray-400">{new Date(sh.completedAt).toLocaleDateString()}</span>
                          <div className="font-bold text-white">{sh.totalQuestions} Soru / {sh.net} Net</div>
                        </div>
                        <div className="flex flex-col items-end">
                          {sh.gaveUp ? (
                            <span className="text-xs font-bold text-rose-500 bg-rose-500/10 px-2 py-1 rounded">PES ETTİ</span>
                          ) : (
                            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">TAMAMLADI</span>
                          )}
                          <span className="text-xs text-gray-400 mt-1">Stres: {sh.stressScore}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {simStatus === "running" && (
            <ExamSimulator 
              questions={simQuestions} 
              durationMinutes={simDuration} 
              onComplete={handleCompleteSimulation}
              onCancel={() => setSimStatus("idle")} 
            />
          )}

          {simStatus === "finished" && simResult && (
            <div className="space-y-6 text-center max-w-3xl mx-auto py-8">
              <Award className="w-16 h-16 text-amber-500 mx-auto" />
              <h3 className="font-display text-3xl font-bold text-white">Simülasyon Sonucu</h3>
              
              {simResult.gaveUp ? (
                <div className="bg-rose-500/20 text-rose-400 border border-rose-500/50 p-4 rounded-xl font-bold text-xl">
                  PES ETTİ
                </div>
              ) : (
                <div className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 p-4 rounded-xl font-bold text-xl">
                  TAMAMLADI
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Doğru</div>
                  <div className="text-xl font-bold text-emerald-400">{simResult.correct}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Yanlış</div>
                  <div className="text-xl font-bold text-rose-400">{simResult.wrong}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Boş</div>
                  <div className="text-xl font-bold text-gray-400">{simResult.blank}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Net</div>
                  <div className="text-xl font-bold text-indigo-400">{simResult.net}</div>
                </div>
              </div>

              <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                <span className="text-gray-400">Stres Skoru:</span>
                <span className="font-bold text-amber-400">{simResult.stressScore} / 100</span>
              </div>

              <button
                onClick={() => setSimStatus("idle")}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors mb-4"
              >
                Geri Dön
              </button>

              {/* Detailed Per-Question Review with User Answers */}
              <div className="mt-8 text-left space-y-4 border-t border-white/10 pt-6">
                <h4 className="text-lg font-bold text-white mb-2">📋 Soru Detayları — Doğru / Yanlış / Boş</h4>
                {simQuestions.map((q, idx) => {
                  const userAnswer = simAnswers[idx];
                  const isCorrect = userAnswer !== undefined && userAnswer !== null && userAnswer === q.correctIndex;
                  const isWrong = userAnswer !== undefined && userAnswer !== null && userAnswer !== q.correctIndex;
                  const isBlank = userAnswer === undefined || userAnswer === null;
                  
                  return (
                    <div key={idx} className={`rounded-2xl p-4 border text-left space-y-2 ${
                      isCorrect ? 'bg-emerald-950/30 border-emerald-500/30' :
                      isWrong ? 'bg-rose-950/30 border-rose-500/30' :
                      'bg-white/5 border-white/10'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-bold">Soru {idx + 1} ({q.subject})</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                          isCorrect ? 'bg-emerald-500/20 text-emerald-400' :
                          isWrong ? 'bg-rose-500/20 text-rose-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {isCorrect ? '✅ Doğru' : isWrong ? '❌ Yanlış' : '⬜ Boş'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-200">{q.question}</p>
                      <div className="space-y-1 mt-2">
                        {q.options.map((opt, optIdx) => {
                          const isUserChoice = userAnswer === optIdx;
                          const isCorrectOption = q.correctIndex === optIdx;
                          return (
                            <div key={optIdx} className={`text-xs px-3 py-1.5 rounded-lg flex items-center space-x-2 ${
                              isCorrectOption ? 'bg-emerald-500/15 text-emerald-300 font-bold' :
                              isUserChoice && !isCorrectOption ? 'bg-rose-500/15 text-rose-300 line-through' :
                              'text-gray-400'
                            }`}>
                              <span className="font-bold w-5">{String.fromCharCode(65 + optIdx)})</span>
                              <span>{opt}</span>
                              {isCorrectOption && <span className="ml-auto">✅</span>}
                              {isUserChoice && !isCorrectOption && <span className="ml-auto">❌</span>}
                            </div>
                          );
                        })}
                      </div>
                      {q.explanation && (
                        <div className="mt-2 p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                          <p className="text-xs text-indigo-300">💡 {q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
