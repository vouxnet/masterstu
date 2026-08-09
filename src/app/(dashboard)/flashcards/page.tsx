"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { useCurriculumStore, examTypeToRole } from "@/src/lib/store/useCurriculumStore";
import { useStudyLogStore } from "@/src/lib/store/useStudyLogStore";
import { flashcardsDatabase, FlashcardItem } from "@/src/lib/data/flashcardsData";
import {
  RotateCw,
  X,
  Check,
  Sparkles,
  RefreshCw,
} from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import confetti from "canvas-confetti";

const FLASHCARD_STORAGE_KEY = "asimptot_flashcard_progress_v1";

interface CardSRSData {
  box: number; // 1-5 (Leitner box)
  nextReviewDate: string; // ISO date string YYYY-MM-DD
  reviewCount: number;
}

interface FlashcardProgress {
  knownIds: string[];
  repeatIds: string[];
  srsData: Record<string, CardSRSData>; // cardId -> SRS info
}

function loadProgress(): FlashcardProgress {
  if (typeof window === "undefined") return { knownIds: [], repeatIds: [], srsData: {} };
  try {
    const raw = localStorage.getItem(FLASHCARD_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        knownIds: Array.isArray(parsed.knownIds) ? parsed.knownIds : [],
        repeatIds: Array.isArray(parsed.repeatIds) ? parsed.repeatIds : [],
        srsData: parsed.srsData || {},
      };
    }
  } catch {
    // ignore corrupt data
  }
  return { knownIds: [], repeatIds: [], srsData: {} };
}

function saveProgress(known: FlashcardItem[], review: FlashcardItem[], srs: Record<string, CardSRSData>) {
  if (typeof window === "undefined") return;
  const data: FlashcardProgress = {
    knownIds: known.map((c) => c.id),
    repeatIds: review.map((c) => c.id),
    srsData: srs,
  };
  localStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data));
}

const LEITNER_INTERVALS = [1, 3, 7, 14, 30]; // days per box 1-5

