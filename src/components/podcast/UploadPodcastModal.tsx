"use client";

import React, { useState, useRef } from "react";
import { X, UploadCloud, Headphones, Music, CheckCircle2, AlertCircle } from "lucide-react";
import { podcastService, PodcastEpisode } from "@/src/lib/services/podcastService";
import { useAuthStore } from "@/src/lib/store/useAuthStore";

interface UploadPodcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newEp: PodcastEpisode) => void;
}

export function UploadPodcastModal({ isOpen, onClose, onSuccess }: UploadPodcastModalProps) {
  const { currentUser } = useAuthStore();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("Anayasa Hukuku");
  const [duration, setDuration] = useState("03:00");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("audio/")) {
      setStatusMessage("⚠️ Lütfen geçerli bir ses dosyası seçin (.mp3, .m4a, .wav)");
      return;
    }

    setSelectedFile(file);
    setStatusMessage(null);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !selectedFile) {
      setStatusMessage("⚠️ Lütfen bölüm başlığı ve ses dosyası seçiniz.");
      return;
    }

    setIsLoading(true);
    setStatusMessage("⏳ Ses dosyası Supabase depolama alanına yükleniyor...");

    try {
      const audioUrl = await podcastService.uploadAudioFileToSupabase(selectedFile);

      const newEpisode: PodcastEpisode = {
        id: `pod-user-${Date.now()}`,
        title,
        subject,
        duration: duration || "03:00",
        audioUrl,
        authorName: currentUser.name || "Aday",
        authorAvatar: currentUser.avatarUrl,
        isOfficial: false,
        plays: 1,
        createdAt: new Date().toISOString().split("T")[0],
      };

      podcastService.saveEpisode(newEpisode);
      setIsLoading(false);
      onSuccess(newEpisode);
      onClose();
    } catch (e: any) {
      setIsLoading(false);
      setStatusMessage(`❌ Hata: ${e?.message || "Ses yüklenirken sorun oluştu."}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl relative space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/40">
              <UploadCloud className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base">🎙️ Mikro Podcast Yükle</h3>
              <p className="text-xs text-gray-400">Cihazınızdan 3 dakikalık ders ses kaydı ekleyin</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {statusMessage && (
          <div className="p-3 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-xs text-indigo-200 flex items-center space-x-2">
            <span>{statusMessage}</span>
          </div>
        )}

        <form onSubmit={handleUpload} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-300">Bölüm Başlığı</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: 1982 Anayasası Haklar Özet"
              className="w-full bg-gray-900/90 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-300">Ders</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-gray-900/90 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Anayasa Hukuku">Anayasa Hukuku</option>
                <option value="İdare Hukuku">İdare Hukuku</option>
                <option value="Tarih">Tarih</option>
                <option value="Coğrafya">Coğrafya</option>
                <option value="İktisat">İktisat</option>
                <option value="Vatandaşlık">Vatandaşlık</option>
                <option value="Genel Kültür">Genel Kültür</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-300">Tahmini Süre</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="03:00"
                className="w-full bg-gray-900/90 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* File Picker */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-300">Ses Dosyası (.mp3 / .m4a / .wav)</label>
            <input
              type="file"
              ref={fileInputRef}
              accept="audio/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-6 border-2 border-dashed border-white/20 rounded-2xl bg-black/30 hover:bg-black/50 transition-colors flex flex-col items-center justify-center cursor-pointer text-center space-y-2"
            >
              <Music className="w-8 h-8 text-indigo-400 mb-1" />
              {selectedFile ? (
                <div className="text-xs text-emerald-400 font-bold">
                  ✅ {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                </div>
              ) : (
                <>
                  <span className="text-xs font-bold text-white">Cihazınızdan Ses Dosyası Seçin</span>
                  <span className="text-[10px] text-gray-400">Tıklayın veya dosyayı buraya sürükleyin</span>
                </>
              )}
            </div>
          </div>

          <div className="pt-2 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 text-xs font-medium"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-600/30 disabled:opacity-50"
            >
              {isLoading ? "Yükleniyor..." : "🎙️ Podcast Yayınla"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
