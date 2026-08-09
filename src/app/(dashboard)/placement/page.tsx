"use client";

import React, { useState } from "react";
import { 
  Target, 
  Search, 
  Filter, 
  TrendingUp, 
  Building2, 
  MapPin, 
  Award,
  Plus
} from "lucide-react";
import { placementTargets } from "@/src/lib/data/placementData";
import { useExamHistoryStore } from "@/src/lib/store/useExamHistoryStore";

export default function PlacementPage() {
  const { results } = useExamHistoryStore();
  
  // Calculate current net based on the last exam
  const sortedExams = [...results].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const lastExam = sortedExams[0];
  
  let currentNet = 0;
  if (lastExam) {
    currentNet = lastExam.totalNet;
  } else {
    currentNet = 70; // Default for visual testing if no exams
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<"all" | "merkez" | "taşra">("all");
  const [filterDifficulty, setFilterDifficulty] = useState<"all" | "kolay" | "orta" | "zor" | "çok_zor">("all");
  const [customNet, setCustomNet] = useState<string>("");

  const displayNet = customNet ? parseFloat(customNet) || currentNet : currentNet;

  const filteredTargets = placementTargets.filter(target => {
    const matchesSearch = target.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          target.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || target.category === filterCategory;
    const matchesDifficulty = filterDifficulty === "all" || target.difficulty === filterDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Sort by gap to user's net (closest first)
  const sortedTargets = [...filteredTargets].sort((a, b) => {
    const gapA = Math.max(0, a.avgMinNet - displayNet);
    const gapB = Math.max(0, b.avgMinNet - displayNet);
    return gapA - gapB;
  });

  const getCardStatus = (targetNet: number, userNet: number) => {
    const gap = targetNet - userNet;
    if (gap <= 0) return { type: 'success', color: 'emerald', text: 'Bu kadroya yeterli!' };
    if (gap <= 5) return { type: 'warning', color: 'amber', text: `${gap.toFixed(1)} net kaldı — ulaşılabilir!` };
    return { type: 'danger', color: 'rose', text: 'Henüz uzak' };
  };

  const stats = {
    total: sortedTargets.length,
    reachable: sortedTargets.filter(t => t.avgMinNet - displayNet <= 5 && t.avgMinNet - displayNet > 0).length,
    achieved: sortedTargets.filter(t => displayNet >= t.avgMinNet).length,
    far: sortedTargets.filter(t => t.avgMinNet - displayNet > 5).length,
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2 flex items-center gap-3">
            <Target className="w-8 h-8 text-indigo-400" />
            Canlı Atama & Hedef Simülatörü
          </h1>
          <p className="text-gray-400">Son denemenizdeki netinize göre atanabileceğiniz kadrolar</p>
        </div>
        
        <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col items-center min-w-[200px]">
          <span className="text-sm text-gray-400 mb-1">Mevcut Netiniz</span>
          <span className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            {displayNet.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl border border-white/10 flex items-center gap-4">
          <div className="p-3 bg-white/5 rounded-lg"><Building2 className="w-6 h-6 text-gray-300" /></div>
          <div><div className="text-2xl font-bold text-white">{stats.total}</div><div className="text-xs text-gray-400">Toplam Kadro</div></div>
        </div>
        <div className="glass-card p-4 rounded-xl border border-white/10 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-lg"><Award className="w-6 h-6 text-emerald-400" /></div>
          <div><div className="text-2xl font-bold text-emerald-400">{stats.achieved}</div><div className="text-xs text-gray-400">Yeterli Net</div></div>
        </div>
        <div className="glass-card p-4 rounded-xl border border-white/10 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-lg"><TrendingUp className="w-6 h-6 text-amber-400" /></div>
          <div><div className="text-2xl font-bold text-amber-400">{stats.reachable}</div><div className="text-xs text-gray-400">Ulaşılabilir</div></div>
        </div>
        <div className="glass-card p-4 rounded-xl border border-white/10 flex items-center gap-4">
          <div className="p-3 bg-rose-500/10 rounded-lg"><Target className="w-6 h-6 text-rose-400" /></div>
          <div><div className="text-2xl font-bold text-rose-400">{stats.far}</div><div className="text-xs text-gray-400">Henüz Uzak</div></div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="glass-card p-4 rounded-xl border border-white/10 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Kurum veya pozisyon ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value as any)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none flex-1 md:flex-none"
          >
            <option value="all">Tüm Kategoriler</option>
            <option value="merkez">Merkez</option>
            <option value="taşra">Taşra</option>
          </select>
          
          <select 
            value={filterDifficulty} 
            onChange={(e) => setFilterDifficulty(e.target.value as any)}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none flex-1 md:flex-none"
          >
            <option value="all">Tüm Zorluklar</option>
            <option value="kolay">Kolay</option>
            <option value="orta">Orta</option>
            <option value="zor">Zor</option>
            <option value="çok_zor">Çok Zor</option>
          </select>
        </div>

        <div className="flex items-center gap-2 border-l border-white/10 pl-4">
          <input 
            type="number" 
            placeholder="Manuel Net" 
            value={customNet}
            onChange={(e) => setCustomNet(e.target.value)}
            className="w-28 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Target Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTargets.map(target => {
          const status = getCardStatus(target.avgMinNet, displayNet);
          const progressPercentage = Math.min(100, (displayNet / target.avgMinNet) * 100);
          
          return (
            <div key={target.id} className="glass-card p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg line-clamp-1">{target.institution}</h3>
                  <p className="text-indigo-400 text-sm font-medium">{target.position}</p>
                </div>
                <div className={`px-2.5 py-1 rounded-md text-xs font-bold bg-${status.color}-500/10 text-${status.color}-400 border border-${status.color}-500/20 whitespace-nowrap ml-2`}>
                  {target.avgMinNet} Net
                </div>
              </div>
              
              <div className="flex gap-2 mb-6 text-xs text-gray-400">
                <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md">
                  <MapPin className="w-3 h-3" /> {target.category === 'merkez' ? 'Merkez' : 'Taşra'}
                </span>
                <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md">
                  <Filter className="w-3 h-3" /> {target.examType === 'kpss_lisans' ? 'Lisans' : 'Önlisans'}
                </span>
                <span className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md">
                  <Users className="w-3 h-3" /> {target.quota2024} Kontenjan
                </span>
              </div>
              
              <div className="mt-auto">
                <div className="flex justify-between text-xs mb-2">
                  <span className={`text-${status.color}-400 font-medium`}>{status.text}</span>
                  <span className="text-gray-400">{displayNet.toFixed(1)} / {target.avgMinNet}</span>
                </div>
                
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden relative">
                  <div 
                    className={`h-full bg-${status.color}-500 rounded-full transition-all duration-1000`}
                    style={{ width: `${progressPercentage}%` }}
                  />
                  {/* Mark the target point */}
                  <div className="absolute top-0 bottom-0 w-0.5 bg-white/30 z-10" style={{ left: '100%' }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {sortedTargets.length === 0 && (
        <div className="text-center py-12 glass-card rounded-2xl border border-white/10">
          <Target className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Sonuç bulunamadı</h3>
          <p className="text-gray-400">Arama veya filtreleme kriterlerinizi değiştirin.</p>
        </div>
      )}
    </div>
  );
}

function Users(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
