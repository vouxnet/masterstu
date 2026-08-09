"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { X, Camera, MessageSquarePlus, PlusCircle, Upload, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const QuickActionModal: React.FC = () => {
  const { isQuickActionOpen, setQuickActionOpen, addSharedQuestion, partnerUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"question" | "task">("question");

  // Question Form State
  const [subject, setSubject] = useState("Hukuk");
  const [questionText, setQuestionText] = useState("");
  const [samplePhoto, setSamplePhoto] = useState<string>(
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&auto=format&fit=crop&q=80"
  );

  if (!isQuickActionOpen) return null;

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    addSharedQuestion(subject, questionText.trim(), samplePhoto);
    setQuestionText("");
    setQuickActionOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-lg rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl relative"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickActionOpen(false)}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full glass-card text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="flex items-center space-x-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-400 text-white shadow-lg">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-lg">Hızlı Eylem Ekle</h3>
              <p className="text-xs text-gray-400">
                {partnerUser.name} ile canlı paylaş veya panoya ekle
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmitQuestion} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Ders Seçimi
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-xl bg-gray-900/90 px-3.5 py-2.5 text-xs text-white border border-white/10 focus:border-indigo-500 focus:outline-none"
              >
                <option value="Hukuk">Hukuk (Anayasa, İdare, Ceza, Borçlar, Medeni, Ticaret, İcra)</option>
                <option value="İktisat">İktisat (Mikro, Makro, Para-Banka, Türkiye Ekonomisi)</option>
                <option value="Maliye">Maliye (Teori, Vergi, Borçlanma, Bütçe, 5018)</option>
                <option value="Uluslararası İlişkiler">Uluslararası İlişkiler (Siyasi Tarih, Teoriler, UAD, Dış Politika)</option>
                <option value="Türkçe">Türkçe (Paragraf, Dil Bilgisi, Sözel Mantık)</option>
                <option value="Matematik">Matematik & Geometri</option>
                <option value="Tarih">Tarih (İnkılap Tarihi, Osmanlı)</option>
                <option value="Coğrafya">Coğrafya</option>
                <option value="Vatandaşlık">Vatandaşlık & Anayasa</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Soru Açıklaması veya Not
              </label>
              <textarea
                rows={3}
                placeholder={`${partnerUser.name} kullanıcısına soru sor veya not yaz...`}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="w-full rounded-xl bg-gray-900/90 p-3 text-xs text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            {/* Photo Mock Picker */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Soru Fotoğrafı Yükle / Çek
              </label>
              <div className="flex items-center space-x-3 rounded-2xl glass-card p-3 border border-white/10">
                <img
                  src={samplePhoto}
                  alt="Örnek Soru"
                  className="h-14 w-14 rounded-xl object-cover ring-1 ring-white/20"
                />
                <div className="flex-1 text-xs">
                  <p className="font-semibold text-white">Soru Görseli Hazır 📸</p>
                  <p className="text-[11px] text-gray-400">
                    Kamera veya galeriden soru fotosu yüklendi
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setSamplePhoto(
                      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format&fit=crop&q=80"
                    )
                  }
                  className="rounded-lg bg-white/10 p-2 text-gray-300 hover:text-white"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full rounded-xl glass-button py-3 text-xs font-bold text-white shadow-lg flex items-center justify-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>{partnerUser.name} Panosuna Gönder 🚀</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
