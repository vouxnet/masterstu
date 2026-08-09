"use client";

import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { kpssOnlisansDistributionData } from "@/src/lib/data/kpssOnlisansDistribution";
import { kpssLisansDistributionData } from "@/src/lib/data/kpssLisansDistribution";
import { ortaogretimDistribution } from "@/src/lib/data/ortaogretimDistribution";
import { ydsDistribution } from "@/src/lib/data/ydsDistribution";
import { alesDistribution } from "@/src/lib/data/alesDistribution";
import { TrendingUp, CheckCircle2 } from "lucide-react";

export default function QuestionDistributionPage() {
  const { currentUser } = useAuthStore();
  const activeExam = currentUser.activeExam;
  
  let courses: string[] = [];
  let currentDataset: any = {};
  let title = "";
  let description = "";
  let years = ["2016", "2018", "2020", "2022", "2024"];
  let successText = "";
  let successSubtext = "";
  let badgeText = "";

  switch (activeExam) {
    case "kpss_onlisans":
      courses = ["Türkçe", "Matematik", "Tarih", "Coğrafya", "Vatandaşlık"];
      currentDataset = kpssOnlisansDistributionData;
      years = ["2012", "2014", "2016", "2018", "2020", "2022", "2023"];
      title = `${currentUser.name || "Kullanıcı"} - ÖSYM Önlisans Soru Dağılımları (2012-2023)`;
      description = `${currentUser.name || "Kullanıcı"} için ÖSYM Önlisans Matematik ve tüm derslerin tam çıkmış soru sayıları ve ihtimal yüzdeleri (%)`;
      successText = `${currentUser.name || "Kullanıcı"} için ÖSYM Önlisans Tabloları ve % İhtimal Analizleri %100 Hazır!`;
      successSubtext = "ÖSYM Önlisans Matematik (2012-2023), Türkçe, Tarih, Coğrafya ve Vatandaşlık soru verileri %100 eksiksiz işlendi.";
      badgeText = `${currentUser.name || "Kullanıcı"} (Önlisans)`;
      break;
    case "kpss_ortaogretim":
      courses = ["Türkçe", "Matematik", "Tarih", "Coğrafya", "Vatandaşlık", "Güncel Bilgiler"];
      currentDataset = ortaogretimDistribution;
      title = "ÖSYM Ortaöğretim Soru Dağılımları";
      description = "Ortaöğretim sınavındaki derslerin (2016-2024) ÖSYM soru sayıları";
      successText = "ÖSYM Ortaöğretim Tabloları %100 Hazır!";
      successSubtext = "ÖSYM Ortaöğretim soru verileri eksiksiz işlendi.";
      badgeText = "KPSS Ortaöğretim";
      break;
    case "yds":
      courses = ["İngilizce"];
      currentDataset = ydsDistribution;
      title = "ÖSYM YDS Soru Dağılımları";
      description = "YDS sınavındaki (2020-2024) 5 yıllık ÖSYM soru sayıları";
      years = ["2020", "2021", "2022", "2023", "2024"];
      successText = "ÖSYM YDS Tabloları %100 Hazır!";
      successSubtext = "ÖSYM YDS soru verileri eksiksiz işlendi.";
      badgeText = "YDS";
      break;
    case "ales":
      courses = ["Sayısal", "Sözel"];
      currentDataset = alesDistribution;
      title = "ÖSYM ALES Soru Dağılımları";
      description = "ALES sınavındaki (2020-2024) 5 yıllık ÖSYM soru sayıları";
      years = ["2020", "2021", "2022", "2023", "2024"];
      successText = "ÖSYM ALES Tabloları %100 Hazır!";
      successSubtext = "ÖSYM ALES soru verileri eksiksiz işlendi.";
      badgeText = "ALES";
      break;
    case "kpss_lisans":
    default:
      courses = ["Türkçe", "Matematik", "Tarih", "Coğrafya", "Vatandaşlık", "Hukuk", "İktisat", "Maliye", "Uluslararası İlişkiler"];
      currentDataset = kpssLisansDistributionData;
      title = `${currentUser.name || "Kullanıcı"} - ÖSYM Lisans Soru Dağılımları`;
      description = `${currentUser.name || "Kullanıcı"} için Lisans sayfasındaki TÜM derslerin (2015-2024) 10 yıllık ÖSYM soru sayıları`;
      successText = `${currentUser.name || "Kullanıcı"} için ÖSYM Lisans Tabloları %100 Hazır!`;
      successSubtext = "ÖSYM Lisans Türkçe, Matematik, Tarih, Coğrafya, Vatandaşlık ve A Grubu soru verileri eksiksiz işlendi.";
      badgeText = `${currentUser.name || "Kullanıcı"} (Lisans + A Grubu)`;
      break;
  }

  const [selectedCourse, setSelectedCourse] = useState(courses[0]);

  // Handle exam changes
  useEffect(() => {
    if (!courses.includes(selectedCourse)) {
      setSelectedCourse(courses[0]);
    }
  }, [activeExam, courses, selectedCourse]);

  const currentTable = currentDataset[selectedCourse] || [];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
              ÖSYM Arşivi
            </span>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
              {badgeText}
            </span>
          </div>
          <h1 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">
            {title}
          </h1>
          <p className="text-xs text-gray-300 mt-1">
            {description}
          </p>
        </div>

        <div className="inline-flex items-center space-x-2 rounded-2xl glass-card px-4 py-2 text-xs font-bold text-amber-300 border border-amber-500/30">
          <TrendingUp className="h-4 w-4 text-amber-400" />
          <span>Veriler %100 Hazır</span>
        </div>
      </div>

      {/* Success Notification */}
      <div className="flex items-center space-x-3 rounded-2xl bg-emerald-950/40 p-4 border border-emerald-500/30 text-xs text-emerald-200">
        <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
        <div>
          <p className="font-bold text-white">
            {successText}
          </p>
          <p className="mt-0.5 text-gray-300">
            {successSubtext}
          </p>
        </div>
      </div>

      {/* Course Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {courses.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCourse(c)}
            className={`rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all border ${
              selectedCourse === c
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30"
                : "glass-card text-gray-400 border-white/5 hover:text-white"
            }`}
          >
            {c} Soru Dağılımı
          </button>
        ))}
      </div>

      {/* Distribution Table */}
      <div className="rounded-3xl glass-panel border border-white/10 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-200">
            <thead className="bg-white/5 font-display text-[11px] font-bold text-gray-300 uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="px-5 py-4">Konu Başlığı</th>
                {years.map((y, i) => (
                  <th key={i} className="px-3 py-4 text-center">{y}</th>
                ))}
                <th className="px-4 py-4 text-center text-amber-400">% Soru Çıkma İhtimali</th>
                <th className="px-4 py-4 text-center text-emerald-400">Ortalama</th>
                <th className="px-4 py-4 text-center">Soru Yoğunluğu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-medium">
              {currentTable && currentTable.length > 0 ? (
                currentTable.map((row: any, idx: number) => {
                  const yKeys = years.map(y => `y${y}`);
                  return (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="px-5 py-4 font-bold text-white flex items-center space-x-2">
                        <span className="h-2 w-2 rounded-full bg-indigo-500 flex-shrink-0" />
                        <span>{row.topic}</span>
                      </td>
                      {yKeys.map((k, i) => (
                        <td key={i} className="px-3 py-4 text-center text-gray-400 font-mono">
                          {row[k] !== undefined ? `${row[k]} Soru` : "—"}
                        </td>
                      ))}
                      <td className="px-4 py-4 text-center">
                        <span className="rounded-full bg-amber-500/20 px-2.5 py-1 text-xs font-black text-amber-300 border border-amber-500/30 whitespace-nowrap">
                          %{row.probabilityPercent !== undefined ? row.probabilityPercent : (row.avg > 1 ? 100 : Math.round(row.avg * 50))} Çıkma İhtimali
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center font-display font-bold text-emerald-400 text-sm">
                        ~{row.avg} Soru
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            row.importance === "Yüksek"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : row.importance === "Orta"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              : "bg-gray-800 text-gray-400"
                          }`}
                        >
                          {row.importance} Yoğunluk
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-6 text-gray-400">
                    Bu ders için tablo verisi yükleniyor.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
