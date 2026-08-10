"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Layers, MessageSquarePlus, Camera, FileSpreadsheet, BarChart3 } from "lucide-react";

export const QuickNavHub: React.FC = () => {
  const hubs = [
    {
      href: "/curriculum",
      title: "Müfredat & Konular",
      desc: "Lisans GY-GK ve Önlisans tüm konuları takip et",
      icon: BookOpen,
      color: "from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 text-indigo-400",
      badge: "Tüm Müfredat",
    },
    {
      href: "/question-distribution",
      title: "ÖSYM Soru Dağılımları",
      desc: "10 yıllık konu bazlı çıkmış soru analizi",
      icon: BarChart3,
      color: "from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400",
      badge: "10 Yıllık Arşiv",
    },
    {
      href: "/flashcards",
      title: "Bilgi Kartları",
      desc: "Sağa-Sola kaydırmalı aralıklı tekrar kartları",
      icon: Layers,
      color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400",
      badge: "SRS Leitner",
    },
    {
      href: "/shared-qa",
      title: "Canlı Soru Panosu",
      desc: "Fotoğraf çek, yükle, partnerinin panosuna düşsün",
      icon: MessageSquarePlus,
      color: "from-pink-500/20 to-pink-600/10 border-pink-500/30 text-pink-400",
      badge: "Canlı Paylaşım",
    },
    {
      href: "/mistakes",
      title: "Yanlış Kutusu",
      desc: "Fotoğraflı yanlış sorular ve hata sebebi etiketleri",
      icon: Camera,
      color: "from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-400",
      badge: "Foto Arşivi",
    },
    {
      href: "/exams",
      title: "Denemeler & Net Takibi",
      desc: "Ders bazlı netler ve puan hesaplama",
      icon: FileSpreadsheet,
      color: "from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400",
      badge: "Puan Hesapla",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {hubs.map((hub) => {
        const Icon = hub.icon;
        return (
          <Link
            key={hub.href}
            href={hub.href}
            className={`group flex items-start space-x-4 rounded-2xl bg-gradient-to-br ${hub.color} p-5 border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 p-3 backdrop-blur-md shrink-0">
              <Icon className="h-6 w-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-display font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
                  {hub.title}
                </h4>
              </div>
              <p className="text-xs text-gray-300 font-medium leading-relaxed mb-2">
                {hub.desc}
              </p>
              <span className="inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                {hub.badge}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
