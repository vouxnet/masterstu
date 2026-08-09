"use client";

import React, { useState, useEffect } from "react";
import { useAuthStore, EXAM_METADATA } from "@/src/lib/store/useAuthStore";
import { useCurriculumStore } from "@/src/lib/store/useCurriculumStore";
import { useStudyLogStore } from "@/src/lib/store/useStudyLogStore";
import { CurriculumTopic } from "@/src/lib/data/curriculumData";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Search,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CurriculumPage() {
  const { currentUser } = useAuthStore();
  const { topics, toggleTopicStatus, resetAllTopics, getTopicsForExam } = useCurriculumStore();
  const { addLog } = useStudyLogStore();

  const [selectedCourse, setSelectedCourse] = useState<string>("Tüm Dersler");
  const [statusFilter, setStatusFilter] = useState<"all" | "completed" | "studying" | "not_started">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openUnits, setOpenUnits] = useState<Record<string, boolean>>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="p-8 text-center text-gray-400">Yükleniyor...</div>;
  }

  const activeExam = currentUser.activeExam || "kpss_lisans";
  const activeExamMeta = EXAM_METADATA[activeExam];

  // Filter topics for active exam
  const userTopics = getTopicsForExam(activeExam);

  // Available courses list per active exam
  const coursesMap: Record<string, string[]> = {
    kpss_lisans: ["Tüm Dersler", "Hukuk", "İktisat", "Maliye", "Uluslararası İlişkiler", "Türkçe", "Matematik", "Tarih", "Coğrafya", "Vatandaşlık"],
    kpss_onlisans: ["Tüm Dersler", "Türkçe", "Matematik", "Tarih", "Coğrafya", "Vatandaşlık"],
    kpss_ortaogretim: ["Tüm Dersler", "Türkçe", "Matematik", "Tarih"],
    yds: ["Tüm Dersler", "Gramer", "Kelime Bilgisi", "Paragraf"],
    ales: ["Tüm Dersler", "Sayısal Mantık", "Sözel Mantık"],
  };

  const courses = coursesMap[activeExam] || coursesMap.kpss_lisans;

  // Filter topics
  const filteredTopics = userTopics.filter((item) => {
    const matchesCourse = selectedCourse === "Tüm Dersler" || item.course === selectedCourse;
    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "completed"
        ? item.status === "solved"
        : statusFilter === "studying"
        ? item.status === "studying"
        : item.status === "not_started" || item.status === "review";
    const matchesSearch =
      item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.course.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCourse && matchesStatus && matchesSearch;
  });

  // Group filtered topics by Unit
  const groupedByUnit = filteredTopics.reduce((acc, topic) => {
    const key = `${topic.course} • ${topic.unit}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(topic);
    return acc;
  }, {} as Record<string, CurriculumTopic[]>);

  const toggleUnit = (unitKey: string) => {
    setOpenUnits((prev) => ({
      ...prev,
      [unitKey]: prev[unitKey] === undefined ? false : !prev[unitKey],
    }));
  };

  const completedCount = userTopics.filter((t) => t.status === "solved").length;
  const studyingCount = userTopics.filter((t) => t.status === "studying").length;
  const totalCount = userTopics.length || 1;
  const completionPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
              {activeExamMeta?.title || currentUser.name}
            </span>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
              %{completionPercentage} Tamamlandı
            </span>
          </div>
          <h1 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">
            ÖSYM Katlanabilir Akıllı Müfredat
          </h1>
          <p className="text-xs text-gray-300 mt-1">
            İşaretlediğin tüm ilerleme kalıcı olarak hafızaya (LocalStorage) kaydedilir!
          </p>
        </div>

        {/* Action Controls & Reset Button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => resetAllTopics(currentUser.role)}
            className="flex items-center space-x-2 rounded-2xl bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 px-4 py-3 text-xs font-bold border border-rose-500/30 transition-all active:scale-95"
            title="Tüm işaretlemeleri temizle ve sıfırla"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Tümünü Sıfırla (Temizle)</span>
          </button>

          {/* Progress Stats */}
          <div className="flex items-center space-x-3 glass-card p-3 rounded-2xl border border-white/10">
            <div className="text-center">
              <p className="text-[10px] text-gray-400 font-semibold uppercase">Tamamlanan</p>
              <p className="font-display text-xl font-bold text-emerald-400">{completedCount}</p>
            </div>
            <div className="h-7 w-px bg-white/10" />
            <div className="text-center">
              <p className="text-[10px] text-gray-400 font-semibold uppercase">Çalışılan</p>
              <p className="font-display text-xl font-bold text-amber-400">{studyingCount}</p>
            </div>
            <div className="h-7 w-px bg-white/10" />
            <div className="text-center">
              <p className="text-[10px] text-gray-400 font-semibold uppercase">Toplam</p>
              <p className="font-display text-xl font-bold text-white">{totalCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Search & Status Filter */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Konu, ünite veya ders adı ile hızlıca bul..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl bg-gray-900/90 pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:outline-none shadow-lg"
            />
          </div>

          {/* Status Filter Pills */}
          <div className="flex items-center space-x-1.5 rounded-2xl glass-card p-1.5 border border-white/10">
            <button
              onClick={() => setStatusFilter("all")}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                statusFilter === "all"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Tümü ({userTopics.length})
            </button>
            <button
              onClick={() => setStatusFilter("studying")}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                statusFilter === "studying"
                  ? "bg-amber-600 text-white shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Çalışılanlar ({studyingCount})
            </button>
            <button
              onClick={() => setStatusFilter("completed")}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                statusFilter === "completed"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Tamamlananlar ({completedCount})
            </button>
          </div>
        </div>

        {/* Course Filter Pills & Expand/Collapse All Buttons */}
        <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1">
          <div className="flex items-center space-x-2">
            {courses.map((course) => (
              <button
                key={course}
                onClick={() => setSelectedCourse(course)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedCourse === course
                    ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30"
                    : "glass-card text-gray-400 border-white/5 hover:text-white"
                }`}
              >
                {course}
              </button>
            ))}
          </div>

          {/* Expand / Collapse All Controls */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => {
                const nextState: Record<string, boolean> = {};
                Object.keys(groupedByUnit).forEach((k) => (nextState[k] = true));
                setOpenUnits(nextState);
              }}
              className="rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1.5 text-xs font-bold transition-all flex items-center space-x-1.5 whitespace-nowrap"
              title="Tüm Üniteleri Aç"
            >
              <span>📂 Tümünü Aç</span>
            </button>
            <button
              onClick={() => {
                const nextState: Record<string, boolean> = {};
                Object.keys(groupedByUnit).forEach((k) => (nextState[k] = false));
                setOpenUnits(nextState);
              }}
              className="rounded-xl bg-gray-500/10 hover:bg-gray-500/20 text-gray-300 border border-gray-500/30 px-3 py-1.5 text-xs font-bold transition-all flex items-center space-x-1.5 whitespace-nowrap"
              title="Tüm Üniteleri Kapat"
            >
              <span>📁 Tümünü Kapat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Accordion Group List */}
      <div className="space-y-4">
        {Object.keys(groupedByUnit).length > 0 ? (
          Object.entries(groupedByUnit).map(([unitKey, unitTopics]) => {
            const isOpen = openUnits[unitKey] !== false; // Open by default
            const unitDoneCount = unitTopics.filter((t) => t.status === "solved").length;
            const unitPercent = Math.round((unitDoneCount / unitTopics.length) * 100);

            return (
              <div
                key={unitKey}
                className="rounded-3xl glass-panel border border-white/10 shadow-xl overflow-hidden transition-all"
              >
                {/* Accordion Header */}
                <div
                  onClick={() => toggleUnit(unitKey)}
                  className="flex items-center justify-between p-4 sm:p-5 cursor-pointer bg-white/5 hover:bg-white/10 transition-colors border-b border-white/5"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300 font-display font-bold text-xs border border-indigo-500/30">
                      {unitPercent}%
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-white text-base sm:text-lg">
                        {unitKey}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {unitDoneCount} / {unitTopics.length} Konu Çözüldü
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="hidden sm:block w-24 h-2 rounded-full bg-gray-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400"
                        style={{ width: `${unitPercent}%` }}
                      />
                    </div>
                    <button className="flex h-8 w-8 items-center justify-center rounded-xl glass-card text-gray-400">
                      {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Accordion Body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="divide-y divide-white/5 p-3 space-y-2"
                    >
                      {unitTopics.map((topic) => (
                        <div
                          key={topic.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTopicStatus(topic.id, currentUser.id);
                            addLog({
                              activityType: "curriculum",
                              subject: topic.course || "",
                              durationMinutes: 0,
                              questionsCount: 0,
                              examType: currentUser.activeExam,
                              date: new Date().toISOString().split('T')[0],
                            });
                          }}
                          className="flex items-center justify-between rounded-2xl p-3.5 hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-white/10"
                        >
                          <div className="flex items-center space-x-3">
                            {topic.status === "solved" ? (
                              <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                            ) : topic.status === "studying" ? (
                              <Clock className="h-5 w-5 text-amber-400 flex-shrink-0 animate-pulse" />
                            ) : (
                              <Circle className="h-5 w-5 text-gray-600 flex-shrink-0" />
                            )}
                              <div>
                                <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                                  <h4 className="font-display font-bold text-white text-xs sm:text-sm">
                                    {topic.topic}
                                  </h4>
                                  {topic.osymFrequencyPercent !== undefined && (
                                    <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                                      %{topic.osymFrequencyPercent} Çıkma İhtimali
                                    </span>
                                  )}
                                  {topic.osymAnalysisNote && (
                                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                      {topic.osymAnalysisNote}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-gray-400 mt-0.5">
                                  ÖSYM Tahmini: ~{topic.questionWeight} Soru
                                </p>
                              </div>
                          </div>

                          <span
                            className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                              topic.status === "solved"
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : topic.status === "studying"
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                : "bg-gray-800 text-gray-400"
                            }`}
                          >
                            {topic.status === "solved"
                              ? "Çözüldü ✓"
                              : topic.status === "studying"
                              ? "Çalışılıyor ⏳"
                              : "Başlanmadı"}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 glass-panel rounded-3xl border border-white/10">
            <p className="text-sm text-gray-400 font-medium">Bu kriterde konu bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
}
