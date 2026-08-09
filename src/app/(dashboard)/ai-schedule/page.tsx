"use client";

import React, { useState, useEffect } from "react";
import { useAuthStore, EXAM_METADATA } from "@/src/lib/store/useAuthStore";
import { useLeagueStore } from "@/src/lib/store/useLeagueStore";
import { Sparkles, Calendar as CalendarIcon, Clock, Target, Plus, Trash2, Edit3, CheckCircle2, Circle, Save, RotateCcw, Zap, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export interface StudyBlock {
  id: string;
  course: string;
  topicNote: string;
  targetQuestions: number;
  completed: boolean;
}

export interface DaySchedule {
  dayName: string;
  blocks: StudyBlock[];
}

const PRESET_PROGRAMS: Record<string, { title: string; desc: string; days: DaySchedule[] }> = {
  onlisans_derece: {
    title: "🎯 Önlisans Derece Programı (Önerilen)",
    desc: "ÖSYM Önlisans müfredatındaki 5 temel ders ve haftalık deneme sınavı ile derece odaklı çalışma.",
    days: [
      {
        dayName: "Pazartesi",
        blocks: [
          { id: "b1", course: "Türkçe", topicNote: "Paragraf Hız ve Anlam Çalışması", targetQuestions: 40, completed: false },
          { id: "b2", course: "Matematik", topicNote: "Temel Kavramlar & Sayılar", targetQuestions: 30, completed: false },
        ]
      },
      {
        dayName: "Salı",
        blocks: [
          { id: "b3", course: "Tarih", topicNote: "İslamiyet Öncesi Türk Tarihi & İlk Devletler", targetQuestions: 35, completed: false },
          { id: "b4", course: "Coğrafya", topicNote: "Türkiye'nin Coğrafi Konumu ve Yer Şekilleri", targetQuestions: 30, completed: false },
        ]
      },
      {
        dayName: "Çarşamba",
        blocks: [
          { id: "b5", course: "Matematik", topicNote: "Rasyonel Sayılar & Basit Eşitsizlikler", targetQuestions: 40, completed: false },
          { id: "b6", course: "Vatandaşlık", topicNote: "Anayasa Hukuku Temel Esaslar", targetQuestions: 30, completed: false },
        ]
      },
      {
        dayName: "Perşembe",
        blocks: [
          { id: "b7", course: "Türkçe", topicNote: "Dil Bilgisi (Sözcük Türleri & Yazım)", targetQuestions: 35, completed: false },
          { id: "b8", course: "Tarih", topicNote: "Osmanlı Devleti Kuruluş ve Yükselme", targetQuestions: 40, completed: false },
        ]
      },
      {
        dayName: "Cuma",
        blocks: [
          { id: "b9", course: "Coğrafya", topicNote: "İklim ve Bitki Örtüsü", targetQuestions: 30, completed: false },
          { id: "b10", course: "Vatandaşlık", topicNote: "Temel Hak ve Hürriyetler (1982 Anayasası)", targetQuestions: 30, completed: false },
        ]
      },
      {
        dayName: "Cumartesi",
        blocks: [
          { id: "b11", course: "Genel Deneme", topicNote: "120 Soruluk ÖSYM Önlisans Deneme Sınavı", targetQuestions: 120, completed: false },
          { id: "b12", course: "Yanlış Kutusunu İncele", topicNote: "Deneme Yanlışlarını Fotoğraflayıp Kaydet", targetQuestions: 0, completed: false },
        ]
      },
      {
        dayName: "Pazar",
        blocks: [
          { id: "b13", course: "Haftalık Tekrar & Mola", topicNote: "Zayıf Konulardan Flashcard Kartları Tekrar Et", targetQuestions: 25, completed: false },
        ]
      }
    ]
  },
  calisanlar_aksam: {
    title: "🌙 Çalışanlar İçin Yoğunlaştırılmış Akşam Programı",
    desc: "İş veya okul sonrası günde 2-3 saatlik maksimum verim odaklı hızlı tekrar ve soru temposu.",
    days: [
      { dayName: "Pazartesi", blocks: [{ id: "c1", course: "Türkçe", topicNote: "30 Paragraf Sorusu + 20 Dil Bilgisi", targetQuestions: 50, completed: false }] },
      { dayName: "Salı", blocks: [{ id: "c2", course: "Matematik", topicNote: "Problemler & Sayısal Mantık", targetQuestions: 40, completed: false }] },
      { dayName: "Çarşamba", blocks: [{ id: "c3", course: "Tarih", topicNote: "İnkılap Tarihi ve Atatürk İlkeleri", targetQuestions: 45, completed: false }] },
      { dayName: "Perşembe", blocks: [{ id: "c4", course: "Coğrafya", topicNote: "Türkiye Madenler ve Enerji Kaynakları", targetQuestions: 35, completed: false }] },
      { dayName: "Cuma", blocks: [{ id: "c5", course: "Vatandaşlık", topicNote: "İdare Hukuku & Anayasa Değişiklikleri", targetQuestions: 35, completed: false }] },
      { dayName: "Cumartesi", blocks: [{ id: "c6", course: "Genel Deneme", topicNote: "Önlisans Branş Veya Genel Deneme", targetQuestions: 120, completed: false }] },
      { dayName: "Pazar", blocks: [{ id: "c7", course: "Haftalık Tekrar", topicNote: "Hafta Boyunca Yapılamayan Sorulara Bak", targetQuestions: 30, completed: false }] }
    ]
  }
};

export default function AiSchedulePage() {
  const { currentUser } = useAuthStore();
  const { addXP } = useLeagueStore();

  const activeExam = currentUser.activeExam || "kpss_lisans";

  const getCoursesForExam = (exam: string) => {
    switch (exam) {
      case "kpss_onlisans":
        return ["Türkçe", "Matematik", "Tarih", "Coğrafya", "Vatandaşlık", "Genel Deneme", "Mola & Tekrar"];
      case "kpss_ortaogretim":
        return ["Türkçe", "Matematik", "Tarih", "Coğrafya", "Vatandaşlık", "Güncel Bilgiler", "Genel Deneme"];
      case "yds":
        return ["İngilizce Gramer", "Kelime Bilgisi", "Paragraf Okuma", "Deneme"];
      case "ales":
        return ["Sayısal Mantık", "Sözel Mantık", "Matematik", "Türkçe"];
      case "kpss_lisans":
      default:
        return ["Türkçe", "Matematik", "Tarih", "Coğrafya", "Vatandaşlık", "Hukuk", "İktisat", "Maliye", "Genel Deneme"];
    }
  };

  const availableCourses = getCoursesForExam(activeExam);

  const [schedule, setSchedule] = useState<DaySchedule[]>(PRESET_PROGRAMS.onlisans_derece.days);
  const [editingBlock, setEditingBlock] = useState<{ dayIndex: number; blockIndex: number; block: StudyBlock } | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem(`asimptot_custom_schedule_${activeExam}`);
    if (saved) {
      try {
        setSchedule(JSON.parse(saved));
      } catch (e) {
        setSchedule(PRESET_PROGRAMS.onlisans_derece.days);
      }
    } else {
      setSchedule(PRESET_PROGRAMS.onlisans_derece.days);
    }
  }, [activeExam]);

  const saveSchedule = (newSchedule: DaySchedule[]) => {
    setSchedule(newSchedule);
    localStorage.setItem(`asimptot_custom_schedule_${activeExam}`, JSON.stringify(newSchedule));
  };

  const loadPreset = (presetKey: string) => {
    const preset = PRESET_PROGRAMS[presetKey];
    if (preset) {
      saveSchedule(preset.days);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#10B981", "#6366F1", "#F59E0B"]
      });
    }
  };

  const toggleBlockCompleted = (dayIdx: number, blockIdx: number) => {
    const updated = schedule.map((d, dI) => {
      if (dI !== dayIdx) return d;
      return {
        ...d,
        blocks: d.blocks.map((b, bI) => {
          if (bI !== blockIdx) return b;
          const nextState = !b.completed;
          if (nextState) addXP(15);
          return { ...b, completed: nextState };
        })
      };
    });
    saveSchedule(updated);
  };

  const handleAddBlock = (dayIdx: number) => {
    const updated = schedule.map((d, dI) => {
      if (dI !== dayIdx) return d;
      const newBlock: StudyBlock = {
        id: `b-${Date.now()}`,
        course: availableCourses[0],
        topicNote: "Konu tekrarı ve test çözümü",
        targetQuestions: 30,
        completed: false
      };
      return { ...d, blocks: [...d.blocks, newBlock] };
    });
    saveSchedule(updated);
  };

  const handleDeleteBlock = (dayIdx: number, blockIdx: number) => {
    const updated = schedule.map((d, dI) => {
      if (dI !== dayIdx) return d;
      return {
        ...d,
        blocks: d.blocks.filter((_, bI) => bI !== blockIdx)
      };
    });
    saveSchedule(updated);
  };

  const handleSaveEditedBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlock) return;

    const { dayIndex, blockIndex, block } = editingBlock;
    const updated = schedule.map((d, dI) => {
      if (dI !== dayIndex) return d;
      return {
        ...d,
        blocks: d.blocks.map((b, bI) => (bI === blockIndex ? block : b))
      };
    });

    saveSchedule(updated);
    setEditingBlock(null);
  };

  const totalBlocks = schedule.reduce((acc, d) => acc + d.blocks.length, 0);
  const completedBlocks = schedule.reduce((acc, d) => acc + d.blocks.filter(b => b.completed).length, 0);

  if (!isClient) return null;

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
              {EXAM_METADATA[activeExam]?.title || "KPSS"} Programı
            </span>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
              Özel Çalışma Takvimi 🗓️
            </span>
          </div>
          <h1 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">
            Haftalık Ders Çalışma Takvimi
          </h1>
          <p className="text-xs text-gray-300 mt-1">
            Örnek programlardan birini seçin veya günlere kendi derslerinizi ve hedeflerinizi dilediğiniz gibi yerleştirin!
          </p>
        </div>

        {/* Overall Progress Widget */}
        <div className="rounded-2xl glass-card p-4 border border-emerald-500/30 bg-emerald-950/20 flex items-center space-x-3 flex-shrink-0">
          <Zap className="w-6 h-6 text-emerald-400" />
          <div>
            <p className="text-[10px] uppercase font-bold text-emerald-300">Haftalık Tamamlama</p>
            <p className="font-display font-black text-white text-base">
              {completedBlocks} / {totalBlocks} Ders Bloğu ({totalBlocks > 0 ? Math.round((completedBlocks / totalBlocks) * 100) : 0}%)
            </p>
          </div>
        </div>
      </div>

      {/* Preset Selector Buttons */}
      <div className="rounded-3xl glass-panel p-5 border border-white/10 shadow-xl space-y-3">
        <h3 className="font-display text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          <span>Hazır Örnek Program Yükle:</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(PRESET_PROGRAMS).map(([key, p]) => (
            <button
              key={key}
              onClick={() => loadPreset(key)}
              className="text-left p-3.5 rounded-2xl glass-card border border-white/5 hover:border-indigo-500/40 hover:bg-indigo-500/10 transition-all group"
            >
              <h4 className="font-bold text-white text-xs sm:text-sm group-hover:text-indigo-300">
                {p.title}
              </h4>
              <p className="text-[11px] text-gray-400 mt-1">{p.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 7-Day Grid Schedule */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3.5">
        {schedule.map((day, dIdx) => (
          <div
            key={day.dayName}
            className="rounded-3xl glass-panel p-4 border border-white/10 shadow-xl flex flex-col justify-between space-y-3 bg-black/40"
          >
            <div>
              {/* Day Title */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                <h3 className="font-display font-black text-white text-sm tracking-tight">
                  {day.dayName}
                </h3>
                <button
                  onClick={() => handleAddBlock(dIdx)}
                  className="rounded-lg bg-indigo-600/30 hover:bg-indigo-600/60 text-indigo-300 p-1 text-[10px] font-bold border border-indigo-500/30 flex items-center space-x-1"
                  title="Bu Güne Yeni Ders Bloğu Ekle"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ders Ekle</span>
                </button>
              </div>

              {/* Study Blocks for this day */}
              <div className="space-y-2.5">
                {day.blocks.length > 0 ? (
                  day.blocks.map((block, bIdx) => (
                    <div
                      key={block.id}
                      className={`p-3 rounded-2xl border transition-all relative group ${
                        block.completed
                          ? "bg-emerald-950/40 border-emerald-500/30"
                          : "bg-white/5 border-white/10 hover:border-indigo-500/40"
                      }`}
                    >
                      {/* Top Bar: Checkbox + Course Name + Action Buttons */}
                      <div className="flex items-center justify-between mb-1.5">
                        <div
                          onClick={() => toggleBlockCompleted(dIdx, bIdx)}
                          className="flex items-center space-x-2 cursor-pointer flex-1 min-w-0"
                        >
                          {block.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-500 hover:text-indigo-400 flex-shrink-0" />
                          )}
                          <span
                            className={`font-bold text-xs truncate ${
                              block.completed ? "text-emerald-300 line-through opacity-70" : "text-white"
                            }`}
                          >
                            {block.course}
                          </span>
                        </div>

                        {/* Edit & Delete Action Buttons */}
                        <div className="flex items-center space-x-1 opacity-80 group-hover:opacity-100 transition-opacity ml-1">
                          <button
                            onClick={() => setEditingBlock({ dayIndex: dIdx, blockIndex: bIdx, block: { ...block } })}
                            className="p-1 rounded-md text-gray-400 hover:text-indigo-300 hover:bg-white/10"
                            title="Düzenle"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlock(dIdx, bIdx)}
                            className="p-1 rounded-md text-gray-400 hover:text-rose-400 hover:bg-rose-500/10"
                            title="Sil"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Topic Note */}
                      <p className="text-[11px] text-gray-300 leading-snug font-medium pl-6">
                        {block.topicNote}
                      </p>

                      {/* Target Questions Badge */}
                      {block.targetQuestions > 0 && (
                        <div className="mt-2 pl-6">
                          <span className="text-[9px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                            🎯 {block.targetQuestions} Soru Hedefi
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-[11px] text-gray-500 text-center py-4 italic">
                    Ders eklenmedi. 'Ders Ekle' butonuna basarak ekleyin.
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT BLOCK MODAL */}
      <AnimatePresence>
        {editingBlock && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md rounded-3xl glass-panel p-6 border border-white/20 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h4 className="font-display text-sm font-bold text-white">
                  Ders Bloğunu Düzenle
                </h4>
                <button
                  onClick={() => setEditingBlock(null)}
                  className="rounded-xl glass-card p-1 text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveEditedBlock} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Ders Seçin</label>
                  <select
                    value={editingBlock.block.course}
                    onChange={(e) => setEditingBlock({
                      ...editingBlock,
                      block: { ...editingBlock.block, course: e.target.value }
                    })}
                    className="w-full rounded-xl bg-gray-900/90 px-3.5 py-2 text-xs text-white border border-white/10 focus:border-indigo-500 focus:outline-none font-bold"
                  >
                    {availableCourses.map((c) => (
                      <option key={c} value={c} className="bg-gray-900 text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Çalışılacak Konu / Not</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Paragrafta Ana Düşünce ve Yapı"
                    value={editingBlock.block.topicNote}
                    onChange={(e) => setEditingBlock({
                      ...editingBlock,
                      block: { ...editingBlock.block, topicNote: e.target.value }
                    })}
                    className="w-full rounded-xl bg-gray-900/90 px-3.5 py-2 text-xs text-white border border-white/10 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Hedef Soru Sayısı</label>
                  <input
                    type="number"
                    min={0}
                    max={500}
                    value={editingBlock.block.targetQuestions}
                    onChange={(e) => setEditingBlock({
                      ...editingBlock,
                      block: { ...editingBlock.block, targetQuestions: Number(e.target.value) }
                    })}
                    className="w-full rounded-xl bg-gray-900/90 px-3.5 py-2 text-xs text-white border border-white/10 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setEditingBlock(null)}
                    className="rounded-xl glass-card px-4 py-2 text-xs font-semibold text-gray-300"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl glass-button px-5 py-2 text-xs font-bold text-white shadow-lg flex items-center space-x-1"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Kaydet</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
