"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, RotateCw, Volume2, X, Headphones, Sparkles, VolumeX } from "lucide-react";
import { PodcastEpisode } from "@/src/lib/services/podcastService";
import { motion, AnimatePresence } from "framer-motion";

interface AudioPlayerBarProps {
  episode: PodcastEpisode | null;
  onClose: () => void;
}

export function AudioPlayerBar({ episode, onClose }: AudioPlayerBarProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (episode && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [episode]);

  if (!episode) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  const skipTime = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, Math.min(duration, audioRef.current.currentTime + seconds));
    }
  };

  const changeSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextSpeed = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "00:00";
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(mins).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 left-4 right-4 md:left-64 md:right-6 z-50 rounded-2xl glass-panel p-3.5 sm:p-4 border border-indigo-500/40 shadow-2xl bg-[#0F172A]/95 backdrop-blur-xl"
      >
        <audio
          ref={audioRef}
          src={episode.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left: Info */}
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/40">
              <Headphones className="h-5 w-5 animate-pulse" />
            </div>
            <div className="min-w-0 flex-1 sm:max-w-xs">
              <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider block">
                {episode.subject}
              </span>
              <h4 className="font-display font-bold text-white text-xs sm:text-sm truncate">
                {episode.title}
              </h4>
            </div>
          </div>

          {/* Center: Controls & Seekbar */}
          <div className="flex-1 w-full max-w-md space-y-1">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => skipTime(-10)}
                className="text-gray-400 hover:text-white transition-colors"
                title="10 saniye geri"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>

              <button
                onClick={() => skipTime(10)}
                className="text-gray-400 hover:text-white transition-colors"
                title="10 saniye ileri"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>

            {/* Seek slider */}
            <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-mono">
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Right: Speed & Mute & Close */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={changeSpeed}
              className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-indigo-300 font-mono text-[10px] font-bold border border-white/10"
              title="Oynatma Hızı"
            >
              {playbackSpeed}x
            </button>

            <button
              onClick={() => {
                setIsMuted(!isMuted);
                if (audioRef.current) audioRef.current.muted = !isMuted;
              }}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-rose-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
