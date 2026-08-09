"use client";

import React, { useState, useEffect } from "react";
import { Radio, TrendingUp, Clock, User, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { generateRivalFeed, generateRivalComparison, RivalActivity, RivalComparison } from "@/src/lib/utils/rivalSimulator";
import { useStudyLogStore } from "@/src/lib/store/useStudyLogStore";
import { useAuthStore } from "@/src/lib/store/useAuthStore";

export function RivalRadarWidget() {
  const { currentUser } = useAuthStore();
  const { logs } = useStudyLogStore();
  const [activities, setActivities] = useState<RivalActivity[]>([]);
  const [comparisons, setComparisons] = useState<RivalComparison[]>([]);
  const [expanded, setExpanded] = useState(false);

  const activeExam = currentUser.activeExam || "kpss_lisans";

  useEffect(() => {
    // Generate initial data
    setActivities(generateRivalFeed(activeExam, 8));
    setComparisons(generateRivalComparison(activeExam, logs));
    
    // Simulate live feed updates every minute
    const interval = setInterval(() => {
      setActivities(prev => {
        const newFeed = generateRivalFeed(activeExam, 1);
        return [newFeed[0], ...prev.slice(0, 7)];
      });
    }, 60000);
    
    return () => clearInterval(interval);
  }, [activeExam, logs]);

  const displayedActivities = expanded ? activities : activities.slice(0, 4);

  return (
    <div className="rounded-3xl glass-panel p-6 border border-white/10 shadow-xl overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 z-0 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-display text-xl font-bold text-white flex items-center space-x-2">
            <Radio className="h-5 w-5 text-indigo-400" />
            <span>Rakip Radarı</span>
          </h2>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
        </div>
        <p className="text-xs text-gray-400 mb-6 font-medium">Elit adaylar (%10) şu anda nelere çalışıyor?</p>

        {/* Live Feed Section */}
        <div className="space-y-3 mb-8">
          <AnimatePresence initial={false}>
            {displayedActivities.map((activity, idx) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    activity.activityType === 'exam' ? 'bg-amber-500/20 text-amber-300' :
                    activity.activityType === 'flashcard' ? 'bg-purple-500/20 text-purple-300' :
                    'bg-indigo-500/20 text-indigo-300'
                  }`}>
                    {activity.activityType === 'study' ? <BookOpen className="h-4 w-4" /> :
                     activity.activityType === 'flashcard' ? <Clock className="h-4 w-4" /> :
                     <TrendingUp className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="text-sm text-gray-200">
                      Bir elit aday <strong className="text-white">{activity.subject}</strong> çalışıyor <span className="text-xs text-gray-400">({activity.durationMinutes} dk)</span>
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap ml-2">
                  {activity.timeAgo}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <button 
            onClick={() => setExpanded(!expanded)}
            className="w-full py-2 text-xs text-indigo-400 hover:text-indigo-300 flex items-center justify-center space-x-1 transition-colors"
          >
            <span>{expanded ? "Daha Az Göster" : "Tümünü Gör"}</span>
            {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>
        </div>

        {/* Comparison Section */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-400" />
            <span>Sen vs Elit Adaylar (Haftalık)</span>
          </h3>
          
          <div className="space-y-4">
            {comparisons.map((comp, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-medium text-gray-300">{comp.subject}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-gray-400">Sen: {comp.userHoursThisWeek}s | Elit: {comp.eliteAvgHoursPerWeek}s</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                      comp.gapStatus === 'ahead' ? 'bg-emerald-500/20 text-emerald-400' :
                      comp.gapStatus === 'behind' ? 'bg-rose-500/20 text-rose-400' :
                      'bg-indigo-500/20 text-indigo-400'
                    }`}>
                      {comp.gapStatus === 'ahead' ? 'Önde' :
                       comp.gapStatus === 'behind' ? 'Geride' : 'Takipte'}
                    </span>
                  </div>
                </div>
                
                {/* Progress bar representing comparison */}
                <div className="h-1.5 w-full bg-gray-700/50 rounded-full overflow-hidden flex">
                  {/* Elite target bar (background overlay) */}
                  <div className="h-full bg-white/10 relative w-full">
                     <div 
                      className={`h-full absolute top-0 left-0 ${
                        comp.gapStatus === 'ahead' ? 'bg-emerald-500' :
                        comp.gapStatus === 'behind' ? 'bg-rose-500' :
                        'bg-indigo-500'
                      }`}
                      style={{ width: `${Math.min((comp.userHoursThisWeek / (comp.eliteAvgHoursPerWeek * 1.5)) * 100, 100)}%` }}
                     />
                     {/* Marker for elite average */}
                     <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-white/50 z-10"
                      style={{ left: `${(comp.eliteAvgHoursPerWeek / (comp.eliteAvgHoursPerWeek * 1.5)) * 100}%` }}
                     />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
