"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuthStore, EXAM_METADATA } from "@/src/lib/store/useAuthStore";
import { useFriendStore } from "@/src/lib/store/useFriendStore";
import {
  Send,
  Lock,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Camera,
  X,
  Upload,
  Image as ImageIcon,
  MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface FeedPostItem {
  id: string;
  authorName: string;
  authorRole: string;
  visibility: "private_friends" | "public_community" | "admin_support";
  subject: string;
  questionText: string;
  imageUrl?: string;
  answerText?: string;
  isResolved: boolean;
  createdAt: string;
}

const initialPosts: FeedPostItem[] = [];

export default function SharedQAPage() {
  const { currentUser } = useAuthStore();
  const { friends } = useFriendStore();

  const activeExam = currentUser.activeExam || "kpss_lisans";
  
  const getExamCourses = (exam: string) => {
    switch (exam) {
      case "kpss_onlisans":
        return ["Türkçe", "Matematik", "Tarih", "Coğrafya", "Vatandaşlık"];
      case "kpss_ortaogretim":
        return ["Türkçe", "Matematik", "Tarih", "Coğrafya", "Vatandaşlık", "Güncel Bilgiler"];
      case "yds":
        return ["İngilizce"];
      case "ales":
        return ["Sayısal", "Sözel"];
      case "kpss_lisans":
      default:
        return ["Türkçe", "Matematik", "Tarih", "Coğrafya", "Vatandaşlık", "Hukuk", "İktisat", "Maliye", "Uluslararası İlişkiler"];
    }
  };

  const courses = getExamCourses(activeExam);

  const [posts, setPosts] = useState<FeedPostItem[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "private_friends" | "public_community" | "admin_support">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // New Post Form State
  const [subject, setSubject] = useState(courses[0] || "Türkçe");
  const [questionText, setQuestionText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [visibility, setVisibility] = useState<FeedPostItem["visibility"]>("private_friends");

  // Inline Answer State
  const [answerInputs, setAnswerInputs] = useState<Record<string, string>>({});

  // File & Camera Input Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsClient(true);
    if (!courses.includes(subject)) {
      setSubject(courses[0] || "Türkçe");
    }
    const saved = localStorage.getItem("kpss_feed_posts_v4");
    if (saved) {
      try {
        setPosts(JSON.parse(saved));
      } catch (e) {
        setPosts(initialPosts);
      }
    } else {
      setPosts(initialPosts);
    }
  }, [activeExam]);

  const savePostsToStorage = (newList: FeedPostItem[]) => {
    setPosts(newList);
    localStorage.setItem("kpss_feed_posts_v4", JSON.stringify(newList));
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setImageUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    const examTitle = EXAM_METADATA[activeExam]?.shortLabel || "KPSS";

    const newPost: FeedPostItem = {
      id: "post-" + Date.now(),
      authorName: currentUser.name,
      authorRole: `${currentUser.name} (${examTitle})`,
      visibility,
      subject,
      questionText,
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80",
      isResolved: false,
      createdAt: "Şimdi",
    };

    savePostsToStorage([newPost, ...posts]);
    setIsModalOpen(false);
    setQuestionText("");
    setImageUrl("");
  };

  const handleAddAnswer = (postId: string) => {
    const text = answerInputs[postId];
    if (!text || !text.trim()) return;

    const examTitle = EXAM_METADATA[activeExam]?.shortLabel || "KPSS";

    const updated = posts.map((p) =>
      p.id === postId
        ? {
            ...p,
            answerText: `${currentUser.name} (${examTitle}): ${text}`,
            isResolved: true,
          }
        : p
    );

    savePostsToStorage(updated);
    setAnswerInputs({ ...answerInputs, [postId]: "" });
  };

  const filteredPosts = posts.filter((p) => {
    if (activeTab === "all") return true;
    return p.visibility === activeTab;
  });

  if (!isClient) return null;

  return (
    <div className="space-y-6">
      {/* Hidden File Inputs for PC/Gallery and Camera */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageFileChange}
        className="hidden"
      />
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={cameraInputRef}
        onChange={handleImageFileChange}
        className="hidden"
      />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
              {EXAM_METADATA[activeExam]?.title || currentUser.roleLabel}
            </span>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
              Canlı Soru Panosu 💬
            </span>
          </div>
          <h1 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">
            Soru Paylaşımı ve Yardımlaşma
          </h1>
          <p className="text-xs text-gray-300 mt-1">
            Yapamadığın soruların fotoğrafını çekip paylaş, partnerinle veya toplulukla çöz!
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-2xl glass-button px-5 py-3 text-xs font-bold text-white shadow-xl flex items-center justify-center space-x-2 hover:scale-105 active:scale-95 transition-transform"
        >
          <Camera className="h-4 w-4 text-indigo-300" />
          <span>Soru / Fotoğraf Paylaş</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("all")}
          className={`rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap transition-all border ${
            activeTab === "all"
              ? "bg-indigo-600 border-indigo-500 text-white shadow-lg"
              : "glass-card text-gray-400 border-white/5 hover:text-white"
          }`}
        >
          Tüm Paylaşımlar ({posts.length})
        </button>
        <button
          onClick={() => setActiveTab("private_friends")}
          className={`rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap transition-all border flex items-center space-x-1.5 ${
            activeTab === "private_friends"
              ? "bg-indigo-600 border-indigo-500 text-white shadow-lg"
              : "glass-card text-gray-400 border-white/5 hover:text-white"
          }`}
        >
          <Lock className="h-3.5 w-3.5" />
          <span>Sadece Arkadaşlar</span>
        </button>
        <button
          onClick={() => setActiveTab("public_community")}
          className={`rounded-xl px-4 py-2 text-xs font-bold whitespace-nowrap transition-all border flex items-center space-x-1.5 ${
            activeTab === "public_community"
              ? "bg-emerald-600 border-emerald-500 text-white shadow-lg"
              : "glass-card text-gray-400 border-white/5 hover:text-white"
          }`}
        >
          <Globe className="h-3.5 w-3.5" />
          <span>Genel Topluluk</span>
        </button>
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="rounded-3xl glass-panel p-5 border border-white/10 shadow-xl space-y-4"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center font-bold text-indigo-200 text-sm">
                    {post.authorName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-xs sm:text-sm">
                      {post.authorName}
                    </h3>
                    <span className="text-[10px] text-gray-400 font-medium">{post.authorRole} • {post.createdAt}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                    {post.subject}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      post.isResolved
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    }`}
                  >
                    {post.isResolved ? "✓ Çözüldü" : "⏳ Çözüm Bekliyor"}
                  </span>
                </div>
              </div>

              {/* Post Body & Photo */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <p className="text-xs text-gray-200 font-medium leading-relaxed">
                    {post.questionText}
                  </p>
                </div>
                {post.imageUrl && (
                  <div className="md:col-span-1">
                    <img
                      src={post.imageUrl}
                      alt="Soru Görseli"
                      className="rounded-2xl border border-white/10 object-cover max-h-48 w-full shadow-md"
                    />
                  </div>
                )}
              </div>

              {/* Answer Section */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                {post.answerText ? (
                  <div className="rounded-2xl bg-emerald-950/40 p-3.5 border border-emerald-500/30 text-xs">
                    <p className="font-bold text-emerald-300 mb-1 flex items-center space-x-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span>Çözüm / Yanıt:</span>
                    </p>
                    <p className="text-gray-200 font-medium">{post.answerText}</p>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Çözümünü veya fikrini paylaş..."
                      value={answerInputs[post.id] || ""}
                      onChange={(e) => setAnswerInputs({ ...answerInputs, [post.id]: e.target.value })}
                      className="flex-1 rounded-xl bg-gray-900/90 px-3.5 py-2 text-xs text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:outline-none"
                    />
                    <button
                      onClick={() => handleAddAnswer(post.id)}
                      className="rounded-xl glass-button px-4 py-2 text-xs font-bold text-white shadow-md flex items-center space-x-1"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Yanıtla</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-3xl glass-panel p-8 text-center text-gray-400 border border-white/10">
            <MessageSquare className="h-10 w-10 text-indigo-400/50 mx-auto mb-2" />
            <p className="text-xs font-semibold">Henüz paylaşılan soru bulunmuyor.</p>
            <p className="text-[11px] text-gray-500 mt-1">İlk soruyu sen fotoğraflayıp toplulukla paylaşabilirsin!</p>
          </div>
        )}
      </div>

      {/* NEW POST MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg rounded-3xl glass-panel p-6 sm:p-7 border border-white/20 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-4">
                <div className="flex items-center space-x-2">
                  <Camera className="h-5 w-5 text-indigo-400" />
                  <h3 className="font-display text-lg font-bold text-white">
                    Yeni Soru veya Not Paylaş
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl glass-card p-1.5 text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-4">
                {/* Visibility Tier Selector */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Görünürlük Kademesi:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <div
                      onClick={() => setVisibility("private_friends")}
                      className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                        visibility === "private_friends"
                          ? "bg-indigo-600/30 border-indigo-500 text-white ring-2 ring-indigo-500/40"
                          : "glass-card text-gray-400 border-white/5 hover:text-white"
                      }`}
                    >
                      <Lock className="mx-auto h-4 w-4 mb-1 text-indigo-400" />
                      <span className="text-[10px] font-bold block">Arkadaşlar</span>
                    </div>

                    <div
                      onClick={() => setVisibility("public_community")}
                      className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                        visibility === "public_community"
                          ? "bg-emerald-600/30 border-emerald-500 text-white ring-2 ring-emerald-500/40"
                          : "glass-card text-gray-400 border-white/5 hover:text-white"
                      }`}
                    >
                      <Globe className="mx-auto h-4 w-4 mb-1 text-emerald-400" />
                      <span className="text-[10px] font-bold block">Topluluk</span>
                    </div>

                    <div
                      onClick={() => setVisibility("admin_support")}
                      className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                        visibility === "admin_support"
                          ? "bg-purple-600/30 border-purple-500 text-white ring-2 ring-purple-500/40"
                          : "glass-card text-gray-400 border-white/5 hover:text-white"
                      }`}
                    >
                      <ShieldCheck className="mx-auto h-4 w-4 mb-1 text-amber-400" />
                      <span className="text-[10px] font-bold block">Hoca/Destek</span>
                    </div>
                  </div>
                </div>

                {/* Course Selection filtered by activeExam */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Ders Seçin</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl bg-gray-900/90 px-3.5 py-2.5 text-xs text-white border border-white/10 focus:border-indigo-500 focus:outline-none font-bold"
                  >
                    {courses.map((c) => (
                      <option key={c} value={c} className="bg-gray-900 text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Question Text */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Soru Metni veya Açıklama</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Soru açıklamasını veya merak ettiğin konuyu yaz..."
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    className="w-full rounded-xl bg-gray-900/90 px-3.5 py-2.5 text-xs text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Photo Capture & Upload Buttons */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Soru Fotoğrafı Yükle / Çek</label>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      className="rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 p-3 text-xs font-bold text-white flex items-center justify-center space-x-2 transition-transform active:scale-95"
                    >
                      <Camera className="h-4 w-4 text-indigo-300" />
                      <span>📸 Kamera İle Çek</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 p-3 text-xs font-bold text-white flex items-center justify-center space-x-2 transition-transform active:scale-95"
                    >
                      <Upload className="h-4 w-4 text-emerald-300" />
                      <span>📁 Dosya / PC Seç</span>
                    </button>
                  </div>

                  {/* Image Preview Thumbnail */}
                  {imageUrl ? (
                    <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 max-h-40 bg-black/60 p-1">
                      <img src={imageUrl} alt="Soru Önizleme" className="h-36 w-full object-contain mx-auto rounded-xl" />
                      <button
                        type="button"
                        onClick={() => setImageUrl("")}
                        className="absolute top-2 right-2 rounded-full bg-rose-600 text-white p-1 shadow-md hover:bg-rose-500"
                        title="Fotoğrafı Kaldır"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <input
                      type="text"
                      placeholder="veya Görsel URL yapıştırın..."
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full rounded-xl bg-gray-900/90 px-3.5 py-2 text-xs text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:outline-none"
                    />
                  )}
                </div>

                <div className="pt-2 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-xl glass-card px-4 py-2.5 text-xs font-semibold text-gray-300 hover:text-white"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl glass-button px-5 py-2.5 text-xs font-bold text-white shadow-lg flex items-center space-x-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Paylaş ve Gönder</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
