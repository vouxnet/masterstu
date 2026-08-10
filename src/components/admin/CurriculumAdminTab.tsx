"use client";

import React, { useState } from "react";
import { useAdminStore } from "@/src/lib/store/useAdminStore";
import { BarChart3, Plus, Edit3, Trash2, BookOpen } from "lucide-react";

export const CurriculumAdminTab: React.FC = () => {
  const { customDistributions, addDistributionRecord, deleteDistributionRecord } = useAdminStore();

  const [examType, setExamType] = useState<"kpss_lisans" | "kpss_onlisans">("kpss_lisans");
  const [subject, setSubject] = useState("Türkçe");
  const [topic, setTopic] = useState("");
  const [questionCount, setQuestionCount] = useState(3);
  const [importance, setImportance] = useState<"high" | "medium" | "low">("high");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    addDistributionRecord({
      examType,
      subject,
      topic,
      questionCount,
      importance,
    });
    setTopic("");
    setQuestionCount(3);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 rounded-2xl glass-card p-4 border border-white/10">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600/30 text-amber-400 border border-amber-500/30">
          <BarChart3 className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display font-bold text-white text-base">Müfredat & Soru Dağılımları Yönetimi</h3>
          <p className="text-xs text-gray-400">KPSS Lisans ve Önlisans konu ağırlıklarını ve soru sayılarını düzenleyin.</p>
        </div>
      </div>

      {/* Form & Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Record Form */}
        <div className="lg:col-span-1 rounded-2xl glass-panel p-5 border border-white/10 space-y-4">
          <h4 className="font-display font-bold text-white text-sm flex items-center gap-2">
            <Plus className="h-4 w-4 text-amber-400" />
            <span>Yeni Konu Dağılımı Ekle</span>
          </h4>

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Sınav Türü</label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value as any)}
                className="w-full rounded-xl bg-black/50 px-3 py-2 text-white border border-white/10"
              >
                <option value="kpss_lisans">KPSS Lisans</option>
                <option value="kpss_onlisans">KPSS Önlisans</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Ders Başlığı</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-xl bg-black/50 px-3 py-2 text-white border border-white/10"
              >
                <option value="Türkçe">Türkçe</option>
                <option value="Matematik & Geometri">Matematik & Geometri</option>
                <option value="Tarih">Tarih</option>
                <option value="Coğrafya">Coğrafya</option>
                <option value="Vatandaşlık">Vatandaşlık</option>
                <option value="Güncel Bilgiler">Güncel Bilgiler</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Konu Başlığı</label>
              <input
                type="text"
                required
                placeholder="Örn: Paragrafta Anlam"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full rounded-xl bg-black/50 px-3 py-2 text-white border border-white/10"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Ortalama Soru</label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  required
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full rounded-xl bg-black/50 px-3 py-2 text-white border border-white/10"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Önem Derecesi</label>
                <select
                  value={importance}
                  onChange={(e) => setImportance(e.target.value as any)}
                  className="w-full rounded-xl bg-black/50 px-3 py-2 text-white border border-white/10"
                >
                  <option value="high">Yüksek (Kritik)</option>
                  <option value="medium">Orta</option>
                  <option value="low">Düşük</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-amber-600 hover:bg-amber-500 text-white py-2.5 font-bold shadow-lg shadow-amber-600/30 transition-all active:scale-95"
            >
              Konu Ekle
            </button>
          </form>
        </div>

        {/* Table of Custom Distributions */}
        <div className="lg:col-span-2 rounded-2xl glass-panel p-5 border border-white/10 shadow-xl space-y-3">
          <h4 className="font-display font-bold text-white text-sm">Eklenen Konu Dağılımları ({customDistributions.length})</h4>

          {customDistributions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-white/5 uppercase text-[10px] text-gray-400 border-b border-white/10 font-mono">
                  <tr>
                    <th className="px-4 py-2.5">Sınav</th>
                    <th className="px-4 py-2.5">Ders / Konu</th>
                    <th className="px-4 py-2.5">Soru Sayısı</th>
                    <th className="px-4 py-2.5">Önem</th>
                    <th className="px-4 py-2.5 text-right">Sil</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {customDistributions.map((d) => (
                    <tr key={d.id} className="hover:bg-white/5">
                      <td className="px-4 py-3 font-mono font-bold text-indigo-300">
                        {d.examType === "kpss_lisans" ? "Lisans" : "Önlisans"}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-bold text-white">{d.subject}</p>
                        <p className="text-[11px] text-gray-400">{d.topic}</p>
                      </td>
                      <td className="px-4 py-3 font-bold text-amber-400">{d.questionCount} Soru</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            d.importance === "high"
                              ? "bg-rose-500/20 text-rose-300"
                              : d.importance === "medium"
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-emerald-500/20 text-emerald-300"
                          }`}
                        >
                          {d.importance.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => deleteDistributionRecord(d.id)}
                          className="text-rose-400 hover:text-rose-300 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-xs text-gray-400 py-6 text-center">
              Henüz özel konu dağılımı eklenmedi. Sol taraftaki formu kullanarak ekleyebilirsiniz.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
