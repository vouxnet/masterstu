"use client";

import React, { useState } from "react";
import { useAdminStore } from "@/src/lib/store/useAdminStore";
import { Layers, Plus, Trash2, Edit3, Sparkles } from "lucide-react";

export const FlashcardsAdminTab: React.FC = () => {
  const { customFlashcards, addFlashcardRecord, deleteFlashcardRecord } = useAdminStore();

  const [subject, setSubject] = useState("Tarih");
  const [frontText, setFrontText] = useState("");
  const [backText, setBackText] = useState("");
  const [category, setCategory] = useState("Önemli Olaylar");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!frontText.trim() || !backText.trim()) return;

    addFlashcardRecord({
      subject,
      frontText,
      backText,
      category,
    });

    setFrontText("");
    setBackText("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 rounded-2xl glass-card p-4 border border-white/10">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/30 text-purple-400 border border-purple-500/30">
          <Layers className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display font-bold text-white text-base">Bilgi Kartları Bankası Yönetimi</h3>
          <p className="text-xs text-gray-400">Öğrencilerin tekrar ettiği hızlı bilgi kartlarını ve cevaplarını düzenleyin.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1 rounded-2xl glass-panel p-5 border border-white/10 space-y-4">
          <h4 className="font-display font-bold text-white text-sm flex items-center gap-2">
            <Plus className="h-4 w-4 text-purple-400" />
            <span>Yeni Bilgi Kartı Ekle</span>
          </h4>

          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Ders Kapsamı</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-xl bg-black/50 px-3 py-2 text-white border border-white/10"
              >
                <option value="Tarih">Tarih</option>
                <option value="Coğrafya">Coğrafya</option>
                <option value="Vatandaşlık">Vatandaşlık</option>
                <option value="Türkçe">Türkçe</option>
                <option value="Güncel Bilgiler">Güncel Bilgiler</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Ön Yüz (Soru / Kavram)</label>
              <textarea
                required
                rows={3}
                placeholder="Örn: Amasya Genelgesi'nin önemi..."
                value={frontText}
                onChange={(e) => setFrontText(e.target.value)}
                className="w-full rounded-xl bg-black/50 px-3 py-2 text-white border border-white/10"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Arka Yüz (Cevap / Tanım)</label>
              <textarea
                required
                rows={3}
                placeholder="Örn: Kurtuluş Savaşı'nın amacı, gerekçesi ve yöntemi açıklanmıştır..."
                value={backText}
                onChange={(e) => setBackText(e.target.value)}
                className="w-full rounded-xl bg-purple-950/40 px-3 py-2 text-purple-200 border border-purple-500/30"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-purple-600 hover:bg-purple-500 text-white py-2.5 font-bold shadow-lg shadow-purple-600/30 transition-all active:scale-95"
            >
              Kartı Kaydet
            </button>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2 rounded-2xl glass-panel p-5 border border-white/10 shadow-xl space-y-3">
          <h4 className="font-display font-bold text-white text-sm">Eklenen Bilgi Kartları ({customFlashcards.length})</h4>

          {customFlashcards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {customFlashcards.map((card) => (
                <div key={card.id} className="p-4 rounded-xl glass-card border border-white/10 space-y-2 relative group">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {card.subject}
                    </span>
                    <button
                      onClick={() => deleteFlashcardRecord(card.id)}
                      className="text-rose-400 hover:text-rose-300 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-xs font-bold text-white">{card.frontText}</p>
                  <p className="text-xs text-purple-300 bg-purple-950/40 p-2 rounded-lg border border-purple-500/20">{card.backText}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 py-6 text-center">
              Henüz özel bilgi kartı eklenmedi. Sol taraftaki formu kullanarak yeni kart ekleyebilirsiniz.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
