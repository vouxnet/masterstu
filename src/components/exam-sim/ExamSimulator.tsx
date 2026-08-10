"use client";

import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { DuelQuestion } from "@/src/lib/data/duelQuestions";
import { Clock, ChevronLeft, ChevronRight, AlertTriangle, Flag } from "lucide-react";

export interface SimulationResult {
  totalQuestions: number;
  correct: number;
  wrong: number;
  blank: number;
  net: number; // correct - wrong/4
  durationSeconds: number; // actual time used
  completedAt: string;
  gaveUp: boolean; // true if exited fullscreen twice
  stressScore: number; // 0-100, based on completion and time usage
  answers: Record<number, number | null>; // user's answers map
}

interface ExamSimulatorProps {
  questions: DuelQuestion[];
  durationMinutes: number; // 30, 60, or 120
  onComplete: (result: SimulationResult) => void;
  onCancel: () => void;
}

export default function ExamSimulator({ questions, durationMinutes, onComplete, onCancel }: ExamSimulatorProps) {
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [warningCount, setWarningCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [warningCountdown, setWarningCountdown] = useState(10);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Fullscreen management
  useEffect(() => {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    }
    
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        // Exited fullscreen
        setWarningCount(prev => {
          const newCount = prev + 1;
          if (newCount === 1) {
            setShowWarning(true);
            setWarningCountdown(10);
          } else if (newCount >= 2) {
            handleGiveUp();
          }
          return newCount;
        });
      }
    };
    
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(err => console.error(err));
      }
    };
  }, []);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Warning countdown
  useEffect(() => {
    if (showWarning && warningCountdown > 0) {
      const timer = setInterval(() => {
        setWarningCountdown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (showWarning && warningCountdown === 0) {
      handleGiveUp();
    }
  }, [showWarning, warningCountdown]);

  const returnToFullscreen = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().then(() => {
        setShowWarning(false);
      }).catch(err => console.error(err));
    }
  };

  const handleGiveUp = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen();
    }
    const result = calculateResult(true);
    onComplete(result);
  };

  const handleSubmit = () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen();
    }
    const result = calculateResult(false);
    onComplete(result);
  };

  const calculateResult = (gaveUp: boolean): SimulationResult => {
    let correct = 0;
    let wrong = 0;
    let blank = 0;

    questions.forEach((q, idx) => {
      const ans = answers[idx];
      if (ans === undefined || ans === null) {
        blank++;
      } else if (ans === q.correctIndex) {
        correct++;
      } else {
        wrong++;
      }
    });

    const net = correct - (wrong / 4);
    const durationSeconds = (durationMinutes * 60) - timeLeft;
    
    // Stress score: basic calc
    let stressScore = 50;
    if (gaveUp) {
      stressScore = 100;
    } else {
      const timeRatio = durationSeconds / (durationMinutes * 60);
      const answerRatio = (correct + wrong) / questions.length;
      stressScore = Math.min(100, Math.max(0, (timeRatio * 50) + ((1 - answerRatio) * 50)));
    }

    return {
      totalQuestions: questions.length,
      correct,
      wrong,
      blank,
      net: Number(net.toFixed(2)),
      durationSeconds,
      completedAt: new Date().toISOString(),
      gaveUp,
      stressScore: Math.round(stressScore),
      answers: { ...answers }
    };
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeLeft < 300; // less than 5 min

  const currentQ = questions[currentQuestionIndex];

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex flex-col bg-[#0a0a0a] text-white" ref={containerRef}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <Flag className="w-5 h-5 text-rose-500" />
          <span className="font-bold tracking-widest text-gray-400 text-sm">ÖSYM SİMÜLASYONU</span>
        </div>
        
        <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-xl font-bold border ${isLowTime ? 'bg-red-500/20 text-red-500 border-red-500/50 animate-pulse' : 'bg-white/5 text-gray-300 border-white/10'}`}>
          <Clock className="w-5 h-5" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12">
        <div className="max-w-3xl w-full mx-auto">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-white/10 text-gray-400 rounded-md text-xs font-bold uppercase tracking-wider mb-4">
              {currentQ.subject} - Soru {currentQuestionIndex + 1}
            </span>
            <h2 className="text-xl md:text-2xl font-medium leading-relaxed">
              {currentQ.question}
            </h2>
          </div>

          <div className="space-y-3 mb-12">
            {currentQ.options.map((opt, idx) => {
              const isSelected = answers[currentQuestionIndex] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setAnswers(prev => ({ ...prev, [currentQuestionIndex]: idx }))}
                  className={`w-full p-4 rounded-xl text-left font-medium transition-colors border ${
                    isSelected
                      ? 'bg-indigo-600/30 border-indigo-500 text-white'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span className="mr-4 text-gray-500 font-bold">{String.fromCharCode(65 + idx)})</span>
                  {opt}
                </button>
              );
            })}
            <button
              onClick={() => setAnswers(prev => {
                const next = { ...prev };
                delete next[currentQuestionIndex];
                return next;
              })}
              className="text-xs text-gray-500 hover:text-white underline mt-4 inline-block"
            >
              Seçimi Temizle
            </button>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="bg-[#111] p-4 border-t border-white/10 flex flex-col space-y-4">
        <div className="flex flex-wrap gap-2 justify-center max-h-32 overflow-y-auto">
          {questions.map((_, idx) => {
            const isAnswered = answers[idx] !== undefined && answers[idx] !== null;
            const isCurrent = currentQuestionIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${
                  isCurrent ? 'ring-2 ring-indigo-500 bg-indigo-500/20 text-indigo-300' :
                  isAnswered ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                  'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
        
        <div className="flex items-center justify-between max-w-3xl w-full mx-auto">
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-lg text-gray-300 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Önceki</span>
          </button>
          
          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition-colors"
          >
            Sınavı Bitir
          </button>
          
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
            disabled={currentQuestionIndex === questions.length - 1}
            className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-lg text-gray-300 disabled:opacity-50"
          >
            <span>Sonraki</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Warning Modal (1st Exit) */}
      {showWarning && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-rose-500/50 p-8 rounded-2xl max-w-md text-center space-y-6">
            <AlertTriangle className="w-16 h-16 text-rose-500 mx-auto animate-pulse" />
            <h3 className="text-2xl font-bold text-white">⚠️ Dikkat!</h3>
            <p className="text-gray-300">
              Gerçek sınavda bu hakkın yok. Tam ekrandan çıktın!
            </p>
            <p className="text-3xl font-mono text-rose-500 font-bold">
              {warningCountdown}
            </p>
            <button
              onClick={returnToFullscreen}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors"
            >
              Sınava Geri Dön
            </button>
          </div>
        </div>
      )}

      {/* Submit Confirm Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-white/10 p-8 rounded-2xl max-w-md text-center space-y-6">
            <h3 className="text-2xl font-bold text-white">Emin misin?</h3>
            <p className="text-gray-300">
              Sınavı bitirmek istediğine emin misin? Bu işlem geri alınamaz.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-colors"
              >
                Bitir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}
