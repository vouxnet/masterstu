"use client";

import React, { useEffect, useState } from "react";
import { Trophy, Skull, ShieldCheck, Zap } from "lucide-react";
import { useLeagueStore } from "@/src/lib/store/useLeagueStore";

export default function LeaguePage() {
  const { leaderboard, getLeagueInfo, checkWeekEnd, weeklyXP } = useLeagueStore();
  const info = getLeagueInfo();
  
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    checkWeekEnd();
    
    // Simple countdown logic for visual purposes
    const timer = setInterval(() => {
      const now = new Date();
      const weekStart = new Date(useLeagueStore.getState().weekStartDate);
      const target = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
      const diff = target.getTime() - now.getTime();
      
      if (diff <= 0) {
        checkWeekEnd();
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        setTimeLeft(`${days} Gün ${hours} Saat`);
      }
    }, 60000); // update every minute

    // Initial calc
    const now = new Date();
    const weekStart = new Date(useLeagueStore.getState().weekStartDate);
    const target = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
    const diff = target.getTime() - now.getTime();
    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        setTimeLeft(`${days} Gün ${hours} Saat`);
    }

    return () => clearInterval(timer);
  }, []);

  const { config } = info;
  const isTopTier = info.tier === 'obsidian';
  
  return (
    <div className="mx-auto max-w-4xl p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Badge */}
      <div 
        className="glass-panel p-8 flex flex-col items-center justify-center text-center space-y-4 rounded-3xl border border-white/10 relative overflow-hidden"
        style={{
          background: `radial-gradient(circle at center, ${config.color}20 0%, transparent 70%)`
        }}
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <ShieldCheck className="w-48 h-48" style={{ color: config.color }} />
        </div>
        
        <div 
          className="text-6xl mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-bounce"
          style={{ animationDuration: '3s' }}
        >
          {config.emoji}
        </div>
        
        <h1 
          className="text-4xl font-display font-black tracking-tight"
          style={{ color: config.color }}
        >
          {config.name} Lig
        </h1>
        
        <div className="flex items-center space-x-2 text-sm font-medium bg-black/30 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md">
          <Zap className="w-4 h-4 text-amber-400" />
          <span className="text-gray-300">Bu Hafta Sona Eriyor:</span>
          <span className="text-white font-bold">{timeLeft || "Yakında..."}</span>
        </div>
      </div>

      {/* Info / Progress section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-6 rounded-2xl flex items-center justify-between border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-500/10 to-transparent">
          <div>
            <h3 className="font-display font-bold text-white text-lg">Yükselme Bölgesi</h3>
            <p className="text-emerald-400/80 text-sm font-medium mt-1">
              Üst {config.promotionSlots}'e gir → Bir üst lige yüksel! 🚀
            </p>
          </div>
          <Trophy className="w-8 h-8 text-emerald-400 opacity-80" />
        </div>
        
        {config.relegationSlots > 0 && (
          <div className="glass-card p-6 rounded-2xl flex items-center justify-between border-l-4 border-l-rose-500 bg-gradient-to-r from-rose-500/10 to-transparent">
            <div>
              <h3 className="font-display font-bold text-white text-lg">Düşme Tehlikesi</h3>
              <p className="text-rose-400/80 text-sm font-medium mt-1">
                Son {config.relegationSlots}'te kalırsan bir alt lige düşersin! ⚠️
              </p>
            </div>
            <Skull className="w-8 h-8 text-rose-400 opacity-80" />
          </div>
        )}
      </div>

      {/* Leaderboard Table */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
        <div className="p-4 bg-white/5 border-b border-white/5">
          <h2 className="font-display font-bold text-white text-xl flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>Sıralama Tablosu</span>
          </h2>
        </div>
        
        <div className="divide-y divide-white/5">
          {leaderboard.map((member) => {
            const isPromotion = member.rank <= config.promotionSlots;
            const isRelegation = member.rank > leaderboard.length - config.relegationSlots;
            const isCurrentUser = member.isCurrentUser;
            
            let bgClass = "hover:bg-white/5 transition-colors";
            if (isCurrentUser) bgClass = "bg-indigo-500/20 border-l-4 border-indigo-500 hover:bg-indigo-500/30 transition-colors";
            
            return (
              <div 
                key={member.id} 
                className={`flex items-center p-4 sm:p-5 ${bgClass} ${isCurrentUser ? "shadow-[inset_0_0_20px_rgba(99,102,241,0.2)]" : ""}`}
              >
                <div className="flex-shrink-0 w-12 text-center">
                  <span className={`text-xl font-black ${
                    member.rank === 1 ? "text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" : 
                    member.rank === 2 ? "text-gray-300 drop-shadow-[0_0_8px_rgba(209,213,219,0.8)]" :
                    member.rank === 3 ? "text-amber-700 drop-shadow-[0_0_8px_rgba(180,83,9,0.8)]" :
                    "text-gray-500"
                  }`}>
                    {member.rank}
                  </span>
                </div>
                
                <div className="flex-shrink-0 mx-4 relative">
                  <img 
                    src={member.avatarUrl} 
                    alt={member.name}
                    className={`w-12 h-12 rounded-full object-cover ring-2 ${
                      isCurrentUser ? "ring-indigo-500" : "ring-white/10"
                    }`}
                  />
                  {isPromotion && !isTopTier && (
                    <div className="absolute -top-1 -right-1 bg-emerald-500 rounded-full p-0.5 shadow-lg">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                  )}
                  {isRelegation && config.relegationSlots > 0 && (
                    <div className="absolute -bottom-1 -right-1 bg-rose-500 rounded-full p-0.5 shadow-lg">
                      <Skull className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-sm sm:text-base truncate ${isCurrentUser ? "text-white" : "text-gray-300"}`}>
                    {member.name}
                    {isCurrentUser && <span className="ml-2 text-[10px] bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-full border border-indigo-500/50">SEN</span>}
                  </p>
                </div>
                
                <div className="flex-shrink-0 text-right ml-4">
                  <p className="font-display font-black text-lg text-white">
                    {member.weeklyXP}
                  </p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">XP</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
