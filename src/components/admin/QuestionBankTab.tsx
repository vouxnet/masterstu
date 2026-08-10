"use client";

import React, { useState } from "react";
import { useAdminStore } from "@/src/lib/store/useAdminStore";
import { ExamPack } from "@/src/lib/data/examPacks";
import { DuelQuestion } from "@/src/lib/data/duelQuestions";
import { BookOpen, Plus, Edit3, Trash2, CheckCircle2, Search, X, HelpCircle, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const QuestionBankTab: React.FC = () => {
  const {
    customExamPacks,
    addExamPack,
    updateExamPack,
    deleteExamPack,
    updateQuestionInPack,
    addQuestionToPack,
    deleteQuestionFromPack,
  } = useAdminStore();

  const [selectedPackId, setSelectedPackId] = useState<string>(customExamPacks[0]?.id || "");
  const [searchQuestion, setSearchQuestion] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");

  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<DuelQuestion | null>(null);

  // Form States for Question
  const [qSubject, setQSubject] = useState("Türkçe");
  const [qText, setQText] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [optionE, setOptionE] = useState("");
  const [correctIndex, setCorrectIndex] = useState(0);
  const [explanation, setExplanation] = useState("");

  const activePack = customExamPacks.find((p) => p.id === selectedPackId) || customExamPacks[0];

  const filteredQuestions = activePack?.questions.filter((q) => {
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuestion.toLowerCase()) ||
      (q.explanation && q.explanation.toLowerCase().includes(searchQuestion.toLowerCase()));
    const matchesSubject = subjectFilter === "all" || q.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  }) || [];

  const handleOpenAddQuestion = () => {
    setEditingQuestion(null);
    setQSubject("Türkçe");
    setQText("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setOptionE("");
    setCorrectIndex(0);
    setExplanation("");
    setIsQuestionModalOpen(true);
  };

  const handleOpenEditQuestion = (q: DuelQuestion) => {
    setEditingQuestion(q);
    setQSubject(q.subject || "Türkçe");
    setQText(q.question);
    setOptionA(q.options[0] || "");
    setOptionB(q.options[1] || "");
    setOptionC(q.options[2] || "");
    setOptionD(q.options[3] || "");
    setOptionE(q.options[4] || "");
    setCorrectIndex(q.correctIndex);
    setExplanation(q.explanation || "");
    setIsQuestionModalOpen(true);
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    const options = [optionA, optionB, optionC, optionD, optionE];

    if (editingQuestion) {
      updateQuestionInPack(activePack.id, editingQuestion.id, {
        subject: qSubject,
        question: qText,
        options,
        correctIndex,
        explanation,
      });
    } else {
      const newId = `q-custom-${Date.now()}`;
      const newQ: DuelQuestion = {
        id: newId,
        subject: qSubject,
        question: qText,
        options,
        correctIndex,
        explanation,
        examType: activePack.examType,
      };
      addQuestionToPack(activePack.id, newQ);
    }
    setIsQuestionModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Pack Selector & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl glass-card p-4 border border-white/10">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/30 text-purple-400 border border-purple-500/30">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-base">Sınav & 120 Soru Bankası Yönetimi</h3>
            <p className="text-xs text-gray-400">Deneme kitapçıklarını, soru metinlerini, 5 seçeneği ve çözümleri anlık düzenleyin.</p>
          </div>
        </div>

        {/* Pack Selector */}
        <div className="flex items-center space-x-3">
          <select
            value={selectedPackId}
            onChange={(e) => setSelectedPackId(e.target.value)}
            className="rounded-xl bg-black/50 px-3.5 py-2 text-xs font-bold text-white border border-indigo-500/30 focus:border-indigo-500 focus:outline-none"
          >
            {customExamPacks.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} ({p.questions.length} Soru)
              </option>
            ))}
          </select>

          <button
            onClick={handleOpenAddQuestion}
            className="flex items-center space-x-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white px-3.5 py-2 text-xs font-bold shadow-lg shadow-purple-600/30 transition-all active:scale-95 whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            <span>Yeni Soru Ekle</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-black/40 p-3 border border-white/10 text-xs">
        <div className="flex items-center space-x-2">
          <span className="text-gray-400 font-semibold">Ders Filtresi:</span>
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="rounded-lg bg-gray-900 px-3 py-1.5 text-white border border-white/10"
          >
            <option value="all">Tüm Dersler</option>
            <option value="Türkçe">Türkçe</option>
            <option value="Matematik">Matematik</option>
            <option value="Tarih">Tarih</option>
            <option value="Coğrafya">Coğrafya</option>
            <option value="Vatandaşlık">Vatandaşlık</option>
            <option value="Güncel Bilgiler">Güncel Bilgiler</option>
          </select>
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-gray-500" />
          <input
            type="text"
            placeholder="Soru metninde veya çözümde ara..."
            value={searchQuestion}
            onChange={(e) => setSearchQuestion(e.target.value)}
            className="w-full rounded-lg bg-gray-900 pl-8 pr-3 py-1.5 text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:outline-none text-xs"
          />
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="rounded-2xl glass-panel p-5 border border-white/10 shadow-lg space-y-3 relative hover:border-indigo-500/30 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <span className="rounded-md bg-indigo-500/20 px-2.5 py-1 text-[11px] font-bold text-indigo-300 border border-indigo-500/30">
                    Soru #{idx + 1}
                  </span>
                  <span className="rounded-md bg-amber-500/20 px-2.5 py-1 text-[11px] font-bold text-amber-300 border border-amber-500/30">
                    {q.subject}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOpenEditQuestion(q)}
                    className="rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 p-1.5 border border-indigo-500/20 transition-transform active:scale-95"
                    title="Soruyu Düzenle"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Bu soruyu silmek istediğinize emin misiniz?")) {
                        deleteQuestionFromPack(activePack.id, q.id);
                      }
                    }}
                    className="rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 p-1.5 border border-rose-500/20 transition-transform active:scale-95"
                    title="Soruyu Sil"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <p className="text-sm font-semibold text-white leading-relaxed">{q.question}</p>

              {/* 5 Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                {q.options.map((opt, oIdx) => {
                  const isCorrect = oIdx === q.correctIndex;
                  const optionLabel = String.fromCharCode(65 + oIdx);
                  return (
                    <div
                      key={oIdx}
                      className={`p-2.5 rounded-xl border flex items-center justify-between ${
                        isCorrect
                          ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-bold"
                          : "bg-black/30 border-white/5 text-gray-300"
                      }`}
                    >
                      <span>
                        <strong className="mr-1">{optionLabel})</strong> {opt}
                      </span>
                      {isCorrect && <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />}
                    </div>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {q.explanation && (
                <div className="mt-2 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 flex items-start gap-2">
                  <span className="text-indigo-400 mt-0.5">💡</span>
                  <div>
                    <span className="font-bold text-indigo-200">Çözüm Açıklaması: </span>
                    <span>{q.explanation}</span>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-gray-400 glass-panel rounded-2xl border border-white/10">
            Filtreleme kriterlerine uygun soru bulunamadı.
          </div>
        )}
      </div>

      {/* Question Edit / Add Modal */}
      <AnimatePresence>
        {isQuestionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl space-y-4 my-8 max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 sticky top-0 bg-gray-950/80 backdrop-blur-md z-10 pt-1">
                <h3 className="font-display font-bold text-white text-base">
                  {editingQuestion ? "Soruyu Düzenle" : "Yeni Soru Ekle"} ({activePack?.title})
                </h3>
                <button onClick={() => setIsQuestionModalOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Ders Kapsamı</label>
                    <select
                      value={qSubject}
                      onChange={(e) => setQSubject(e.target.value)}
                      className="w-full rounded-xl bg-black/50 px-3.5 py-2.5 text-white border border-white/10 focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="Türkçe">Türkçe</option>
                      <option value="Matematik">Matematik & Geometri</option>
                      <option value="Tarih">Tarih</option>
                      <option value="Coğrafya">Coğrafya</option>
                      <option value="Vatandaşlık">Vatandaşlık</option>
                      <option value="Güncel Bilgiler">Güncel Bilgiler</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Doğru Seçenek (Cevap)</label>
                    <select
                      value={correctIndex}
                      onChange={(e) => setCorrectIndex(Number(e.target.value))}
                      className="w-full rounded-xl bg-black/50 px-3.5 py-2.5 text-emerald-400 font-bold border border-emerald-500/40 focus:outline-none"
                    >
                      <option value={0}>A Şıkkı</option>
                      <option value={1}>B Şıkkı</option>
                      <option value={2}>C Şıkkı</option>
                      <option value={3}>D Şıkkı</option>
                      <option value={4}>E Şıkkı</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Soru Metni / Paragraf</label>
                  <textarea
                    required
                    rows={4}
                    value={qText}
                    onChange={(e) => setQText(e.target.value)}
                    placeholder="Soru kökünü ve paragrafını yazınız..."
                    className="w-full rounded-xl bg-black/50 px-3.5 py-2.5 text-white border border-white/10 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                {/* 5 Options Form */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <label className="block text-gray-300 font-semibold">5 Seçenek (Şıklar)</label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="A Şıkkı..."
                      value={optionA}
                      onChange={(e) => setOptionA(e.target.value)}
                      className="rounded-xl bg-black/50 px-3 py-2 text-white border border-white/10"
                    />
                    <input
                      type="text"
                      required
                      placeholder="B Şıkkı..."
                      value={optionB}
                      onChange={(e) => setOptionB(e.target.value)}
                      className="rounded-xl bg-black/50 px-3 py-2 text-white border border-white/10"
                    />
                    <input
                      type="text"
                      required
                      placeholder="C Şıkkı..."
                      value={optionC}
                      onChange={(e) => setOptionC(e.target.value)}
                      className="rounded-xl bg-black/50 px-3 py-2 text-white border border-white/10"
                    />
                    <input
                      type="text"
                      required
                      placeholder="D Şıkkı..."
                      value={optionD}
                      onChange={(e) => setOptionD(e.target.value)}
                      className="rounded-xl bg-black/50 px-3 py-2 text-white border border-white/10"
                    />
                    <input
                      type="text"
                      required
                      placeholder="E Şıkkı..."
                      value={optionE}
                      onChange={(e) => setOptionE(e.target.value)}
                      className="rounded-xl bg-black/50 px-3 py-2 text-white border border-white/10 sm:col-span-2"
                    />
                  </div>
                </div>

                {/* Solution Explanation */}
                <div className="pt-2 border-t border-white/10">
                  <label className="block text-indigo-300 font-semibold mb-1">💡 Detaylı Çözüm Açıklaması (Kanun / Kaynak Atıflı)</label>
                  <textarea
                    rows={3}
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    placeholder="Örn: Doğru cevap B şıkkıdır çünkü Anayasa Md. 146'ya göre..."
                    className="w-full rounded-xl bg-indigo-950/40 px-3.5 py-2.5 text-indigo-200 border border-indigo-500/30 focus:border-indigo-400 focus:outline-none"
                  />
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsQuestionModalOpen(false)}
                    className="rounded-xl px-4 py-2.5 text-gray-400 hover:text-white font-bold"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 font-bold shadow-lg shadow-purple-600/30"
                  >
                    {editingQuestion ? "Değişiklikleri Kaydet" : "Soruyu Kaydet"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
