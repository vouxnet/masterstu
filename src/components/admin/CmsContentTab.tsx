"use client";

import React, { useState } from "react";
import { useAdminStore, CmsContentItem } from "@/src/lib/store/useAdminStore";
import { Layout, Plus, Edit3, Trash2, CheckCircle2, FileText, X, Filter, Sparkles, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CmsContentTab: React.FC = () => {
  const { cmsContents, updateCmsContent, addCmsContent, deleteCmsContent } = useAdminStore();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCmsModalOpen, setIsCmsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CmsContentItem | null>(null);

  // Form states
  const [page, setPage] = useState("Gösterge Paneli (/)");
  const [category, setCategory] = useState<CmsContentItem["category"]>("home");
  const [sectionKey, setSectionKey] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [bodyText, setBodyText] = useState("");

  const categories = [
    { id: "all", label: "Tüm Sayfalar" },
    { id: "home", label: "📌 Ana Sayfa & Widgetlar" },
    { id: "exams", label: "📝 Deneme Sınavları" },
    { id: "placement", label: "🎯 Atama Hedefleri" },
    { id: "curriculum", label: "📚 Müfredat" },
    { id: "flashcards", label: "🎴 Bilgi Kartları" },
    { id: "aihub", label: "🤖 AI Hub & Koçluk" },
    { id: "mistakes", label: "📸 Yanlış Kutusu" },
    { id: "global", label: "🌐 Genel Metinler & Sloganlar" },
  ];

  const filteredContents = cmsContents.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.bodyText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.page.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setPage("Gösterge Paneli (/)");
    setCategory("home");
    setSectionKey(`sec_${Date.now()}`);
    setTitle("");
    setSubtitle("");
    setBodyText("");
    setIsCmsModalOpen(true);
  };

  const handleOpenEdit = (item: CmsContentItem) => {
    setEditingItem(item);
    setPage(item.page);
    setCategory(item.category || "home");
    setSectionKey(item.sectionKey);
    setTitle(item.title);
    setSubtitle(item.subtitle);
    setBodyText(item.bodyText);
    setIsCmsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateCmsContent(editingItem.id, title, subtitle, bodyText);
    } else {
      addCmsContent({
        page,
        category,
        sectionKey,
        title,
        subtitle,
        bodyText,
      });
    }
    setIsCmsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl glass-card p-4 border border-white/10">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600/30 text-cyan-400 border border-cyan-500/30">
            <Layout className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-base">Öğrenci Paneli Tüm Metin & CMS Yönetimi</h3>
            <p className="text-xs text-gray-400">Öğrenci panelindeki tüm başlıkları, duyuruları ve kart metinlerini noktasından virgülüne anında değiştirin.</p>
          </div>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center space-x-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white px-3.5 py-2 text-xs font-bold shadow-lg shadow-cyan-600/30 transition-all active:scale-95 whitespace-nowrap"
        >
          <Plus className="h-4 w-4" />
          <span>Yeni Metin / Kart Ekle</span>
        </button>
      </div>

      {/* Page Category Pills & Search Bar */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap border ${
                activeCategory === cat.id
                  ? "bg-cyan-600 text-white border-cyan-500 shadow-md shadow-cyan-600/30"
                  : "bg-black/40 text-gray-400 border-white/5 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Sayfa adı, başlık veya metinde canlı ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-black/50 pl-4 pr-4 py-2 text-xs text-white placeholder-gray-500 border border-white/10 focus:border-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      {/* CMS Content Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredContents.length > 0 ? (
          filteredContents.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl glass-panel p-5 border border-white/10 shadow-xl space-y-3 relative hover:border-cyan-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="rounded-md bg-cyan-500/20 px-2.5 py-1 text-[10px] font-bold text-cyan-300 border border-cyan-500/30 font-mono">
                    {item.page}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 p-1.5 border border-indigo-500/20 transition-transform active:scale-95"
                      title="Metni Düzenle"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Bu metin bloğunu silmek istediğinize emin misiniz?")) {
                          deleteCmsContent(item.id);
                        }
                      }}
                      className="rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 p-1.5 border border-rose-500/20 transition-transform active:scale-95"
                      title="Metni Sil"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <h4 className="font-display font-bold text-white text-base leading-snug">{item.title}</h4>
                {item.subtitle && <p className="text-xs text-amber-300 font-medium mt-0.5">{item.subtitle}</p>}

                <p className="text-xs text-gray-300 bg-black/40 p-3 rounded-xl border border-white/5 leading-relaxed mt-2">
                  {item.bodyText}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono pt-2 border-t border-white/5">
                <span>Anahtar: <code className="text-indigo-400">{item.sectionKey}</code></span>
                <span>Son Güncelleme: {item.updatedAt}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 p-12 text-center text-gray-400 glass-panel rounded-2xl border border-white/10">
            Aranan kriterlere uygun metin bloğu bulunamadı.
          </div>
        )}
      </div>

      {/* Add / Edit CMS Modal */}
      <AnimatePresence>
        {isCmsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-display font-bold text-white text-base">
                  {editingItem ? "Metin Bloğunu / Kartı Düzenle" : "Yeni CMS Metin Bloğu"}
                </h3>
                <button onClick={() => setIsCmsModalOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Hedef Sayfa Adı</label>
                    <input
                      type="text"
                      required
                      value={page}
                      onChange={(e) => setPage(e.target.value)}
                      placeholder="Örn: Gösterge Paneli (/)"
                      className="w-full rounded-xl bg-black/50 px-3.5 py-2.5 text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Kategori</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full rounded-xl bg-black/50 px-3 py-2.5 text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="home">Ana Sayfa & Widgetlar</option>
                      <option value="exams">Deneme Sınavları</option>
                      <option value="placement">Atama Hedefleri</option>
                      <option value="curriculum">Müfredat</option>
                      <option value="flashcards">Bilgi Kartları</option>
                      <option value="aihub">AI Hub & Koçluk</option>
                      <option value="mistakes">Yanlış Kutusu</option>
                      <option value="global">Genel Metinler & Sloganlar</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Sistem İçi Bölüm Kodu (sectionKey)</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingItem}
                    value={sectionKey}
                    onChange={(e) => setSectionKey(e.target.value)}
                    placeholder="Örn: home_banner"
                    className="w-full rounded-xl bg-black/50 px-3.5 py-2.5 text-indigo-300 font-mono border border-white/10 focus:border-cyan-500 focus:outline-none disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Ana Başlık (Title)</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Başlığı yazınız..."
                    className="w-full rounded-xl bg-black/50 px-3.5 py-2.5 text-white border border-white/10 focus:border-cyan-500 focus:outline-none font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Alt Başlık / Slogan (Subtitle)</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Alt başlığı veya sloganı yazınız..."
                    className="w-full rounded-xl bg-black/50 px-3.5 py-2.5 text-amber-300 border border-white/10 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Açıklama / Metin Gövdesi</label>
                  <textarea
                    rows={5}
                    required
                    value={bodyText}
                    onChange={(e) => setBodyText(e.target.value)}
                    placeholder="Sayfada görünecek ana metin içeriği..."
                    className="w-full rounded-xl bg-black/50 px-3.5 py-2.5 text-white border border-white/10 focus:border-cyan-500 focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsCmsModalOpen(false)}
                    className="rounded-xl px-4 py-2.5 text-gray-400 hover:text-white font-bold"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2.5 font-bold shadow-lg shadow-cyan-600/30 flex items-center space-x-1.5"
                  >
                    <Check className="h-4 w-4" />
                    <span>Kaydet ve Canlıya Al</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
