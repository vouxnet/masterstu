"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, EXAM_METADATA, ExamType, generateFriendCode } from "@/src/lib/store/useAuthStore";
import { clearAllUserStats } from "@/src/lib/utils/resetStats";
import { useCurriculumStore } from "@/src/lib/store/useCurriculumStore";
import {
  GraduationCap,
  Flower2,
  School,
  Globe,
  BrainCircuit,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  UserCheck,
  BookOpen,
  Atom,
} from "lucide-react";
import { motion } from "framer-motion";

export default function OnboardingPage() {
  const router = useRouter();
  const { currentUser, setSelectedExams, setActiveExam, updateUserProfile } = useAuthStore();
  const { resetAllTopics } = useCurriculumStore();

  const [name, setName] = useState(currentUser.name || "Aday");
  const initialCode = currentUser.friendCode || generateFriendCode(currentUser.name || "Aday");
  const [friendCode, setFriendCodeState] = useState(initialCode);
  const [selectedExams, setSelectedExamsState] = useState<ExamType[]>(
    currentUser.selectedExams && currentUser.selectedExams.length > 0
      ? currentUser.selectedExams
      : ["kpss_lisans"]
  );

  const lockedExams: ExamType[] = ["yks_tyt", "yks_ayt", "kpss_ortaogretim", "yds", "ales"];

  const examOptions: { id: ExamType; icon: React.FC<{ className?: string }> }[] = [
    { id: "kpss_lisans", icon: GraduationCap },
    { id: "kpss_onlisans", icon: Flower2 },
    { id: "kpss_ortaogretim", icon: School },
    { id: "yds", icon: Globe },
    { id: "ales", icon: BrainCircuit },
    { id: "yks_tyt", icon: BookOpen },
    { id: "yks_ayt", icon: Atom },
  ];

  const toggleExamSelection = (id: ExamType) => {
    if (selectedExams.includes(id)) {
      if (selectedExams.length === 1) return; // Must keep at least one
      setSelectedExamsState(selectedExams.filter((e) => e !== id));
    } else {
      setSelectedExamsState([...selectedExams, id]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanCode = friendCode.trim().startsWith("#") ? friendCode.trim().toUpperCase() : `#${friendCode.trim().toUpperCase()}`;
    updateUserProfile(name, currentUser.email, currentUser.avatarUrl, cleanCode);
    setSelectedExams(selectedExams);
    setActiveExam(selectedExams[0]);

    // Seçilen sınava göre müfredatı sıfırla/güncelle
    const examToRole: Record<string, string> = {
      kpss_lisans: "lisans_alan",
      kpss_onlisans: "onlisans",
      kpss_ortaogretim: "ortaogretim",
      yds: "yds",
      ales: "ales",
      yks_tyt: "yks_tyt",
      yks_ayt: "yks_ayt",
    };
    const role = examToRole[selectedExams[0]] || "lisans_alan";
    // Sınav seçimi yapılınca tüm istatistik ve verileri 0'dan sıfırla
    clearAllUserStats(selectedExams[0]);

    localStorage.setItem('asimptot_onboarded', 'true');

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 shadow-2xl space-y-8 z-10 my-8"
      >
        {/* Header Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 rounded-full bg-indigo-500/20 px-4 py-1.5 text-xs font-bold text-indigo-300 border border-indigo-500/30">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>Asimptot Sınav Seçimi</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
            Hazırlandığın Sınavları Seç! 🚀
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto">
            Sisteme dahil olduğunda panelin seçtiğin sınavlara özel olarak hazırlanır. Dilediğin kadar sınavı aynı anda seçebilirsin!
          </p>
        </div>

        {/* User Info & Friend Code Editor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl glass-card p-5 border border-white/10">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0">
              {name.charAt(0)}
            </div>
            <div className="w-full">
              <p className="text-[10px] text-gray-400 font-semibold uppercase">Profil Adın</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent font-display font-bold text-white text-base border-b border-white/20 focus:border-indigo-500 focus:outline-none py-0.5"
                placeholder="Adınız Soyadınız"
              />
            </div>
          </div>

          <div>
            <p className="text-[10px] text-amber-300 font-semibold uppercase mb-1">
              ✨ Otomatik Duo Arkadaş Kodunuz (Değiştirilemez Özel Kimlik):
            </p>
            <div className="flex items-center space-x-2 bg-gray-900/90 px-3.5 py-2 rounded-xl border border-amber-500/40">
              <span className="font-mono font-extrabold text-amber-300 text-sm tracking-wider">{friendCode}</span>
              <span className="text-[9px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 ml-auto font-bold">Özel Kod</span>
            </div>
            <p className="text-[9px] text-gray-400 mt-1">Sistem tarafından adınıza özel oluşturulmuştur. Başkaları bu kod ile sizi arkadaş ekleyebilir.</p>
          </div>
        </div>

        {/* Multi-Exam Selection Grid */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
            Hedef ÖSYM Sınavların (Çoklu Seçim):
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {examOptions.map((opt) => {
              const meta = EXAM_METADATA[opt.id];
              const Icon = opt.icon;
              const isSelected = selectedExams.includes(opt.id);
              const isLocked = lockedExams.includes(opt.id);

              return (
                <div
                  key={opt.id}
                  onClick={() => {
                    if (isLocked) return;
                    toggleExamSelection(opt.id);
                  }}
                  title={isLocked ? "Bu sınav yakında eklenecek" : undefined}
                  className={`group relative flex flex-col justify-between rounded-3xl p-5 border transition-all duration-300 ${
                    isLocked
                      ? "opacity-50 cursor-not-allowed glass-card border-white/5"
                      : isSelected
                      ? "cursor-pointer bg-gradient-to-br from-indigo-600/30 to-purple-600/20 border-indigo-500/60 shadow-xl ring-2 ring-indigo-500/40"
                      : "cursor-pointer glass-card border-white/5 hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  {isLocked && (
                    <span className="absolute top-2 right-2 rounded-full bg-gray-700 px-2 py-0.5 text-[9px] font-bold text-gray-400 z-10">
                      🔒 Yakında
                    </span>
                  )}

                  <div className="flex items-start justify-between mb-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 p-2.5 backdrop-blur-md">
                      <Icon className="h-6 w-6 text-indigo-300" />
                    </div>
                    {isSelected && !isLocked && (
                      <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0 animate-pulse" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-display font-bold text-white text-base group-hover:text-indigo-300 transition-colors">
                        {meta.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-xs text-gray-300 line-clamp-2">
                      {meta.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Action */}
        <form onSubmit={handleSubmit} className="pt-4 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto rounded-2xl glass-button px-8 py-4 text-sm font-bold text-white shadow-2xl flex items-center justify-center space-x-3 transition-transform active:scale-95 bg-gradient-to-r from-indigo-600 to-purple-600 border border-indigo-400/40"
          >
            <span>Paneli Oluştur & Platforma Gir 🚀</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
