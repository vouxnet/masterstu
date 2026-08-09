"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import {
  Camera,
  Plus,
  X,
  CheckCircle2,
  Trash2,
  MessageSquare,
  Send,
  Edit3,
  ChevronRight,
  Maximize2,
  Upload,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface CommentItem {
  id: string;
  author: string;
  authorRole: string;
  text: string;
  createdAt: string;
}

export interface MistakeItem {
  id: string;
  userRole: "lisans_alan" | "onlisans";
  examType?: string;
  subject: string;
  topic: string;
  reasonTag: "🧠 Bilgi Eksikliği" | "📐 İşlem Hatası" | "⚡ Dikkat Hatası" | "⏱️ Süre Yetişmedi";
  imageUrl: string;
  notes: string;
  solved: boolean;
  createdAt: string;
  comments: CommentItem[];
}

const initialMistakes: MistakeItem[] = [];

export default function MistakesPage() {
  const { currentUser } = useAuthStore();

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

  const [mistakes, setMistakes] = useState<MistakeItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMistake, setSelectedMistake] = useState<MistakeItem | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Form State for Add
  const [subject, setSubject] = useState(courses[0] || "Türkçe");
  const [topic, setTopic] = useState("");
  const [reasonTag, setReasonTag] = useState<MistakeItem["reasonTag"]>("🧠 Bilgi Eksikliği");
  const [notes, setNotes] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Refs for File & Camera Upload
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Comment & Note State for Detail View
  const [newCommentText, setNewCommentText] = useState("");
  const [editableNotes, setEditableNotes] = useState("");
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("kpss_mistakes_v2");
    if (saved) {
      try {
        setMistakes(JSON.parse(saved));
      } catch (e) {
        setMistakes(initialMistakes);
      }
    } else {
      setMistakes(initialMistakes);
    }
  }, []);

  const saveToStorage = (newList: MistakeItem[]) => {
    setMistakes(newList);
    localStorage.setItem("kpss_mistakes_v2", JSON.stringify(newList));
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

  const handleAddMistake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    const newItem: MistakeItem = {
      id: "m-" + Date.now(),
      userRole: currentUser.role,
      examType: activeExam,
      subject,
      topic,
      reasonTag,
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80",
      notes,
      solved: false,
      createdAt: new Date().toISOString().split("T")[0],
      comments: [],
    };

    saveToStorage([newItem, ...mistakes]);
    setIsAddModalOpen(false);
    setTopic("");
    setNotes("");
  };

  const openDetailModal = (item: MistakeItem) => {
    setSelectedMistake(item);
    setEditableNotes(item.notes);
    setIsEditingNotes(false);
    setNewCommentText("");
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMistake || !newCommentText.trim()) return;

    const newComment: CommentItem = {
      id: "c-" + Date.now(),
      author: currentUser.name,
      authorRole: currentUser.role === "lisans_alan" ? "Lisans + Alan" : "Önlisans",
      text: newCommentText,
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedItem = {
      ...selectedMistake,
      comments: [...(selectedMistake.comments || []), newComment],
    };

    const updatedList = mistakes.map((m) => (m.id === selectedMistake.id ? updatedItem : m));
    saveToStorage(updatedList);
    setSelectedMistake(updatedItem);
    setNewCommentText("");
  };

  const handleSaveNotes = () => {
    if (!selectedMistake) return;
    const updatedItem = { ...selectedMistake, notes: editableNotes };
    const updatedList = mistakes.map((m) => (m.id === selectedMistake.id ? updatedItem : m));
    saveToStorage(updatedList);
    setSelectedMistake(updatedItem);
    setIsEditingNotes(false);
  };

  const toggleSolved = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updatedList = mistakes.map((item) =>
      item.id === id ? { ...item, solved: !item.solved } : item
    );
    saveToStorage(updatedList);
    if (selectedMistake && selectedMistake.id === id) {
      setSelectedMistake({ ...selectedMistake, solved: !selectedMistake.solved });
    }
  };

  const deleteMistake = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updatedList = mistakes.filter((item) => item.id !== id);
    saveToStorage(updatedList);
    if (selectedMistake && selectedMistake.id === id) {
      setSelectedMistake(null);
    }
  };

  if (!isClient) {
    return <div className="p-8 text-center text-gray-400">Yükleniyor...</div>;
  }

  const userMistakes = mistakes.filter(m => !m.examType || m.examType === activeExam || courses.includes(m.subject));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/30">
              {currentUser.name} Profiline Özel
            </span>
            <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
              {userMistakes.length} Yanlış Soru
            </span>
          </div>
          <h1 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">
            Yanlış Kutusu (Mistake Vault)
          </h1>
          <p className="text-xs text-gray-300 mt-1">
            Sorulara tıklayarak detaylı çözümü görün, özel not ve partner yorumu ekleyin!
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="rounded-xl glass-button px-5 py-3 text-xs font-bold text-white shadow-xl flex items-center justify-center space-x-2 transition-transform active:scale-95"
        >
          <Camera className="h-4 w-4 text-amber-300" />
          <span>+ Yeni Yanlış Soru Ekle 📷</span>
        </button>
      </div>

      {/* Grid List */}
      {userMistakes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {userMistakes.map((item) => (
            <div
              key={item.id}
              onClick={() => openDetailModal(item)}
              className="rounded-3xl glass-panel p-5 border border-white/10 shadow-xl flex flex-col justify-between space-y-4 hover:border-indigo-500/40 hover:scale-[1.01] transition-all cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
                    {item.subject}
                  </span>
                  <span className="rounded-full bg-amber-500/20 px-3 py-1 text-[11px] font-bold text-amber-300 border border-amber-500/30">
                    {item.reasonTag}
                  </span>
                </div>

                <h4 className="font-display font-bold text-white text-base mb-2 group-hover:text-indigo-300 transition-colors">
                  {item.topic}
                </h4>
                {item.notes && (
                  <p className="text-xs text-gray-300 mb-3 bg-black/30 p-2.5 rounded-xl border border-white/5 line-clamp-2">
                    💡 {item.notes}
                  </p>
                )}

                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 relative">
                  <img
                    src={item.imageUrl}
                    alt="Yanlış Soru"
                    className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 right-2 rounded-xl bg-black/70 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur-md border border-white/20 flex items-center space-x-1">
                    <Maximize2 className="h-3 w-3 text-amber-300" />
                    <span>Detay & Yorumlar ({item.comments?.length || 0})</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                <button
                  onClick={(e) => toggleSolved(item.id, e)}
                  className={`flex items-center space-x-1.5 rounded-xl px-3 py-1.5 font-bold transition-all ${
                    item.solved
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{item.solved ? "✓ Öğrenildi" : "⏳ Tekrar Et"}</span>
                </button>

                <div className="flex items-center space-x-2">
                  <span className="text-indigo-400 font-bold hover:underline flex items-center">
                    Detayı Gör <ChevronRight className="h-4 w-4 ml-0.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 glass-panel rounded-3xl border border-white/10">
          <Camera className="mx-auto h-12 w-12 text-gray-500 mb-3 animate-bounce" />
          <h3 className="font-display text-lg font-bold text-white">Henüz Yanlış Soru Eklenmedi</h3>
          <p className="text-xs text-gray-400 mt-1 mb-4">
            Yapamadığın veya takıldığın soruların fotoğrafını ekleyerek detaylı incelemeye başla.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="rounded-xl glass-button px-5 py-2.5 text-xs font-bold text-white shadow-lg inline-flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>İlk Yanlış Sorunu Ekle</span>
          </button>
        </div>
      )}

      {/* DETAIL MODAL WITH FULL PHOTO + NOTES + COMMENTS */}
      <AnimatePresence>
        {selectedMistake && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-3xl rounded-3xl glass-panel p-6 sm:p-8 border border-white/20 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <div className="flex items-center space-x-3">
                  <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 border border-indigo-500/30">
                    {selectedMistake.subject}
                  </span>
                  <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/30">
                    {selectedMistake.reasonTag}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => deleteMistake(selectedMistake.id, e)}
                    className="p-2 rounded-xl text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Soruyu Sil"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setSelectedMistake(null)}
                    className="rounded-xl glass-card p-2 text-gray-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-display text-xl font-bold text-white mb-4 sm:text-2xl">
                {selectedMistake.topic}
              </h2>

              {/* Grid: Photo Left, Info & Comments Right */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Photo Column */}
                <div className="space-y-3">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-xl">
                    <img
                      src={selectedMistake.imageUrl}
                      alt="Yanlış Soru Tam Boyut"
                      className="w-full h-auto max-h-[400px] object-contain mx-auto"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                    <span>Tarih: {selectedMistake.createdAt}</span>
                    <button
                      onClick={() => toggleSolved(selectedMistake.id)}
                      className={`font-bold rounded-lg px-2.5 py-1 ${
                        selectedMistake.solved ? "text-emerald-400 bg-emerald-500/10" : "text-amber-400 bg-amber-500/10"
                      }`}
                    >
                      {selectedMistake.solved ? "✓ Öğrenildi" : "⏳ Çözülecek"}
                    </button>
                  </div>
                </div>

                {/* Right Column: Editable Notes & Comments */}
                <div className="space-y-5">
                  {/* Private User Note Section */}
                  <div className="rounded-2xl glass-card p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display text-xs font-bold text-indigo-300 flex items-center space-x-1.5">
                        <Edit3 className="h-4 w-4 text-indigo-400" />
                        <span>Kişisel Çözüm Notun</span>
                      </span>
                      {!isEditingNotes ? (
                        <button
                          onClick={() => setIsEditingNotes(true)}
                          className="text-[11px] font-semibold text-indigo-400 hover:underline"
                        >
                          Düzenle ✎
                        </button>
                      ) : (
                        <button
                          onClick={handleSaveNotes}
                          className="text-[11px] font-bold text-emerald-400 hover:underline"
                        >
                          Kaydet ✓
                        </button>
                      )}
                    </div>

                    {isEditingNotes ? (
                      <textarea
                        rows={3}
                        value={editableNotes}
                        onChange={(e) => setEditableNotes(e.target.value)}
                        className="w-full rounded-xl bg-gray-900/90 p-2.5 text-xs text-white border border-indigo-500/50 focus:outline-none"
                        placeholder="Sorunun pif noktalarını yazın..."
                      />
                    ) : (
                      <p className="text-xs text-gray-200 leading-relaxed font-medium">
                        {selectedMistake.notes || "Henüz özel çözüm notu eklenmedi. 'Düzenle'ye basarak ekleyin."}
                      </p>
                    )}
                  </div>

                  {/* Discussion & Partner Comments Section */}
                  <div className="rounded-2xl glass-card p-4 border border-white/10 space-y-3">
                    <div className="flex items-center space-x-2 border-b border-white/5 pb-2">
                      <MessageSquare className="h-4 w-4 text-amber-400" />
                      <h4 className="font-display text-xs font-bold text-white">
                        Partner Yorumları & Tartışma ({selectedMistake.comments?.length || 0})
                      </h4>
                    </div>

                    {/* Comment Feed */}
                    <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                      {selectedMistake.comments && selectedMistake.comments.length > 0 ? (
                        selectedMistake.comments.map((c) => (
                          <div
                            key={c.id}
                            className="rounded-xl bg-black/30 p-3 border border-white/5 text-xs space-y-1"
                          >
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-bold text-indigo-300">
                                {c.author} ({c.authorRole})
                              </span>
                              <span className="text-[10px] text-gray-500">{c.createdAt}</span>
                            </div>
                            <p className="text-gray-200">{c.text}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-[11px] text-gray-400 text-center py-2">
                          Henüz yorum yapılmadı. İlk yorumu sen yaz!
                        </p>
                      )}
                    </div>

                    {/* Add Comment Input */}
                    <form onSubmit={handleAddComment} className="flex items-center space-x-2 pt-2 border-t border-white/5">
                      <input
                        type="text"
                        placeholder="Soru hakkında yorum / açıklama yaz..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        className="flex-1 rounded-xl bg-gray-900/90 px-3 py-2 text-xs text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="rounded-xl glass-button p-2 text-white shadow-md hover:scale-105 active:scale-95"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL FOR ADDING NEW MISTAKE */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg rounded-3xl glass-panel p-6 sm:p-7 border border-white/20 shadow-2xl relative"
            >
              <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-4">
                <div className="flex items-center space-x-2">
                  <Camera className="h-5 w-5 text-amber-400" />
                  <h3 className="font-display text-lg font-bold text-white">
                    Yeni Yanlış Soru Ekle
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl glass-card p-1.5 text-gray-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleAddMistake} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Ders Seçin</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl bg-gray-900/90 px-3.5 py-2.5 text-xs text-white border border-white/10 focus:border-indigo-500 focus:outline-none"
                  >
                    {courses.map((c) => (
                      <option key={c} value={c} className="bg-gray-900 text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Konu Başlığı</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Paragrafta Yapı / Borçlar Hukuku Haksız Fiil"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full rounded-xl bg-gray-900/90 px-3.5 py-2.5 text-xs text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Hata Nedeni Etiketi</label>
                  <select
                    value={reasonTag}
                    onChange={(e) => setReasonTag(e.target.value as any)}
                    className="w-full rounded-xl bg-gray-900/90 px-3.5 py-2.5 text-xs text-white border border-white/10 focus:border-indigo-500 focus:outline-none font-bold"
                  >
                    <option value="🧠 Bilgi Eksikliği" className="bg-gray-900">🧠 Bilgi Eksikliği</option>
                    <option value="📐 İşlem Hatası" className="bg-gray-900">📐 İşlem Hatası</option>
                    <option value="⚡ Dikkat Hatası" className="bg-gray-900">⚡ Dikkat Hatası</option>
                    <option value="⏱️ Süre Yetişmedi" className="bg-gray-900">⏱️ Süre Yetişmedi</option>
                  </select>
                </div>

                {/* Hidden File Inputs */}
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
                      placeholder="veya Görsel URL bağlantısı yapıştırın..."
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full rounded-xl bg-gray-900/90 px-3.5 py-2 text-xs text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:outline-none"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Çözüm Notunuz & Hatırlatma</label>
                  <textarea
                    rows={3}
                    placeholder="Soru çözümünde nelere dikkat edilmeli?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-xl bg-gray-900/90 px-3.5 py-2.5 text-xs text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="rounded-xl glass-card px-4 py-2.5 text-xs font-semibold text-gray-300 hover:text-white"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl glass-button px-5 py-2.5 text-xs font-bold text-white shadow-lg flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Kaydet ve Ekle</span>
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