function getNextReviewDate(box: number): string {
  const days = LEITNER_INTERVALS[Math.min(box - 1, 4)];
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

export default function FlashcardsPage() {
  const { currentUser } = useAuthStore();
  const { addLog } = useStudyLogStore();

  const activeExam = currentUser.activeExam || "kpss_lisans";
  const targetRole = examTypeToRole(activeExam);

  // User-specific cards
  const initialDeck = flashcardsDatabase.filter((c) => c.userRole === targetRole || c.userRole === (currentUser.role as any));

  const [selectedSubject, setSelectedSubject] = useState("Tüm Dersler");
  const [deck, setDeck] = useState<FlashcardItem[]>(initialDeck);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');

  // SRS Counters — restore from localStorage on mount
  const [knownCards, setKnownCards] = useState<FlashcardItem[]>(() => {
    const { knownIds } = loadProgress();
    return initialDeck.filter((c) => knownIds.includes(c.id));
  });
  const [reviewCards, setReviewCards] = useState<FlashcardItem[]>(() => {
    const { repeatIds } = loadProgress();
    return initialDeck.filter((c) => repeatIds.includes(c.id));
  });
  const [srsData, setSrsData] = useState<Record<string, CardSRSData>>(() => loadProgress().srsData);

  // Persist to localStorage whenever knownCards, reviewCards, or srsData change
  useEffect(() => {
    saveProgress(knownCards, reviewCards, srsData);
  }, [knownCards, reviewCards, srsData]);

  // Motion values for Swipe UI
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const opacityLeft = useTransform(x, [-150, -20], [1, 0]);
  const opacityRight = useTransform(x, [20, 150], [0, 1]);

  const subjectsLisans = ["Tüm Dersler", "Hukuk", "İktisat", "Maliye", "Uluslararası İlişkiler"];
  const subjectsOnlisans = ["Tüm Dersler", "Türkçe", "Matematik", "Tarih", "Coğrafya", "Vatandaşlık"];
  const subjects = targetRole === "lisans_alan" ? subjectsLisans : subjectsOnlisans;

  // Filter deck by course
  const currentDeck = selectedSubject === "Tüm Dersler"
    ? deck
    : deck.filter((c) => c.subject === selectedSubject);

  const activeCard: FlashcardItem | undefined = currentDeck[currentIndex];

  const handleSwipeRight = () => {
    if (!activeCard) return;
    setIsFlipped(false);
    setKnownCards((prev) => [...prev, activeCard]);

    // Leitner: advance box
    const currentBox = srsData[activeCard.id]?.box || 1;
    const newBox = Math.min(currentBox + 1, 5);
    const newSrsData = {
      ...srsData,
      [activeCard.id]: {
        box: newBox,
        nextReviewDate: getNextReviewDate(newBox),
        reviewCount: (srsData[activeCard.id]?.reviewCount || 0) + 1,
      },
    };
    setSrsData(newSrsData);

    addLog({
      activityType: "flashcard",
      subject: activeCard.subject || "",
      durationMinutes: 0,
      questionsCount: 1,
      examType: currentUser.activeExam,
      date: new Date().toISOString().split('T')[0],
    });
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#10B981", "#6366F1"],
    });
    nextCard();
  };

  const handleSwipeLeft = () => {
    if (!activeCard) return;
    setIsFlipped(false);
    setReviewCards((prev) => [...prev, activeCard]);

    // Leitner: reset to box 1
    const newSrsData = {
      ...srsData,
      [activeCard.id]: {
        box: 1,
        nextReviewDate: getNextReviewDate(1),
        reviewCount: (srsData[activeCard.id]?.reviewCount || 0) + 1,
      },
    };
    setSrsData(newSrsData);

    addLog({
      activityType: "flashcard",
      subject: activeCard.subject || "",
      durationMinutes: 0,
      questionsCount: 1,
      examType: currentUser.activeExam,
      date: new Date().toISOString().split('T')[0],
    });
    nextCard();
  };

  const nextCard = () => {
    if (currentIndex < currentDeck.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(currentDeck.length);
    }
  };

  const handleDragEnd = (_: any, info: any) => {
    // Upward swipe (negative y offset, significant)
    if (info.offset.y < -80 && Math.abs(info.offset.y) > Math.abs(info.offset.x)) {
      setShowReportModal(true);
      return;
    }
    if (info.offset.x > 100) {
      handleSwipeRight();
    } else if (info.offset.x < -100) {
      handleSwipeLeft();
    }
  };

  const resetDeck = () => {
    setDeck(initialDeck);
    setCurrentIndex(0);
    setKnownCards([]);
    setReviewCards([]);
    setIsFlipped(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
              Kaydır-Öğren (Akıllı Tekrar)
            </span>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
              Spaced Repetition (SRS)
            </span>
          </div>
          <h1 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">
            Kaydır-Öğren Akıllı Bilgi Kartları
          </h1>
          <p className="text-xs text-gray-300 mt-1">
            Sağa kaydır (👉 Bildim) veya sola kaydır (👈 Bilemedim) — Bilemediğin kartlar sistemce tekrar sırasına alınır!
          </p>
        </div>

        {/* Counters */}
        <div className="flex items-center space-x-3 glass-card p-3 rounded-2xl border border-white/10">
          <div className="text-center">
            <p className="text-[10px] text-gray-400 font-semibold uppercase">Öğrenilen</p>
            <p className="font-display text-lg font-bold text-emerald-400">{knownCards.length}</p>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="text-center">
            <p className="text-[10px] text-gray-400 font-semibold uppercase">Tekrar Et</p>
            <p className="font-display text-lg font-bold text-rose-400">{reviewCards.length}</p>
          </div>
        </div>
      </div>

      {/* Course Filter Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {subjects.map((sub) => (
          <button
            key={sub}
            onClick={() => {
              setSelectedSubject(sub);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedSubject === sub
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30"
                : "glass-card text-gray-400 border-white/5 hover:text-white"
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Swipe Card Area */}
      <div className="flex flex-col items-center justify-center relative min-h-[420px]">
        {activeCard && currentIndex < currentDeck.length ? (
          <div className="relative w-full max-w-md h-[380px] flex items-center justify-center">
            <motion.div
              drag
              dragConstraints={{ left: 0, right: 0 }}
              style={{ x, rotate }}
              onDragEnd={handleDragEnd}
              whileTap={{ cursor: "grabbing" }}
              className="absolute inset-0 rounded-3xl glass-panel p-7 border border-white/10 shadow-2xl flex flex-col justify-between cursor-grab select-none overflow-hidden backdrop-blur-2xl bg-gray-900/90"
            >
              {/* Swipe Indicators Overlay */}
              <motion.div
                style={{ opacity: opacityRight }}
                className="pointer-events-none absolute top-6 right-6 z-20 rounded-2xl bg-emerald-500/90 px-4 py-2 text-xs font-black text-white shadow-xl ring-2 ring-emerald-400 border border-white/30 rotate-12"
              >
                BİLDİM! 👉
              </motion.div>

              <motion.div
                style={{ opacity: opacityLeft }}
                className="pointer-events-none absolute top-6 left-6 z-20 rounded-2xl bg-rose-600/90 px-4 py-2 text-xs font-black text-white shadow-xl ring-2 ring-rose-400 border border-white/30 -rotate-12"
              >
                👈 BİLEMEDİM
              </motion.div>

              {/* Card Header Tag */}
              <div className="flex items-center justify-between z-10">
                <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
                  {activeCard.subject}
                </span>
                <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                  {activeCard.osymTag}
                </span>
              </div>

              {/* Card Main Body */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="my-auto text-center cursor-pointer p-2"
              >
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                  {isFlipped ? "CEVAP & ÖSYM NOTU" : "SORU (ÇEVİRMEK İÇİN TIKLA)"}
                </p>
                <h3 className="font-display text-lg font-bold text-white leading-relaxed">
                  {isFlipped ? activeCard.answer : activeCard.question}
                </h3>
                {isFlipped && activeCard.memoryTip && (
                  <p className="mt-4 text-xs font-medium text-emerald-400 bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/20">
                    {activeCard.memoryTip}
                  </p>
                )}
              </div>

              {/* Card Footer Info */}
              <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-white/5 z-10">
                <span className="font-medium">Kart: {currentIndex + 1} / {currentDeck.length}</span>
                <span className="text-[10px] text-amber-400">
                  Kutu {srsData[activeCard?.id || '']?.box || 1}/5 📦
                </span>
                <span className="text-[11px] text-indigo-400">Dokun: Cevabı Gör</span>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Completion Summary Deck */
          <div className="w-full max-w-md rounded-3xl glass-panel p-8 text-center space-y-5 border border-white/10 shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-400 text-white shadow-xl">
              <Sparkles className="h-8 w-8 animate-bounce" />
            </div>
            <h3 className="font-display text-2xl font-extrabold text-white">
              Tebrikler! Deste Tamamlandı 🎉
            </h3>
            <p className="text-xs text-gray-300">
              Seçilen derse ait tüm kartları incelediniz! Bilemediğiniz kartlar aralıklı tekrar algoritması ile yarın tekrar karşınıza çıkacak.
            </p>

            <div className="grid grid-cols-2 gap-3 py-2">
              <div className="rounded-2xl bg-emerald-950/30 p-3 border border-emerald-500/30">
                <p className="text-xs text-emerald-400 font-bold">Öğrenilen Kartlar</p>
                <p className="font-display text-2xl font-black text-white mt-1">{knownCards.length}</p>
              </div>
              <div className="rounded-2xl bg-rose-950/30 p-3 border border-rose-500/30">
                <p className="text-xs text-rose-400 font-bold">Tekrar Edilecek</p>
                <p className="font-display text-2xl font-black text-white mt-1">{reviewCards.length}</p>
              </div>
            </div>

            <p className="text-[10px] text-gray-400">
              Bilemedim dediğin kartlar 1 gün sonra, bildiğin kartlar 3-7 gün sonra tekrar karşına çıkacak.
            </p>

            <button
              onClick={resetDeck}
              className="w-full rounded-xl glass-button py-3 text-xs font-bold text-white shadow-lg flex items-center justify-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Kartları Yeniden Başlat</span>
            </button>
          </div>
        )}

        {/* Action Controls */}
        {activeCard && currentIndex < currentDeck.length && (
          <div className="mt-8 flex items-center justify-center space-x-6">
            <button
              onClick={handleSwipeLeft}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-600/30 hover:bg-rose-600/50 text-rose-400 border border-rose-500/40 shadow-xl transition-transform active:scale-95"
              title="Bilemedim (Sola Kaydır)"
            >
              <X className="h-7 w-7" />
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex h-12 w-12 items-center justify-center rounded-full glass-card text-indigo-400 border border-indigo-500/30 shadow-lg hover:text-white"
              title="Kartı Çevir"
            >
              <RotateCw className="h-5 w-5" />
            </button>

            <button
              onClick={handleSwipeRight}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-400 border border-emerald-500/40 shadow-xl transition-transform active:scale-95"
              title="Bildim (Sağa Kaydır)"
            >
              <Check className="h-7 w-7" />
            </button>
          </div>
        )}
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl w-80 space-y-4">
            <h3 className="font-display font-bold text-white text-base">⚠️ Bu Kartı Bildir</h3>
            <p className="text-xs text-gray-400">Bu kart hakkında bir sorun mu var?</p>
            <div className="space-y-2">
              {["❌ Yanlış bilgi içeriyor", "📝 Eksik/yetersiz açıklama", "🏷️ Yanlış konu etiketli"].map((reason) => (
                <button
                  key={reason}
                  onClick={() => setReportReason(reason)}
                  className={`w-full text-left rounded-xl px-4 py-2.5 text-xs font-semibold border transition-all ${
                    reportReason === reason
                      ? "bg-red-500/20 border-red-500/40 text-red-300"
                      : "glass-card border-white/10 text-gray-300 hover:text-white"
                  }`}
                >
                  {reason}
                </button>
              ))}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  if (!reportReason) return;
                  const reports = JSON.parse(localStorage.getItem('asimptot_card_reports_v1') || '[]');
                  reports.push({ cardId: activeCard?.id, reason: reportReason, date: new Date().toISOString() });
                  localStorage.setItem('asimptot_card_reports_v1', JSON.stringify(reports));
                  setShowReportModal(false);
                  setReportReason('');
                }}
                disabled={!reportReason}
                className="flex-1 rounded-xl glass-button py-2.5 text-xs font-bold text-white disabled:opacity-40"
              >
                Gönder
              </button>
              <button
                onClick={() => { setShowReportModal(false); setReportReason(''); }}
                className="flex-1 rounded-xl glass-card border border-white/10 py-2.5 text-xs font-semibold text-gray-300"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
