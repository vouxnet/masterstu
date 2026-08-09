"use client";

import React, { useRef, useState } from "react";
import { Download, Flame, Trophy, TrendingUp, Sparkles, Swords, Calendar } from "lucide-react";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { useStudyLogStore } from "@/src/lib/store/useStudyLogStore";
import { useExamHistoryStore } from "@/src/lib/store/useExamHistoryStore";

type CardType = "daily" | "weekly" | "duel";

interface AchievementCardProps {
  type?: CardType;
  onClose?: () => void;
}

export function AchievementCard({ type = "daily", onClose }: AchievementCardProps) {
  const { currentUser } = useAuthStore();
  const { getTodayStats, getStreakCount, getWeeklyStats } = useStudyLogStore();
  const { getLastN } = useExamHistoryStore();
  
  const activeExam = currentUser.activeExam;
  const todayStats = getTodayStats(activeExam);
  const weeklyStats = getWeeklyStats(activeExam);
  const streak = getStreakCount();
  const lastExam = getLastN(1, activeExam)[0];

  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      setIsDownloading(true);
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, { quality: 1, pixelRatio: 2 });
      
      const link = document.createElement("a");
      link.download = `asimptot-basari-${type}-${new Date().toISOString().split('T')[0]}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image", err);
    } finally {
      setIsDownloading(false);
    }
  };

  const todayStr = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

  const renderCardContent = () => {
    switch (type) {
      case "daily":
        return (
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-amber-500/20 p-4 rounded-full border border-amber-500/30">
              <Flame className="w-12 h-12 text-amber-400" />
            </div>
            <h2 className="text-3xl font-display font-black text-white">GÜNLÜK HEDEF TAMAM!</h2>
            <div className="flex items-center space-x-2 text-amber-300 font-bold text-xl">
              <Flame className="w-6 h-6" />
              <span>{streak} GÜN SERİ</span>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 w-full mt-4 flex justify-between items-center border border-white/5">
              <div className="text-left">
                <p className="text-xs text-gray-400">Çözülen Soru</p>
                <p className="text-2xl font-bold text-emerald-400">{currentUser.completedQuestionsToday}</p>
              </div>
              <div className="h-10 w-px bg-white/10 mx-2"></div>
              <div className="text-left">
                <p className="text-xs text-gray-400">Çalışma Süresi</p>
                <p className="text-2xl font-bold text-indigo-400">{todayStats.totalMinutes} Dk</p>
              </div>
            </div>
          </div>
        );
      case "weekly":
        return (
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-indigo-500/20 p-4 rounded-full border border-indigo-500/30">
              <TrendingUp className="w-12 h-12 text-indigo-400" />
            </div>
            <h2 className="text-3xl font-display font-black text-white">HAFTALIK ÖZET</h2>
            <p className="text-indigo-200 font-medium">Bu hafta harika iş çıkardın!</p>
            <div className="bg-white/10 rounded-2xl p-4 w-full mt-4 flex flex-col space-y-3 border border-white/5 text-left">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Toplam Süre</span>
                <span className="font-bold text-white">{weeklyStats.totalMinutes} Dk</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Aktif Gün</span>
                <span className="font-bold text-white">{weeklyStats.activeDays}/7 Gün</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Son Deneme Neti</span>
                <span className="font-bold text-emerald-400">{lastExam ? lastExam.totalNet : '-'}</span>
              </div>
            </div>
          </div>
        );
      case "duel":
        return (
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-rose-500/20 p-4 rounded-full border border-rose-500/30">
              <Swords className="w-12 h-12 text-rose-400" />
            </div>
            <h2 className="text-3xl font-display font-black text-white">DÜELLO KAZANANI!</h2>
            <p className="text-rose-200 font-medium">Rakibini 5-2 yendi! ⚔️</p>
            <div className="flex items-center justify-center space-x-4 mt-6">
              <div className="flex flex-col items-center">
                <img src={currentUser.avatarUrl} alt="Sen" className="w-16 h-16 rounded-full border-2 border-emerald-500" />
                <span className="mt-2 font-bold text-emerald-400">5 Puan</span>
              </div>
              <span className="text-2xl font-black text-gray-500">VS</span>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-gray-600 bg-gray-800 flex items-center justify-center text-gray-500 font-bold">R</div>
                <span className="mt-2 font-bold text-gray-400">2 Puan</span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto">
      {/* The card to be captured */}
      <div 
        ref={cardRef} 
        className="w-full bg-gradient-to-br from-[#0f0f1a] to-[#1a1a3e] rounded-3xl p-6 border border-white/10 shadow-2xl relative overflow-hidden"
        style={{ width: '380px' }}
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 relative z-10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
            <span className="font-display font-black tracking-widest text-white text-lg">ASİMPTOT</span>
          </div>
          <div className="flex items-center text-xs text-gray-400 font-medium bg-black/30 px-2 py-1 rounded-full">
            <Calendar className="w-3 h-3 mr-1" />
            {todayStr}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 mb-8">
          {renderCardContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4 relative z-10">
          <div className="flex items-center space-x-2">
            <img src={currentUser.avatarUrl} alt="User" className="w-8 h-8 rounded-full border border-white/20" />
            <div className="text-left">
              <p className="text-xs font-bold text-white">{currentUser.name}</p>
              <p className="text-[10px] text-gray-400">{currentUser.friendCode}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="w-12 h-12 bg-white/10 rounded-lg p-1 border border-white/10 flex items-center justify-center">
              <div className="w-full h-full border border-dashed border-gray-500 rounded text-[8px] flex items-center justify-center text-gray-500 text-center leading-tight">
                QR<br/>Alan
              </div>
            </div>
            <p className="text-[9px] text-gray-500 mt-1">asimptot.app</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 mt-6 w-full max-w-[380px]">
        {onClose && (
          <button 
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors"
          >
            Kapat
          </button>
        )}
        <button 
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors flex items-center justify-center shadow-lg shadow-indigo-500/25 disabled:opacity-50"
        >
          {isDownloading ? (
            <span className="animate-pulse">Hazırlanıyor...</span>
          ) : (
            <>
              <Download className="w-5 h-5 mr-2" />
              Paylaş & İndir
            </>
          )}
        </button>
      </div>
    </div>
  );
}
