"use client";

import React, { useState } from "react";
import { Newspaper, Sparkles, ChevronRight, Globe, Award, Landmark } from "lucide-react";
import { useAuthStore } from "@/src/lib/store/useAuthStore";

export interface CurrentNewsItem {
  id: string;
  category: "Genel Kültür" | "Uluslararası Örgütler" | "UNESCO" | "Bilim & Teknoloji" | "Sanat & Spor";
  title: string;
  detail: string;
  osymNote: string;
  date: string;
}

const CURRENT_NEWS_DATA: CurrentNewsItem[] = [
  {
    id: "news-1",
    category: "Bilim & Teknoloji",
    title: "Türkiye'nin İlk Yerli Haberleşme Uydusu TÜRKSAT 6A Uzaya Fırlatıldı",
    detail: "TÜRKSAT 6A, uzaya fırlatılarak Türkiye'nin uydu üreten ilk 10 ülke arasına girmesini sağladı.",
    osymNote: "🔥 ÖSYM 2026 Güncel Bilgiler Çıkma İhtimali Çok Yüksek!",
    date: "2024 - 2026"
  },
  {
    id: "news-2",
    category: "UNESCO",
    title: "Gordion Antik Kenti UNESCO Dünya Mirası Listesi'ne Alındı",
    detail: "Ankara Polatlı ilçesinde bulunan Frigya krallığının başkenti Gordion, UNESCO Dünya Mirası ilan edildi.",
    osymNote: "🔥 ÖSYM Kültür Mirası Soru Kalıbı",
    date: "Güncel Miras"
  },
  {
    id: "news-3",
    category: "Uluslararası Örgütler",
    title: "Türk Devletleri Teşkilatı (TDT) Başkenti ve Üye Ülkeleri",
    detail: "TDT Merkez Karargahı İstanbul'dadır. Üye ülkeler: Türkiye, Azerbaycan, Kazakistan, Kırgızistan, Özbekistan.",
    osymNote: "⚡ ÖSYM TDT Kurucusu ve Üye Sorusu",
    date: "Güncel Bilgi"
  },
  {
    id: "news-4",
    category: "Sanat & Spor",
    title: "2024 Paris Olimpiyatları'nda Türkiye'nin Tarihi Başarıları",
    detail: "Yusuf Dikeç kulaksız ve ekipmansız gümüş madalya kazanarak tüm dünyada ikonik simge haline geldi.",
    osymNote: "🔥 ÖSYM Spor & İkon Şahsiyet Soruları",
    date: "Olimpiyatlar"
  },
  {
    id: "news-5",
    category: "Genel Kültür",
    title: "2026 Türk Dünyası Kültür Başkenti Seçilen Şehir",
    detail: "TÜRKSOY tarafından Türk Dünyası Kültür Başkenti olarak ilan edilen tarihi şehirler sınavda sorulmaktadır.",
    osymNote: "⚡ TÜRKSOY Sınav Soru Kalıbı",
    date: "TÜRKSOY"
  }
];

export function LiveCurrentNewsWidget() {
  const { currentUser } = useAuthStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextNews = () => {
    setCurrentIndex((prev) => (prev + 1) % CURRENT_NEWS_DATA.length);
  };

  const currentItem = CURRENT_NEWS_DATA[currentIndex];

  return (
    <div className="rounded-3xl glass-panel p-5 border border-white/10 shadow-xl space-y-3 relative overflow-hidden">
      {/* Glow */}
      <div className="pointer-events-none absolute -right-10 -bottom-10 h-36 w-36 rounded-full bg-cyan-500/10 blur-2xl" />

      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <Newspaper className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-display font-bold text-white text-sm sm:text-base">2026 Güncel Olaylar Akışı</h3>
              <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[9px] font-bold text-cyan-300 border border-cyan-500/30 animate-pulse">
                CANLI ÖSYM AKIŞI
              </span>
            </div>
            <p className="text-[11px] text-gray-400">Sınavda çıkabilecek güncel genel kültür haberleri</p>
          </div>
        </div>

        <button
          onClick={nextNews}
          className="rounded-xl bg-white/5 hover:bg-white/10 p-2 text-gray-300 hover:text-white border border-white/10 transition-all flex items-center space-x-1 text-xs font-bold"
          title="Sonraki Güncel Haber"
        >
          <span>Sonraki</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content Card */}
      <div className="rounded-2xl bg-black/40 p-4 border border-white/5 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="rounded-md bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 text-[10px] font-bold">
            {currentItem.category}
          </span>
          <span className="text-[10px] text-gray-400 font-semibold">{currentItem.date}</span>
        </div>

        <h4 className="font-display font-bold text-white text-sm leading-snug">
          {currentItem.title}
        </h4>

        <p className="text-xs text-gray-300 leading-relaxed font-medium">
          {currentItem.detail}
        </p>

        <div className="pt-1.5 border-t border-white/5">
          <span className="text-[10.5px] font-bold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 inline-block">
            {currentItem.osymNote}
          </span>
        </div>
      </div>
    </div>
  );
}
