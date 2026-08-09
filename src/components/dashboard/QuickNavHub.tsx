"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Layers, MessageSquarePlus, Camera, FileSpreadsheet, BarChart3 } from "lucide-react";

export const QuickNavHub: React.FC = () => {
  const hubs = [
    {
      href: "/curriculum",
      title: "Müfredat & Konular",
      desc: "Lisans GY-GK, Hukuk, İktisat, Maliye, Uİ & Önlisans Konuları",
      icon: BookOpen,
      color: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 text-indigo-400",
      badge: "Tüm Müfredat",
    },
    {
      href: "/question-distribution",
      title: "ÖSYM Soru Dağılımları",
      desc: "ÖSYM 10 yıllık (2015-2026) konu bazlı çıkmış soru sayıları analizi",
      icon: BarChart3,
      color: "from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400",
      badge: "10 Yıllık Arşiv",
    },
    {
      href: "/flashcards",
      title: "Kaydır-Öğren Bilgi Kartları",
      desc: "Sağa Bildim / Sola Bilemedim aralıklı tekrar kartları",
      icon: Layers,
      color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400",
      badge: "Min. 60 Kart/Ders",
    },
    {
      href: "/shared-qa",
      title: "Canlı Soru & Not Panosu",
      desc: "Fotoğraf çek, yükle, anında partnerinin panosuna düşsün",
      icon: MessageSquarePlus,
      color: "from-pink-500/20 to-pink-600/10 border-pink-500/30 text-pink-400",
      badge: "Canlı Fotoğraf",
    },
    {
      href: "/mistakes",
      title: "Yanlış Kutusu",
      desc: "Fotoğraflı yanlış sorular & 4 Farklı Hata Sebebi Etiketi",
      icon: Camera,
      color: "from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-400",
      badge: "Foto Arşivi",
    },
    {
      href: "/exams",
      title: "Denemeler & Net Takibi",
      desc: "Ders ders net grafikleri & P3 / P93 / P34/37/48 Puan Hesaplama",
      icon: FileSpreadsheet,
      color: "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400",
      badge: "Puan Hesapla",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {hubs.map((hub) => {
        const Icon = hub.icon;
        return (
          <Link
            key={hub.href}
            href={hub.href}
            className={`group flex flex-col justify-between rounded-3xl bg-gradient-to-br ${hub.color} p-5 border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 p-2.5 backdrop-blur-md">
                <Icon className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                {hub.badge}
              </span>
            </div>

            <div>
              <h4 className="font-display font-bold text-white text-base group-hover:text-indigo-300 transition-colors">
                {hub.title}
              </h4>
              <p className="mt-1 text-xs text-gray-300 font-medium line-clamp-2">
                {hub.desc}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
