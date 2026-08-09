"use client";

import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { useFriendStore } from "@/src/lib/store/useFriendStore";
import {
  Send,
  Lock,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Camera,
  X,
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

// Initial posts empty for real data
const initialPosts: FeedPostItem[] = [];

export default function SharedQAPage() {
  const { currentUser } = useAuthStore();
  const { friends } = useFriendStore();

  const [posts, setPosts] = useState<FeedPostItem[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "private_friends" | "public_community" | "admin_support">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // New Post Form State
  const [subject, setSubject] = useState("Türkçe");
  const [questionText, setQuestionText] = useState("");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80");
  const [visibility, setVisibility] = useState<FeedPostItem["visibility"]>("private_friends");

  // Inline Answer State
  const [answerInputs, setAnswerInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    setIsClient(true);
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
  }, []);

  const savePostsToStorage = (newList: FeedPostItem[]) => {
    setPosts(newList);
    localStorage.setItem("kpss_feed_posts_v4", JSON.stringify(newList));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    const newPost: FeedPostItem = {
      id: "post-" + Date.now(),
      authorName: currentUser.name,
      authorRole: currentUser.role === "lisans_alan" ? "Lisans + Alan" : "Önlisans",
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
  };

  const handleAddAnswer = (postId: string) => {
    const text = answerInputs[postId];
    if (!text || !text.trim()) return;

    const updated = posts.map((p) =>
      p.id === postId
        ? {
            ...p,
            answerText: `${currentUser.name} (${currentUser.role === "lisans_alan" ? "Lisans" : "Önlisans"}): ${text}`,
            isResolved: true,
          }
        : p
    );

    savePostsToStorage(updated);
    setAnswerInputs((prev) => ({ ...prev, [postId]: "" }));
  };

  if (!isClient) {
    return <div className="p-8 text-center text-gray-400">Yükleniyor...</div>;
  }

  const filteredPosts = posts.filter((p) => {
    if (activeTab === "all") return true;
    return p.visibility === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
              3 Kademeli Canlı Akış
            </span>
            <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-300 border border-emerald-500/30">
              {filteredPosts.length} Soru Paylaşıldı
            </span>
          </div>
          <h1 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">
            Canlı Soru & Not Akışı
          </h1>
          <p className="text-xs text-gray-300 mt-1">
            Sorularını Sadece Partnerine/Arkadaşına 🔒, Tüm Topluluğa 🌐 veya Yönetim/Hocaya 🛡️ Gönder!
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-xl glass-button px-5 py-3 text-xs font-bold text-white shadow-xl flex items-center justify-center space-x-2 transition-transform active:scale-95 bg-gradient-to-r from-indigo-600 to-purple-600 border border-indigo-400/40"
        >
          <Camera className="h-4 w-4 text-amber-300" />
          <span>+ Soru & Görsel Paylaş 📸</span>
        </button>
      </div>

      {/* 3 Visibility Tier Filter Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("all")}
          className={`rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all border ${
            activeTab === "all"
              ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30"
              : "glass-card text-gray-400 border-white/5 hover:text-white"
          }`}
        >
          Tüm Akış ({posts.length})
        </button>

        <button
          onClick={() => setActiveTab("private_friends")}
          className={`rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all border flex items-center space-x-1.5 ${
            activeTab === "private_friends"
              ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30"
              : "glass-card text-gray-400 border-white/5 hover:text-white"
          }`}
        >
          <Lock className="h-3.5 w-3.5 text-indigo-400" />
          <span>🔒 Sadece Arkadaşlarım ({posts.filter((p) => p.visibility === "private_friends").length})</span>
        </button>

        <button
          onClick={() => setActiveTab("public_community")}
          className={`rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all border flex items-center space-x-1.5 ${
            activeTab === "public_community"
              ? "bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-600/30"
              : "glass-card text-gray-400 border-white/5 hover:text-white"
          }`}
        >
          <Globe className="h-3.5 w-3.5 text-emerald-400" />
          <span>🌐 Genel Topluluk ({posts.filter((p) => p.visibility === "public_community").length})</span>
        </button>

        <button
          onClick={() => setActiveTab("admin_support")}
          className={`rounded-xl px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all border flex items-center space-x-1.5 ${
            activeTab === "admin_support"
              ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/30"
              : "glass-card text-gray-400 border-white/5 hover:text-white"
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
          <span>🛡️ Yönetim & Hoca ({posts.filter((p) => p.visibility === "admin_support").length})</span>
        </button>
      </div>

      {/* Feed Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="rounded-3xl glass-panel p-6 border border-white/10 shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <span className="font-display font-bold text-white text-sm">
                    {post.authorName} ({post.authorRole})
                  </span>
                  <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[11px] font-bold text-indigo-300 border border-indigo-500/30">
                    {post.subject}
                  </span>
                </div>

                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold flex items-center space-x-1 border ${
                    post.visibility === "private_friends"
                      ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                      : post.visibility === "public_community"
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-300 border-amber-500/30"
                  }`}
                >
                  {post.visibility === "private_friends" ? (
                    <>
                      <Lock className="h-3 w-3" /> <span>Sadece Arkadaşlar</span>
                    </>
                  ) : post.visibility === "public_community" ? (
                    <>
                      <Globe className="h-3 w-3" /> <span>Genel Akış</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-3 w-3" /> <span>Yönetim/Hoca</span>
                    </>
                  )}
                </span>
              </div>

              {/* Question Text */}
              <p className="text-xs text-gray-200 font-medium mb-3">{post.questionText}</p>

              {/* Image Preview */}
              {post.imageUrl && (
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 mb-3">
                  <img
                    src={post.imageUrl}
                    alt="Soru Görseli"
                    className="h-52 w-full object-cover"
                  />
                </div>
              )}

              {/* Solution Answer Box */}
              {post.answerText && (
                <div className="rounded-2xl bg-emerald-950/40 p-3.5 border border-emerald-500/30 text-xs text-emerald-200 space-y-1">
                  <p className="font-bold flex items-center space-x-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Çözüm / Yanıt:</span>
                  </p>
                  <p className="text-gray-200 leading-relaxed font-medium">{post.answerText}</p>
                </div>
              )}
            </div>

            {/* Answer Input Bar */}
            <div className="pt-2 border-t border-white/5 space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Çözümünü veya cevabını yaz..."
                  value={answerInputs[post.id] || ""}
                  onChange={(e) =>
                    setAnswerInputs({ ...answerInputs, [post.id]: e.target.value })
                  }
                  className="flex-1 rounded-xl bg-gray-900/90 px-3 py-2 text-xs text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:outline-none"
                />
                <button
                  onClick={() => handleAddAnswer(post.id)}
                  className="rounded-xl glass-button p-2 text-white shadow-md hover:scale-105 active:scale-95"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE POST MODAL WITH 3 VISIBILITY TIERS */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg rounded-3xl glass-panel p-6 sm:p-7 border border-white/20 shadow-2xl relative"
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
                {/* Visibility Tier Selector Cards */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2">
                    Paylaşım Görünürlük Kademesi:
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
                      <Lock className="mx-auto h-5 w-5 mb-1 text-indigo-400" />
                      <span className="text-[11px] font-bold block">Sadece Arkadaşlar</span>
                    </div>

                    <div
                      onClick={() => setVisibility("public_community")}
                      className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                        visibility === "public_community"
                          ? "bg-emerald-600/30 border-emerald-500 text-white ring-2 ring-emerald-500/40"
                          : "glass-card text-gray-400 border-white/5 hover:text-white"
                      }`}
                    >
                      <Globe className="mx-auto h-5 w-5 mb-1 text-emerald-400" />
                      <span className="text-[11px] font-bold block">Genel Topluluk</span>
                    </div>

                    <div
                      onClick={() => setVisibility("admin_support")}
                      className={`p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                        visibility === "admin_support"
                          ? "bg-purple-600/30 border-purple-500 text-white ring-2 ring-purple-500/40"
                          : "glass-card text-gray-400 border-white/5 hover:text-white"
                      }`}
                    >
                      <ShieldCheck className="mx-auto h-5 w-5 mb-1 text-amber-400" />
                      <span className="text-[11px] font-bold block">Yönetim / Hoca</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Ders</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl bg-gray-900/90 px-3.5 py-2.5 text-xs text-white border border-white/10 focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Türkçe" className="bg-gray-900">Türkçe</option>
                    <option value="Matematik" className="bg-gray-900">Matematik & Geometri</option>
                    <option value="Tarih" className="bg-gray-900">Tarih</option>
                    <option value="Coğrafya" className="bg-gray-900">Coğrafya</option>
                    <option value="Vatandaşlık" className="bg-gray-900">Vatandaşlık & Anayasa</option>
                    <option value="Hukuk" className="bg-gray-900">Hukuk (A Grubu)</option>
                    <option value="İktisat" className="bg-gray-900">İktisat (A Grubu)</option>
                    <option value="Maliye" className="bg-gray-900">Maliye (A Grubu)</option>
                    <option value="YDS İngilizce" className="bg-gray-900">YDS / YÖKDİL İngilizce</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Soru veya Not Metniniz</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Soru açıklamasını veya merak ettiğin konuyu yaz..."
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    className="w-full rounded-xl bg-gray-900/90 px-3.5 py-2.5 text-xs text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Fotoğraf URL (Örnek Soru)</label>
                  <input
                    type="text"
                    placeholder="Görsel adresi (boş bırakılırsa örnek fotoğraf)"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full rounded-xl bg-gray-900/90 px-3.5 py-2.5 text-xs text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:outline-none"
                  />
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
