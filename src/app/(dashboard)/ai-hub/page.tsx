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
  const { results, getBestScore } = useExamHistoryStore();
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
  const [activeTab, setActiveTab] = useState<"coach" | "pvp" | "topics" | "podcast" | "triage" | "simulation">("coach");

  // Simulation State
  const [simStatus, setSimStatus] = useState<"idle" | "running" | "finished">("idle");
  const [simDuration, setSimDuration] = useState<number>(30); // 30, 60, 120
  const [simResult, setSimResult] = useState<SimulationResult | null>(null);
  const [simHistory, setSimHistory] = useState<SimulationResult[]>([]);
  const [simQuestions, setSimQuestions] = useState<DuelQuestion[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('asimptot_simulations_v1');
    if (saved) {
      try {
        setSimHistory(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleStartSimulation = () => {
    let qCount = 15;
    if (simDuration === 60) qCount = 30;
    if (simDuration === 120) qCount = 60;
    setSimQuestions(getRandomQuestions(qCount, activeExam));
    setSimStatus("running");
  };

  const handleCompleteSimulation = (result: SimulationResult) => {
    setSimResult(result);
    setSimStatus("finished");
    const newHistory = [result, ...simHistory];
    setSimHistory(newHistory);
    localStorage.setItem('asimptot_simulations_v1', JSON.stringify(newHistory));
  };

  // Friend PvP State
  const [pvpScore, setPvpScore] = useState<{ user: number; friend: number }>({ user: 0, friend: 0 });
  const [pvpCurrentQuestion, setPvpCurrentQuestion] = useState(1);
  const [pvpFinished, setPvpFinished] = useState(false);
  const [questions, setQuestions] = useState<DuelQuestion[]>(() => getRandomQuestions(5, activeExam));
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (activeTab === "pvp" && !pvpFinished && !showAnswer && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showAnswer && !pvpFinished) {
      handlePvpAnswer(-1); // Timeout
    }
  }, [timeLeft, activeTab, pvpFinished, showAnswer]);

  const handlePvpAnswer = (index: number) => {
    if (showAnswer) return;
    setSelectedAnswer(index);
    setShowAnswer(true);

    const currentQ = questions[pvpCurrentQuestion - 1];
    const isCorrect = index === currentQ?.correctIndex;

    if (isCorrect) {
      setPvpScore((prev) => ({ ...prev, user: prev.user + 20 }));
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    }
    
    // Friend randomly gets +15 or +0
    const friendCorrect = Math.random() > 0.4;
    if (friendCorrect) {
      setPvpScore((prev) => ({ ...prev, friend: prev.friend + 15 }));
    }

    setTimeout(() => {
      if (pvpCurrentQuestion < 5) {
        setPvpCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowAnswer(false);
        setTimeLeft(30);
      } else {
        setPvpFinished(true);
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
      }
    }, 1500);
  };

  const resetPvp = () => {
    setQuestions(getRandomQuestions(5, activeExam));
    setPvpScore({ user: 0, friend: 0 });
    setPvpCurrentQuestion(1);
    setPvpFinished(false);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setTimeLeft(30);
  };

  // Compute Konu Tahmini
  const distributionData = activeExam === "kpss_onlisans" ? kpssOnlisansDistributionData : kpssLisansDistributionData;
  
  const allTopics = Object.entries(distributionData).flatMap(([subject, topics]) =>
    topics.map(t => ({ 
      subject, 
      topic: t.topic, 
      avg: t.avg, 
      importance: t.importance,
      trend: t.y2024 >= t.y2022 ? "rising" : "falling" 
    }))
  );
  
  const topTopics = allTopics.sort((a, b) => b.avg - a.avg).slice(0, 15);

  const getOptionColor = (index: number) => {
    switch (index) {
      case 0: return "hover:bg-indigo-600/30 border-white/10 hover:border-indigo-500/50";
      case 1: return "hover:bg-emerald-600/30 border-white/10 hover:border-emerald-500/50";
      case 2: return "hover:bg-amber-600/30 border-white/10 hover:border-amber-500/50";
      case 3: return "hover:bg-rose-600/30 border-white/10 hover:border-rose-500/50";
      default: return "";
    }
  };

  const getAnswerColor = (index: number, correctIndex: number) => {
    if (index === correctIndex) return "bg-emerald-600/50 border-emerald-500/50";
    if (index === selectedAnswer && index !== correctIndex) return "bg-rose-600/50 border-rose-500/50";
    return "opacity-50";
  };

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
          <span>6 Yapay Zeka Modülü Aktif</span>
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
          onClick={() => setActiveTab("pvp")}
          className={`rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all border flex items-center space-x-1.5 ${
            activeTab === "pvp"
              ? "bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-600/30"
              : "glass-card text-gray-400 border-white/5 hover:text-white"
          }`}
        >
          <Swords className="h-4 w-4 text-rose-300" />
          <span>⚔️ Canlı Düello (1v1)</span>
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


      {/* 2. FRIEND PVP CHALLENGE */}
      {activeTab === "pvp" && (
        <div className="rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-600/30 text-rose-300 border border-rose-500/40">
                <Swords className="h-7 w-7" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  Canlı Düello & Soru Yarışı (1v1 Challenge)
                </h3>
                <p className="text-xs text-gray-400">
                  5 Soru - 30 Soru Başı Süre - Zamana Karşı Yarış!
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-black/40 px-4 py-2 rounded-2xl border border-white/10">
              <span className="text-xs font-bold text-indigo-300">{currentUser.name}: {pvpScore.user}</span>
              <span className="text-xs text-gray-500">VS</span>
              <span className="text-xs font-bold text-rose-300">Arkadaş: {pvpScore.friend}</span>
            </div>
          </div>

          {!pvpFinished && questions.length > 0 ? (
            <div className="space-y-4 text-center py-4">
              <div className="flex items-center justify-center space-x-4">
                <span className="rounded-full bg-rose-500/20 px-3 py-1 text-xs font-bold text-rose-300 border border-rose-500/30">
                  Soru {pvpCurrentQuestion} / 5
                </span>
                <span className={`rounded-full px-3 py-1 text-xs font-bold border flex items-center space-x-1 ${timeLeft <= 5 ? "bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse" : "bg-white/10 text-gray-300 border-white/20"}`}>
                  <Timer className="w-3 h-3" />
                  <span>{timeLeft}s</span>
                </span>
              </div>

              <div className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/10 text-gray-400">
                {questions[pvpCurrentQuestion - 1]?.subject}
              </div>

              <h4 className="font-display text-lg font-bold text-white max-w-xl mx-auto min-h-[60px] flex items-center justify-center">
                {questions[pvpCurrentQuestion - 1]?.question}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto pt-2">
                {questions[pvpCurrentQuestion - 1]?.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handlePvpAnswer(i)}
                    disabled={showAnswer}
                    className={`rounded-2xl glass-card p-4 text-sm font-bold text-left transition-all ${
                      showAnswer 
                        ? getAnswerColor(i, questions[pvpCurrentQuestion - 1].correctIndex) 
                        : getOptionColor(i)
                    } ${showAnswer ? "text-white" : "text-gray-200"}`}
                  >
                    <span className="mr-2 opacity-50">{String.fromCharCode(65 + i)})</span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : pvpFinished ? (
            <div className="text-center py-6 space-y-3">
              <Award className="mx-auto h-12 w-12 text-amber-400 animate-bounce" />
              <h3 className="font-display text-2xl font-extrabold text-white">
                Düello Tamamlandı! 🏆
              </h3>
              <p className="text-sm text-emerald-300 font-bold mb-4">
                Sen: {pvpScore.user} | Arkadaş: {pvpScore.friend}
              </p>
              <h4 className="text-xl font-bold text-white mb-6">
                {pvpScore.user > pvpScore.friend ? "🎉 KAZANDIN!" : pvpScore.user < pvpScore.friend ? "😔 KAYBETTİN" : "🤝 BERABERE!"}
              </h4>
              <button
                onClick={resetPvp}
                className="rounded-xl glass-button px-5 py-2.5 text-xs font-bold text-white shadow-lg inline-flex items-center space-x-2 mb-4"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Yeniden Oyna</span>
              </button>

              {/* PvP Results Review */}
              <div className="mt-8 text-left space-y-4 max-w-2xl mx-auto border-t border-white/10 pt-6">
                <h4 className="text-lg font-bold text-white mb-2">Soru Özeti ve Açıklamalar</h4>
                {questions.map((q, idx) => (
                  <QuestionReviewCard key={idx} q={q} index={idx} />
                ))}
              </div>
            </div>
          ) : null}
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
              
              <div className="flex justify-center space-x-4">
                {[30, 60, 120].map(dur => (
                  <button
                    key={dur}
                    onClick={() => setSimDuration(dur)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all border ${simDuration === dur ? 'bg-rose-600/20 border-rose-500 text-rose-300' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                  >
                    {dur} dk
                    <span className="block text-xs font-normal opacity-70">{dur === 30 ? '15 Soru' : dur === 60 ? '30 Soru' : '60 Soru'}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={handleStartSimulation}
                className="w-full sm:w-auto px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-lg transition-colors shadow-lg shadow-rose-600/30"
              >
                🔥 Simülasyonu Başlat
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
            <div className="space-y-6 text-center max-w-xl mx-auto py-8">
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

              {/* Simulation Results Review */}
              <div className="mt-8 text-left space-y-4 border-t border-white/10 pt-6">
                <h4 className="text-lg font-bold text-white mb-2">Soru Özeti ve Açıklamalar</h4>
                {simQuestions.map((q, idx) => (
                  <QuestionReviewCard key={idx} q={q} index={idx} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
