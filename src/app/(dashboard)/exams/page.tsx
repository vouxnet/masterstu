"use client";

import React, { useState } from "react";
import { useAuthStore, EXAM_METADATA } from "@/src/lib/store/useAuthStore";
import { useExamHistoryStore } from "@/src/lib/store/useExamHistoryStore";
import { useStudyLogStore } from "@/src/lib/store/useStudyLogStore";
import { Calculator, Save, Trash2, Trophy, ChevronDown, ChevronUp } from "lucide-react";

export default function ExamsPage() {
  const { currentUser } = useAuthStore();
  const { addResult, deleteResult, results } = useExamHistoryStore();
  const { addLog } = useStudyLogStore();

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

  // Net calculation: Correct - Wrong / 4
  const gyNet = Math.max(0, gyCorrect - gyWrong / 4);
  const gkNet = Math.max(0, gkCorrect - gkWrong / 4);
  const alanNet = Math.max(0, alanCorrect - alanWrong / 4);

  // Standard ÖSYM Estimate Formula:
  // P3 (Lisans): 40 + (GY_Net * 0.5) + (GK_Net * 0.45)
  // P93 (Önlisans): 38 + (GY_Net * 0.52) + (GK_Net * 0.48)
  // P37/P48 (A Grubu Alan): 30 + (GY_Net * 0.2) + (GK_Net * 0.2) + (Alan_Net * 0.6)
  const isLisans = currentUser.role === "lisans_alan";

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-3xl glass-panel p-6 border border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-bold text-purple-300 border border-purple-500/30">
              Net Takibi & ÖSYM Hesaplayıcı
            </span>
          </div>
          <h1 className="mt-2 font-display text-2xl font-extrabold text-white">
            Denemeler ve Tahmini Puan Hesaplama
          </h1>
          <p className="text-xs text-gray-300 mt-1">
            ÖSYM standart katsayıları ile P3 (Lisans), P93 (Önlisans) ve KPSS A Grubu Puan Hesaplama
          </p>
        </div>
      </div>

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
