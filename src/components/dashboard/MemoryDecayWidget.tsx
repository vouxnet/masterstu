"use client";

import React, { useMemo } from "react";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { useStudyLogStore } from "@/src/lib/store/useStudyLogStore";
import { useCurriculumStore } from "@/src/lib/store/useCurriculumStore";
import { computeMemoryMap } from "@/src/lib/utils/memoryDecay";
import { Brain, AlertTriangle, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MemoryDecayWidget() {
  const { currentUser } = useAuthStore();
  const { logs } = useStudyLogStore();
  const { topics } = useCurriculumStore();

  const activeExam = currentUser.activeExam || "kpss_lisans";

  const memoryMap = useMemo(() => {
    return computeMemoryMap(topics, logs, activeExam);
  }, [topics, logs, activeExam]);

  // Pick top critical/decaying topic per course for a balanced view across all subjects
  const displayTopics = useMemo(() => {
    const courseMap = new Map<string, typeof memoryMap[0]>();
    memoryMap.forEach((item) => {
      if (!courseMap.has(item.course)) {
        courseMap.set(item.course, item);
      }
    });
    const result = Array.from(courseMap.values());
    if (result.length < 8) {
      const remaining = memoryMap.filter((item) => !result.includes(item));
      result.push(...remaining.slice(0, 8 - result.length));
    }
    return result.slice(0, 8);
  }, [memoryMap]);

  const criticalCount = memoryMap.filter((t) => t.status === "critical").length;
  const decayingCount = memoryMap.filter((t) => t.status === "decaying").length;

  return (
    <div className="rounded-3xl glass-panel p-6 border border-white/10 shadow-xl space-y-5 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-lg">
          <Brain className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display font-bold text-white text-base">🧠 Hafıza Durumu</h3>
          <p className="text-xs text-gray-400">
            Ebbinghaus Unutma Eğrisi — konuların ne kadar eridiğini gösterir
          </p>
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-4 mt-4">
        {displayTopics.map((topic, index) => {
          let barColor = "bg-gray-500";
          let textColor = "text-gray-400";
          let pulseClass = "";

          if (topic.status === "critical") {
            barColor = "bg-red-500";
            textColor = "text-red-400";
            pulseClass = "animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]";
          } else if (topic.status === "decaying") {
            barColor = "bg-amber-500";
            textColor = "text-amber-400";
          } else if (topic.status === "fresh") {
            barColor = "bg-emerald-500";
            textColor = "text-emerald-400";
          }

          const retentionDisplay = topic.status === "never_studied" ? 0 : Math.round(topic.retention);

          return (
            <div key={topic.topicId} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 truncate pr-2">
                  <span className="font-semibold text-gray-300 shrink-0">{topic.course}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400 truncate">{topic.topic}</span>
                  {topic.status === "critical" && (
                    <AlertTriangle className="h-3 w-3 text-red-500 shrink-0" />
                  )}
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  <span className="text-[10px] text-gray-500">
                    {topic.lastStudiedDate
                      ? `${topic.lastStudiedDate.split("T")[0]}`
                      : "Hiç çalışılmadı"}
                  </span>
                  <span className={`font-bold ${textColor}`}>
                    {retentionDisplay}%
                  </span>
                </div>
              </div>
              
              <div className="h-2 w-full rounded-full bg-gray-800/50 border border-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${retentionDisplay}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-full rounded-full ${barColor} ${pulseClass}`}
                />
              </div>
            </div>
          );
        })}

        {displayTopics.length === 0 && (
          <div className="text-center py-6 text-sm text-gray-400">
            Henüz konu veya çalışma verisi yok.
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
        <div className="text-xs text-gray-300">
          <span className="font-bold text-red-400">{criticalCount}</span> konu kritik seviyede, {" "}
          <span className="font-bold text-amber-400">{decayingCount}</span> konu eriyor
        </div>
        <Link href="/curriculum" className="flex items-center space-x-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-colors px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-600/20">
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Acil Tekrar Et</span>
        </Link>
      </div>
    </div>
  );
}
