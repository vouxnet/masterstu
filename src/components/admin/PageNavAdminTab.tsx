"use client";

import React, { useState } from "react";
import { useAdminStore, CustomPageRecord } from "@/src/lib/store/useAdminStore";
import { GitBranch, Eye, EyeOff, Plus, Trash2, Edit3, Globe, Layers, Check, X, ShieldAlert, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const PageNavAdminTab: React.FC = () => {
  const { sitePages, addSitePage, togglePageVisibility, updateSitePage, deleteSitePage } = useAdminStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<CustomPageRecord | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<CustomPageRecord["category"]>("Özel Sayfalar");
  const [badge, setBadge] = useState("");
  const [content, setContent] = useState("");

  const handleOpenAdd = () => {
    setEditingPage(null);
    setTitle("");
    setSlug("/ozel-sayfa");
    setCategory("Özel Sayfalar");
    setBadge("YENİ");
    setContent("Yeni oluşturulan özel sayfa içeriği...");
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (page: CustomPageRecord) => {
    setEditingPage(page);
    setTitle(page.title);
    setSlug(page.slug);
    setCategory(page.category);
    setBadge(page.badge || "");
    setContent(page.content);
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPage) {
      updateSitePage(editingPage.id, {
        title,
        slug,
        category,
        badge,
        content,
      });
    } else {
      addSitePage({
        title,
        slug,
        category,
        badge,
        isVisible: true,
        isSystem: false,
        content,
      });
    }
    setIsAddModalOpen(false);
  };

  const corePages = sitePages.filter((p) => p.category === "Temel Modüller");
  const practicePages = sitePages.filter((p) => p.category === "Pratik & Analiz");
  const customPages = sitePages.filter((p) => p.category === "Özel Sayfalar");

  return (
    <div className="space-y-6">
      {/* Action Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl glass-card p-4 border border-white/10">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/30 text-emerald-400 border border-emerald-500/30">
            <GitBranch className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-base">Site Sayfa, Kategori & Rota Yönetim Mimarı</h3>
            <p className="text-xs text-gray-400">
              Öğrenci panelindeki kategorileri, mevcut sayfaları gizleyip açın veya sıfırdan yeni özel dinamik rotalar oluşturun.
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center space-x-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all active:scale-95 whitespace-nowrap"
        >
          <Plus className="h-4 w-4" />
          <span>Yeni Sayfa / Rota Oluştur</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="space-y-6">
        {/* Category 1: Temel Modüller */}
        <div className="rounded-2xl glass-panel p-5 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h4 className="font-display font-bold text-white text-sm flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-400"></span>
              <span>1. Temel Navigasyon Modülleri ({corePages.length} Sayfa)</span>
            </h4>
            <span className="text-[10px] text-gray-400 font-mono">Öğrenci Sol Menüsünde Üst Grup</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {corePages.map((page) => (
              <div
                key={page.id}
                className={`p-3.5 rounded-xl glass-card border transition-all flex items-center justify-between ${
                  page.isVisible
                    ? "border-indigo-500/30 bg-indigo-950/20"
                    : "border-rose-500/20 bg-rose-950/10 opacity-60"
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xs text-white">{page.title}</span>
                    {page.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-indigo-500/20 text-indigo-300 font-mono">
                        {page.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400 font-mono mt-0.5">Rota: {page.slug}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => togglePageVisibility(page.id)}
                    className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                      page.isVisible
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        : "bg-rose-500/20 text-rose-300 border-rose-500/30"
                    }`}
                    title={page.isVisible ? "Sayfayı Gizle" : "Sayfayı Göster"}
                  >
                    {page.isVisible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                    <span>{page.isVisible ? "Yayında" : "Gizli"}</span>
                  </button>

                  <button
                    onClick={() => handleOpenEdit(page)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category 2: Pratik & Analiz Modülleri */}
        <div className="rounded-2xl glass-panel p-5 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h4 className="font-display font-bold text-white text-sm flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-purple-400"></span>
              <span>2. Pratik, Araçlar & Analiz Modülleri ({practicePages.length} Sayfa)</span>
            </h4>
            <span className="text-[10px] text-gray-400 font-mono">Öğrenci Sol Menüsünde Alt Grup</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {practicePages.map((page) => (
              <div
                key={page.id}
                className={`p-3.5 rounded-xl glass-card border transition-all flex items-center justify-between ${
                  page.isVisible
                    ? "border-purple-500/30 bg-purple-950/20"
                    : "border-rose-500/20 bg-rose-950/10 opacity-60"
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xs text-white">{page.title}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 font-mono mt-0.5">Rota: {page.slug}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => togglePageVisibility(page.id)}
                    className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                      page.isVisible
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        : "bg-rose-500/20 text-rose-300 border-rose-500/30"
                    }`}
                  >
                    {page.isVisible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                    <span>{page.isVisible ? "Yayında" : "Gizli"}</span>
                  </button>

                  <button
                    onClick={() => handleOpenEdit(page)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category 3: Özel Oluşturulan Dinamik Sayfalar */}
        <div className="rounded-2xl glass-panel p-5 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h4 className="font-display font-bold text-white text-sm flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
              <span>3. Özel Oluşturulmuş Ek Sayfalar & Rotalar ({customPages.length} Sayfa)</span>
            </h4>
            <button
              onClick={handleOpenAdd}
              className="text-xs text-emerald-400 hover:underline font-bold flex items-center gap-1"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Sayfa Ekle</span>
            </button>
          </div>

          {customPages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {customPages.map((page) => (
                <div key={page.id} className="p-3.5 rounded-xl glass-card border border-emerald-500/30 bg-emerald-950/20 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-xs text-white">{page.title}</span>
                    <p className="text-[10px] text-emerald-300 font-mono mt-0.5">Rota: {page.slug}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => togglePageVisibility(page.id)}
                      className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-bold border ${
                        page.isVisible
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                          : "bg-rose-500/20 text-rose-300 border-rose-500/30"
                      }`}
                    >
                      {page.isVisible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      onClick={() => deleteSitePage(page.id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-400 py-4 text-center">
              Henüz özel dinamik sayfa oluşturulmadı. "Yeni Sayfa / Rota Oluştur" butonuna basarak yeni içerik sayfası ekleyebilirsiniz.
            </p>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-display font-bold text-white text-base">
                  {editingPage ? "Sayfayı Düzenle" : "Yeni Dinamik Sayfa / Rota Oluştur"}
                </h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Sayfa / Menü Adı</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Örn: 2026 KPSS Rehberi"
                    className="w-full rounded-xl bg-black/50 px-3.5 py-2 text-white border border-white/10 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">URL Rotası (Slug)</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="Örn: /kpsskilavuzu"
                    className="w-full rounded-xl bg-black/50 px-3.5 py-2 text-emerald-300 font-mono border border-white/10 focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Menü Kategorisi</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full rounded-xl bg-black/50 px-3 py-2 text-white border border-white/10"
                    >
                      <option value="Temel Modüller">Temel Modüller</option>
                      <option value="Pratik & Analiz">Pratik & Analiz</option>
                      <option value="Özel Sayfalar">Özel Sayfalar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Rozet Etiketi (Opsiyonel)</label>
                    <input
                      type="text"
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      placeholder="Örn: YENİ"
                      className="w-full rounded-xl bg-black/50 px-3 py-2 text-amber-300 border border-white/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Sayfa İçeriği / Açıklama</label>
                  <textarea
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Sayfa içeriğini veya duyuru detaylarını yazınız..."
                    className="w-full rounded-xl bg-black/50 px-3.5 py-2 text-white border border-white/10"
                  />
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="rounded-xl px-4 py-2 text-gray-400 hover:text-white font-bold"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 font-bold shadow-lg shadow-emerald-600/30 flex items-center space-x-1.5"
                  >
                    <Check className="h-4 w-4" />
                    <span>Kaydet</span>
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
