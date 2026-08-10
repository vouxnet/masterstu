"use client";

import React, { useState } from "react";
import { useAuthStore, EXAM_METADATA } from "@/src/lib/store/useAuthStore";
import { useExamHistoryStore } from "@/src/lib/store/useExamHistoryStore";
import { useStudyLogStore } from "@/src/lib/store/useStudyLogStore";
import { ALL_EXAM_PACKS, ExamPack } from "@/src/lib/data/examPacks";
import ExamSimulator, { SimulationResult } from "@/src/components/exam-sim/ExamSimulator";
import { Calculator, Save, Trash2, Trophy, ChevronDown, ChevronUp, Play, BookOpen, Clock, Sparkles, CheckCircle2, XCircle, Lightbulb } from "lucide-react";
import { useAdminStore } from "@/src/lib/store/useAdminStore";

export default function ExamsPage() {
  const { currentUser } = useAuthStore();
  const getCmsContent = useAdminStore((state) => state.getCmsContent);
  const cmsExamsHeader = getCmsContent("exams_header", "Deneme Sınavları Merkezi & ÖSYM Hesaplayıcı", "ÖSYM standart katsayıları ile P3 (Lisans) ve P93 (Önlisans) Puan Hesaplama & Canlı Deneme Çözümü", "Gerçek sınav süresi, optik form soru geçiş gridi ve açıklamalı soru analizleriyle canlı çözün");
  const { addResult, deleteResult, results } = useExamHistoryStore();
  const { addLog } = useStudyLogStore();

  // Active Simulator Pack
  const [activePack, setActivePack] = useState<ExamPack | null>(null);
  const [lastResult, setLastResult] = useState<{ result: SimulationResult; pack: ExamPack } | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Score Calculator Form state
  const [gyCorrect, setGyCorrect] = useState(45);
  const [gyWrong, setGyWrong] = useState(10);
  const [gkCorrect, setGkCorrect] = useState(42);
  const [gkWrong, setGkWrong] = useState(12);

  const [alanCorrect, setAlanCorrect] = useState(30);
  const [alanWrong, setAlanWrong] = useState(6);

  const [notes, setNotes] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const filteredResults = results.filter(r => r.examType === currentUser.activeExam);

  // Handle Exam Completion
  const handleSimulationComplete = (result: SimulationResult) => {
    if (!activePack) return;

    // Separate GY (Türkçe + Mat) vs GK (Tarih + Coğ + Vat)
    let gyC = 0, gyW = 0, gkC = 0, gkW = 0;
    activePack.questions.forEach((q, idx) => {
      const ans = result.answers[idx];
      const isGY = q.subject === "Türkçe" || q.subject === "Matematik";
      if (ans !== undefined && ans !== null) {
        if (ans === q.correctIndex) {
          if (isGY) gyC++; else gkC++;
        } else {
          if (isGY) gyW++; else gkW++;
        }
      }
    });

    const gyN = Math.max(0, gyC - gyW / 4);
    const gkN = Math.max(0, gkC - gkW / 4);
    const totalN = parseFloat((gyN + gkN).toFixed(2));
    const estimatedP93 = parseFloat((38 + gyN * 0.52 + gkN * 0.48).toFixed(2));

    // Save to Exam History Store
    addResult({
      examType: currentUser.activeExam,
      examLabel: activePack.title,
      gyCorrect: gyC,
      gyWrong: gyW,
      gkCorrect: gkC,
      gkWrong: gkW,
      alanCorrect: 0,
      alanWrong: 0,
      gyNet: parseFloat(gyN.toFixed(2)),
      gkNet: parseFloat(gkN.toFixed(2)),
      alanNet: 0,
      totalNet: totalN,
      estimatedScore: estimatedP93,
      scoreType: 'P93',
      notes: `${activePack.title} Çözüldü. (Stres Skoru: %${result.stressScore})`,
      date: new Date().toISOString().split('T')[0],
    });

    // Save to Study Log Store
    addLog({
      activityType: 'exam',
      subject: activePack.title,
      durationMinutes: Math.round(result.durationSeconds / 60),
      questionsCount: activePack.totalQuestions,
      examType: currentUser.activeExam,
      date: new Date().toISOString().split('T')[0],
    });

    // Save wrong questions to Mistakes Vault (localStorage)
    if (typeof window !== "undefined") {
      try {
        const existingMistakes = JSON.parse(localStorage.getItem('kpss_mistakes_v2') || '[]');
        const newMistakes: any[] = [];
        activePack.questions.forEach((q, idx) => {
          const ans = result.answers[idx];
          if (ans !== undefined && ans !== null && ans !== q.correctIndex) {
            newMistakes.push({
              id: `mistake-${Date.now()}-${idx}`,
              subject: q.subject,
              topic: q.subject,
              questionText: q.question,
              options: q.options,
              userAnswer: ans,
              correctAnswer: q.correctIndex,
              explanation: q.explanation || "Detaylı çözüm veritabanında mevcuttur.",
              date: new Date().toISOString().split('T')[0],
              resolved: false,
            });
          }
        });
        if (newMistakes.length > 0) {
          localStorage.setItem('kpss_mistakes_v2', JSON.stringify([...newMistakes, ...existingMistakes]));
        }
      } catch (e) {}
    }

    setLastResult({ result, pack: activePack });
    setActivePack(null);
    setShowReviewModal(true);
  };

  // Net calculation: Correct - Wrong / 4
  const gyNet = Math.max(0, gyCorrect - gyWrong / 4);
  const gkNet = Math.max(0, gkCorrect - gkWrong / 4);
  const alanNet = Math.max(0, alanCorrect - alanWrong / 4);

  const isLisans = currentUser.activeExam === "kpss_lisans";

  const p3Estimated = (40 + gyNet * 0.5 + gkNet * 0.45).toFixed(2);
  const p93Estimated = (38 + gyNet * 0.52 + gkNet * 0.48).toFixed(2);
  const p48Estimated = (30 + gyNet * 0.2 + gkNet * 0.2 + alanNet * 0.6).toFixed(2);

  const handleSaveExam = () => {
    const totalNet = parseFloat((gyNet + gkNet + (isLisans ? alanNet : 0)).toFixed(2));
    addResult({
      examType: currentUser.activeExam,
      examLabel: EXAM_METADATA[currentUser.activeExam]?.shortLabel || currentUser.activeExam,
      gyCorrect, gyWrong,
      gkCorrect, gkWrong,
      alanCorrect: isLisans ? alanCorrect : 0,
      alanWrong: isLisans ? alanWrong : 0,
      gyNet: parseFloat(gyNet.toFixed(2)),
      gkNet: parseFloat(gkNet.toFixed(2)),
      alanNet: isLisans ? parseFloat(alanNet.toFixed(2)) : 0,
      totalNet,
      estimatedScore: parseFloat(isLisans ? p48Estimated : p93Estimated),
      scoreType: isLisans ? 'P48' : 'P93',
      notes,
      date: new Date().toISOString().split('T')[0],
    });
    addLog({
      activityType: 'exam',
      subject: 'Deneme Sınavı',
      durationMinutes: 130,
      questionsCount: gyCorrect + gyWrong + gkCorrect + gkWrong + (isLisans ? alanCorrect + alanWrong : 0),
      examType: currentUser.activeExam,
      date: new Date().toISOString().split('T')[0],
    });
    setNotes('');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Active Simulator Launcher Portal */}
      {activePack && (
        <ExamSimulator
          questions={activePack.questions}
          durationMinutes={activePack.durationMinutes}
          onComplete={handleSimulationComplete}
          onCancel={() => setActivePack(null)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-3xl glass-panel p-6 border border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-bold text-purple-300 border border-purple-500/30">
              ÖSYM Sınav Simülasyonu & Net Takibi
            </span>
          </div>
          <h1 className="mt-2 font-display text-2xl font-extrabold text-white">
            {cmsExamsHeader.title}
          </h1>
          <p className="text-xs text-gray-300 mt-1">
            {cmsExamsHeader.subtitle}
          </p>
        </div>
      </div>

      {/* 🔥 EXAM BOOKLET LIBRARY SECTION */}
      <div className="rounded-3xl glass-panel p-6 border border-indigo-500/30 shadow-2xl space-y-6 bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-gray-950">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/30">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🔥 ÖSYM Canlı Deneme Sınavları Kütüphanesi</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs border border-emerald-500/30 font-mono">120 SORU / 130 DK</span>
              </h2>
              <p className="text-xs text-gray-300">
                {cmsExamsHeader.bodyText}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ALL_EXAM_PACKS.filter(pack => pack.examType === currentUser.activeExam || pack.examType === "both").map((pack) => (
            <div key={pack.id} className="p-5 rounded-2xl glass-card border border-indigo-500/30 hover:border-indigo-400/60 transition-all flex flex-col justify-between space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
              
              <div>
                {pack.badge && (
                  <span className="inline-block px-2.5 py-1 rounded-md bg-rose-500/20 text-rose-300 text-[11px] font-bold border border-rose-500/30 mb-2">
                    {pack.badge}
                  </span>
                )}
                <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {pack.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                  {pack.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center space-x-3 text-xs text-gray-300 font-mono">
                  <span className="flex items-center space-x-1">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{pack.totalQuestions} Soru</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{pack.durationMinutes} Dk</span>
                  </span>
                </div>

                <button
                  onClick={() => setActivePack(pack)}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all transform active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Sınavı Başlat</span>
                </button>
              </div>
            </div>
          ))}

          {/* Branş Denemeleri Kartı */}
          <div className="p-5 rounded-2xl glass-card border border-white/10 flex flex-col justify-between space-y-4">
            <div>
              <span className="inline-block px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 text-[11px] font-bold border border-purple-500/30 mb-2">
                ⚡ DERS BRANŞ DENEMELERİ
              </span>
              <h3 className="text-base font-bold text-white">
                Ders Bazlı Branş Denemeleri
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Zamanınız kısıtlıysa doğrudan Türkçe (30 Soru), Matematik (30 Soru) veya Tarih (27 Soru) çözün!
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
              <button
                onClick={() => {
                  const targetPack = ALL_EXAM_PACKS.find(p => p.examType === currentUser.activeExam) || ALL_EXAM_PACKS[0];
                  const currentExamType = currentUser.activeExam === "kpss_lisans" ? "kpss_lisans" : "kpss_onlisans";
                  const turkishPack: ExamPack = {
                    id: `brans-turkce-${currentUser.activeExam}`,
                    title: `Türkçe Branş Denemesi #1 (30 Soru)`,
                    description: "Sözcük, Cümle, Paragraf, Dil Bilgisi ve Sözel Mantık 30 Soru",
                    examType: currentExamType,
                    totalQuestions: 30,
                    durationMinutes: 35,
                    questions: targetPack.questions.filter(q => q.subject === "Türkçe")
                  };
                  setActivePack(turkishPack);
                }}
                className="px-3 py-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 text-indigo-300 text-xs font-bold transition-all"
              >
                📚 Türkçe (30 Soru)
              </button>
              <button
                onClick={() => {
                  const targetPack = ALL_EXAM_PACKS.find(p => p.examType === currentUser.activeExam) || ALL_EXAM_PACKS[0];
                  const currentExamType = currentUser.activeExam === "kpss_lisans" ? "kpss_lisans" : "kpss_onlisans";
                  const mathPack: ExamPack = {
                    id: `brans-mat-${currentUser.activeExam}`,
                    title: `Matematik & Geometri Branş Denemesi #1 (30 Soru)`,
                    description: "İşlem, Problemler, Dairesel Grafik, Sayısal Mantık ve Geometri 30 Soru",
                    examType: currentExamType,
                    totalQuestions: 30,
                    durationMinutes: 45,
                    questions: targetPack.questions.filter(q => q.subject === "Matematik")
                  };
                  setActivePack(mathPack);
                }}
                className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all"
              >
                📐 Matematik (30 Soru)
              </button>
              <button
                onClick={() => {
                  const targetPack = ALL_EXAM_PACKS.find(p => p.examType === currentUser.activeExam) || ALL_EXAM_PACKS[0];
                  const currentExamType = currentUser.activeExam === "kpss_lisans" ? "kpss_lisans" : "kpss_onlisans";
                  const tarihpPack: ExamPack = {
                    id: `brans-tarih-${currentUser.activeExam}`,
                    title: `Tarih Branş Denemesi #1 (27 Soru)`,
                    description: "İslamiyet Öncesinden Çağdaş Türk ve Dünya Tarihine 27 Soru",
                    examType: currentExamType,
                    totalQuestions: 27,
                    durationMinutes: 25,
                    questions: targetPack.questions.filter(q => q.subject === "Tarih")
                  };
                  setActivePack(tarihpPack);
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all"
              >
                🏛️ Tarih (27 Soru)
              </button>
              <button
                onClick={() => {
                  const targetPack = ALL_EXAM_PACKS.find(p => p.examType === currentUser.activeExam) || ALL_EXAM_PACKS[0];
                  const currentExamType = currentUser.activeExam === "kpss_lisans" ? "kpss_lisans" : "kpss_onlisans";
                  const cografyaPack: ExamPack = {
                    id: `brans-cografya-${currentUser.activeExam}`,
                    title: `Coğrafya Branş Denemesi #1 (18 Soru)`,
                    description: "Fiziki, Beşeri, Ekonomik Coğrafya ve Bölgesel Projeler 18 Soru",
                    examType: currentExamType,
                    totalQuestions: 18,
                    durationMinutes: 20,
                    questions: targetPack.questions.filter(q => q.subject === "Coğrafya")
                  };
                  setActivePack(cografyaPack);
                }}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all"
              >
                🗺️ Coğrafya (18 Soru)
              </button>
              <button
                onClick={() => {
                  const targetPack = ALL_EXAM_PACKS.find(p => p.examType === currentUser.activeExam) || ALL_EXAM_PACKS[0];
                  const currentExamType = currentUser.activeExam === "kpss_lisans" ? "kpss_lisans" : "kpss_onlisans";
                  const vatPack: ExamPack = {
                    id: `brans-vat-${currentUser.activeExam}`,
                    title: `Vatandaşlık & Güncel Bilgiler Branş Denemesi #1 (15 Soru)`,
                    description: "Hukukun Temel Kavramları, Anayasa, İdare Hukuku ve Güncel Bilgiler 15 Soru",
                    examType: currentExamType,
                    totalQuestions: 15,
                    durationMinutes: 15,
                    questions: targetPack.questions.filter(q => q.subject === "Vatandaşlık" || q.subject === "Güncel Bilgiler")
                  };
                  setActivePack(vatPack);
                }}
                className="px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 text-xs font-bold transition-all"
              >
                ⚖️ Vatandaşlık & Güncel (15 Soru)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Post-Exam Review Modal */}
      {showReviewModal && lastResult && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#111] border border-indigo-500/40 rounded-3xl max-w-3xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  🎉 SINAV KART RAPORU & DETAYLI ÇÖZÜMLER
                </span>
                <h2 className="text-xl font-bold text-white mt-1">
                  {lastResult.pack.title}
                </h2>
              </div>
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-xs"
              >
                Kapat ✕
              </button>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                <span className="text-xs text-gray-400">Doğru</span>
                <p className="text-xl font-bold text-emerald-400">{lastResult.result.correct}</p>
              </div>
              <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center">
                <span className="text-xs text-gray-400">Yanlış</span>
                <p className="text-xl font-bold text-rose-400">{lastResult.result.wrong}</p>
              </div>
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-center">
                <span className="text-xs text-gray-400">Toplam Net</span>
                <p className="text-xl font-bold text-cyan-300">{lastResult.result.net}</p>
              </div>
              <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center">
                <span className="text-xs text-gray-400">Tahmini P93</span>
                <p className="text-xl font-bold text-purple-300">
                  {(38 + lastResult.result.net * 0.5).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Detailed Question Review Accordion */}
            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">
                💡 Sorular ve Detaylı Çözümleri ({lastResult.pack.questions.length} Soru)
              </h3>

              <div className="space-y-3">
                {lastResult.pack.questions.map((q, idx) => {
                  const userAns = lastResult.result.answers[idx];
                  const isCorrect = userAns === q.correctIndex;
                  const isBlank = userAns === undefined || userAns === null;

                  return (
                    <div key={q.id} className="p-4 rounded-xl glass-card border border-white/10 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                          {q.subject} - Soru {idx + 1}
                        </span>
                        {isCorrect ? (
                          <span className="flex items-center space-x-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Doğru</span>
                          </span>
                        ) : isBlank ? (
                          <span className="text-xs font-bold text-gray-400 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                            Boş Bırakıldı
                          </span>
                        ) : (
                          <span className="flex items-center space-x-1 text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Yanlış</span>
                          </span>
                        )}
                      </div>

                      <p className="text-sm font-medium text-white leading-relaxed">
                        {q.question}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {q.options.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            className={`p-2.5 rounded-lg border ${
                              oIdx === q.correctIndex
                                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold"
                                : userAns === oIdx
                                ? "bg-rose-500/20 border-rose-500/40 text-rose-300 font-bold"
                                : "bg-white/5 border-white/10 text-gray-400"
                            }`}
                          >
                            <span className="mr-2 font-bold">{String.fromCharCode(65 + oIdx)})</span>
                            {opt}
                          </div>
                        ))}
                      </div>

                      {q.explanation && (
                        <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 flex items-start space-x-2">
                          <Lightbulb className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-indigo-200">Detaylı Çözüm: </span>
                            <span>{q.explanation}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Score Calculator Card */}
      <div className="rounded-3xl glass-panel p-6 border border-white/10 shadow-xl space-y-6">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-600/30 text-purple-300 border border-purple-500/30">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-base">Net & Puan Hesaplayıcı</h3>
            <p className="text-xs text-gray-400">Doğru ve Yanlış sayılarınızı girerek net ve puanınızı görün</p>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* GY */}
          <div className="rounded-2xl glass-card p-4 border border-white/5 space-y-3">
            <h4 className="font-display font-bold text-indigo-300 text-xs uppercase tracking-wider">
              Genel Yetenek (60 Soru)
            </h4>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-300">Doğru:</span>
              <input
                type="number"
                value={gyCorrect}
                onChange={(e) => setGyCorrect(Number(e.target.value))}
                className="w-16 rounded-lg bg-gray-900 px-2.5 py-1 text-xs text-emerald-400 border border-white/10"
              />
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-300">Yanlış:</span>
              <input
                type="number"
                value={gyWrong}
                onChange={(e) => setGyWrong(Number(e.target.value))}
                className="w-16 rounded-lg bg-gray-900 px-2.5 py-1 text-xs text-rose-400 border border-white/10"
              />
            </div>
            <div className="pt-2 border-t border-white/5 flex justify-between font-bold text-xs">
              <span className="text-gray-400">GY Net:</span>
              <span className="text-white font-display">{gyNet.toFixed(2)} Net</span>
            </div>
          </div>

          {/* GK */}
          <div className="rounded-2xl glass-card p-4 border border-white/5 space-y-3">
            <h4 className="font-display font-bold text-emerald-300 text-xs uppercase tracking-wider">
              Genel Kültür (60 Soru)
            </h4>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-300">Doğru:</span>
              <input
                type="number"
                value={gkCorrect}
                onChange={(e) => setGkCorrect(Number(e.target.value))}
                className="w-16 rounded-lg bg-gray-900 px-2.5 py-1 text-xs text-emerald-400 border border-white/10"
              />
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-300">Yanlış:</span>
              <input
                type="number"
                value={gkWrong}
                onChange={(e) => setGkWrong(Number(e.target.value))}
                className="w-16 rounded-lg bg-gray-900 px-2.5 py-1 text-xs text-rose-400 border border-white/10"
              />
            </div>
            <div className="pt-2 border-t border-white/5 flex justify-between font-bold text-xs">
              <span className="text-gray-400">GK Net:</span>
              <span className="text-white font-display">{gkNet.toFixed(2)} Net</span>
            </div>
          </div>

          {/* Alan (Lisans) */}
          {isLisans && (
            <div className="rounded-2xl glass-card p-4 border border-white/5 space-y-3">
              <h4 className="font-display font-bold text-amber-300 text-xs uppercase tracking-wider">
                Alan Bilgisi (Hukuk/İktisat/Maliye/Uİ)
              </h4>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-300">Doğru:</span>
                <input
                  type="number"
                  value={alanCorrect}
                  onChange={(e) => setAlanCorrect(Number(e.target.value))}
                  className="w-16 rounded-lg bg-gray-900 px-2.5 py-1 text-xs text-emerald-400 border border-white/10"
                />
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-300">Yanlış:</span>
                <input
                  type="number"
                  value={alanWrong}
                  onChange={(e) => setAlanWrong(Number(e.target.value))}
                  className="w-16 rounded-lg bg-gray-900 px-2.5 py-1 text-xs text-rose-400 border border-white/10"
                />
              </div>
              <div className="pt-2 border-t border-white/5 flex justify-between font-bold text-xs">
                <span className="text-gray-400">Alan Net:</span>
                <span className="text-white font-display">{alanNet.toFixed(2)} Net</span>
              </div>
            </div>
          )}
        </div>

        {/* Calculated Score Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {isLisans ? (
            <>
              <div className="rounded-2xl bg-gradient-to-tr from-indigo-900/40 to-indigo-800/40 p-4 border border-indigo-500/30 text-center">
                <p className="text-[11px] font-semibold text-indigo-300 uppercase">Tahmini P3 Puanı (Lisans)</p>
                <p className="font-display text-3xl font-extrabold text-white mt-1">{p3Estimated}</p>
              </div>

              <div className="rounded-2xl bg-gradient-to-tr from-purple-900/40 to-purple-800/40 p-4 border border-purple-500/30 text-center">
                <p className="text-[11px] font-semibold text-purple-300 uppercase">Tahmini P37 / P48 Puanı (Alan)</p>
                <p className="font-display text-3xl font-extrabold text-white mt-1">{p48Estimated}</p>
              </div>
            </>
          ) : (
            <div className="rounded-2xl bg-gradient-to-tr from-pink-900/40 to-pink-800/40 p-4 border border-pink-500/30 text-center">
              <p className="text-[11px] font-semibold text-pink-300 uppercase">Tahmini P93 Puanı (Önlisans)</p>
              <p className="font-display text-3xl font-extrabold text-white mt-1">{p93Estimated}</p>
            </div>
          )}

          <div className="rounded-2xl bg-gradient-to-tr from-emerald-900/40 to-emerald-800/40 p-4 border border-emerald-500/30 text-center">
            <p className="text-[11px] font-semibold text-emerald-300 uppercase">Toplam Net</p>
            <p className="font-display text-3xl font-extrabold text-white mt-1">
              {(gyNet + gkNet + (isLisans ? alanNet : 0)).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Notes + Save */}
        <div className="rounded-2xl glass-card p-4 border border-white/5 space-y-3">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Bu deneme hakkında not ekle (opsiyonel)..."
            rows={2}
            className="w-full rounded-xl bg-gray-900/90 px-3 py-2 text-xs text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:outline-none resize-none"
          />
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSaveExam}
              className="flex items-center space-x-2 rounded-xl glass-button px-5 py-2.5 text-xs font-bold text-white shadow-lg"
            >
              <Save className="h-4 w-4" />
              <span>Bu Denemeyi Kaydet</span>
            </button>
            {saveSuccess && (
              <span className="text-xs text-emerald-400 font-semibold">✅ Kaydedildi!</span>
            )}
          </div>
        </div>
      </div>

      {/* Exam History */}
      <div className="rounded-3xl glass-panel p-5 border border-white/10 shadow-xl">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-amber-400" />
            <h3 className="font-display font-bold text-white text-base">Önceki Denemelerim</h3>
            {filteredResults.length > 0 && (
              <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-300">
                {filteredResults.length} Deneme
              </span>
            )}
          </div>
          {showHistory ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
        </button>

        {showHistory && (
          <div className="mt-4 space-y-3">
            {filteredResults.length === 0 ? (
              <p className="text-center text-xs text-gray-500 py-4">Henüz kaydedilmiş deneme yok. İlk denemeyi kaydet! 🎯</p>
            ) : (
              filteredResults.map((r) => (
                <div key={r.id} className="rounded-2xl glass-card p-4 border border-white/5 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-300">{r.examLabel}</span>
                      <span className="text-[10px] text-gray-500">{r.date}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-xs font-bold text-white">Toplam Net: <span className="text-indigo-400">{r.totalNet}</span></span>
                      <span className="text-xs font-bold text-white">{r.scoreType}: <span className="text-emerald-400">{r.estimatedScore}</span></span>
                    </div>
                    {r.notes && <p className="text-[10px] text-gray-400 italic">{r.notes}</p>}
                  </div>
                  <button
                    onClick={() => deleteResult(r.id)}
                    className="ml-4 flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
