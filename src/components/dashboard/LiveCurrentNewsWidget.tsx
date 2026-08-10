"use client";

import React, { useState } from "react";
import { Newspaper, ChevronRight, ChevronLeft } from "lucide-react";
import { useAuthStore } from "@/src/lib/store/useAuthStore";

export interface CurrentNewsItem {
  id: string;
  category: "Genel Kültür" | "Uluslararası Örgütler" | "UNESCO" | "Bilim & Teknoloji" | "Sanat & Spor";
  title: string;
  detail: string;
  osymNote: string;
  date: string;
  emoji: string;
}

const CURRENT_NEWS_DATA: CurrentNewsItem[] = [
  {
    id: "news-1",
    category: "Bilim & Teknoloji",
    title: "Türkiye'nin İlk Yerli Haberleşme Uydusu TÜRKSAT 6A Uzaya Fırlatıldı",
    detail: "TÜRKSAT 6A, SpaceX Falcon 9 roketi ile uzaya fırlatılarak Türkiye'nin uydu üreten ilk 10 ülke arasına girmesini sağladı. Uydu tamamen yerli ve milli teknolojiyle TÜBİTAK Uzay tarafından geliştirildi.",
    osymNote: "🔥 ÖSYM 2026 Güncel Bilgiler — Çıkma İhtimali Çok Yüksek!",
    date: "2024 - 2026",
    emoji: "🛰️",
  },
  {
    id: "news-2",
    category: "UNESCO",
    title: "Gordion Antik Kenti UNESCO Dünya Mirası Listesi'ne Alındı",
    detail: "Ankara Polatlı ilçesinde bulunan Frigya krallığının başkenti Gordion, UNESCO Dünya Mirası ilan edildi. Gordion Düğümü efsanesi ile bilinen antik kent, Kral Midas'ın başkentidir.",
    osymNote: "🔥 ÖSYM Kültür Mirası Soru Kalıbı — Dünya Mirası Listesi Soruları",
    date: "2023 Güncel",
    emoji: "🏛️",
  },
  {
    id: "news-3",
    category: "Uluslararası Örgütler",
    title: "Türk Devletleri Teşkilatı (TDT) Başkenti ve Üye Ülkeleri",
    detail: "TDT Merkez Karargahı İstanbul'dadır. Üye ülkeler: Türkiye, Azerbaycan, Kazakistan, Kırgızistan, Özbekistan. Gözlemci üyeler: Macaristan ve KKTC.",
    osymNote: "⚡ ÖSYM TDT Kurucusu, Merkez ve Üye Sorusu",
    date: "Güncel Bilgi",
    emoji: "🌍",
  },
  {
    id: "news-4",
    category: "Sanat & Spor",
    title: "2024 Paris Olimpiyatları'nda Türkiye'nin Tarihi Başarıları",
    detail: "Yusuf Dikeç kulaksız ve ekipmansız stiliyle atıcılıkta gümüş madalya kazanarak tüm dünyada viral oldu. Türkiye toplam 4 madalya kazandı.",
    osymNote: "🔥 ÖSYM Spor & İkon Şahsiyet Soruları — Paris Olimpiyatları",
    date: "Paris 2024",
    emoji: "🥇",
  },
  {
    id: "news-5",
    category: "Genel Kültür",
    title: "2026 Türk Dünyası Kültür Başkenti Seçilen Şehir",
    detail: "TÜRKSOY tarafından her yıl bir Türk Dünyası Kültür Başkenti ilan edilmektedir. Bu bilgi KPSS Genel Kültür sorularında sıklıkla karşınıza çıkmaktadır.",
    osymNote: "⚡ TÜRKSOY Sınav Soru Kalıbı — Kültür Başkentleri",
    date: "TÜRKSOY 2026",
    emoji: "🎭",
  },
];

export function LiveCurrentNewsWidget() {
  const { currentUser } = useAuthStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextNews = () => setCurrentIndex((prev) => (prev + 1) % CURRENT_NEWS_DATA.length);
  const prevNews = () => setCurrentIndex((prev) => (prev - 1 + CURRENT_NEWS_DATA.length) % CURRENT_NEWS_DATA.length);

  const currentItem = CURRENT_NEWS_DATA[currentIndex];

  return (
    <div className="rounded-3xl glass-panel p-4 sm:p-5 border border-white/10 shadow-xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-cyan-500/8 blur-3xl" />
      <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/8 blur-3xl" />

      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <Newspaper className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-sm sm:text-base">2026 Güncel Olaylar Akışı</h3>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-flex rounded-full bg-cyan-500/20 px-3 py-1 text-[10px] font-bold text-cyan-300 border border-cyan-500/30 animate-pulse uppercase tracking-wider">
            CANLI ÖSYM AKIŞI
          </span>
          <span className="text-xs text-gray-500 font-semibold">{currentIndex + 1}/{CURRENT_NEWS_DATA.length}</span>
        </div>
      </div>

      {/* Main Content — Horizontal Layout */}
      <div className="flex flex-col md:flex-row items-stretch gap-3">
        {/* Left: Navigation */}
        <button
          onClick={prevNews}
          className="hidden md:flex items-center justify-center w-10 shrink-0 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Center: Content Card */}
        <div className="flex-1 rounded-2xl bg-black/30 p-4 border border-white/5 flex flex-col sm:flex-row items-start gap-3">
          {/* Emoji Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-2xl shrink-0 border border-white/5">
            {currentItem.emoji}
          </div>
          
          {/* Text Content */}
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-center flex-wrap gap-2">
              <span className="rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2.5 py-0.5 text-xs font-bold">
                {currentItem.category}
              </span>
              <span className="text-xs text-gray-400 font-semibold">{currentItem.date}</span>
            </div>

            <h4 className="font-display font-bold text-white text-xs sm:text-sm leading-snug">
              {currentItem.title}
            </h4>

            <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed font-medium line-clamp-2">
              {currentItem.detail}
            </p>

            <div className="pt-1">
              <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20 inline-block">
                {currentItem.osymNote}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Navigation */}
        <button
          onClick={nextNews}
          className="hidden md:flex items-center justify-center w-10 shrink-0 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden items-center justify-center space-x-3 mt-4">
        <button onClick={prevNews} className="rounded-xl bg-white/5 hover:bg-white/10 p-2.5 text-gray-300 hover:text-white border border-white/10 transition-all">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex items-center space-x-1.5">
          {CURRENT_NEWS_DATA.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentIndex ? 'w-6 bg-cyan-400' : 'w-1.5 bg-white/20'}`} />
          ))}
        </div>
        <button onClick={nextNews} className="rounded-xl bg-white/5 hover:bg-white/10 p-2.5 text-gray-300 hover:text-white border border-white/10 transition-all">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
