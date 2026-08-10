"use client";

import React, { useState } from "react";
import { useAdminStore, CmsContentItem } from "@/src/lib/store/useAdminStore";
import { Layout, Plus, Edit3, Trash2, CheckCircle2, FileText, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CmsContentTab: React.FC = () => {
  const { cmsContents, updateCmsContent, addCmsContent, deleteCmsContent } = useAdminStore();

  const [isCmsModalOpen, setIsCmsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CmsContentItem | null>(null);

  const [page, setPage] = useState("Gösterge Paneli (/)");
  const [sectionKey, setSectionKey] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [bodyText, setBodyText] = useState("");

  const handleOpenAdd = () => {
    setEditingItem(null);
    setPage("Gösterge Paneli (/)");
    setSectionKey(`sec_${Date.now()}`);
    setTitle("");
    setSubtitle("");
    setBodyText("");
    setIsCmsModalOpen(true);
  };

  const handleOpenEdit = (item: CmsContentItem) => {
    setEditingItem(item);
    setPage(item.page);
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
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl glass-card p-4 border border-white/10">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600/30 text-cyan-400 border border-cyan-500/30">
            <Layout className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-base">Sayfa Metinleri & CMS Yönetimi</h3>
            <p className="text-xs text-gray-400">Platformdaki tüm başlıkları, duyuruları ve karşılama metinlerini anında güncelleyin.</p>
          </div>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center space-x-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white px-3.5 py-2 text-xs font-bold shadow-lg shadow-cyan-600/30 transition-all active:scale-95 whitespace-nowrap"
        >
          <Plus className="h-4 w-4" />
          <span>Yeni Metin / Duyuru Ekle</span>
        </button>
      </div>

      {/* CMS Items List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cmsContents.map((item) => (
          <div key={item.id} className="rounded-2xl glass-panel p-5 border border-white/10 shadow-xl space-y-3 relative hover:border-cyan-500/30 transition-all">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-cyan-500/20 px-2.5 py-1 text-[10px] font-bold text-cyan-300 border border-cyan-500/30">
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

            <div>
              <h4 className="font-display font-bold text-white text-base">{item.title}</h4>
              <p className="text-xs text-amber-300 font-medium mt-0.5">{item.subtitle}</p>
            </div>

            <p className="text-xs text-gray-300 bg-black/30 p-3 rounded-xl border border-white/5 leading-relaxed">
              {item.bodyText}
            </p>

            <div className="text-[10px] text-gray-500 font-mono text-right pt-1">
              Son Güncelleme: {item.updatedAt}
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit CMS Modal */}
      <AnimatePresence>
        {isCmsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-display font-bold text-white text-base">
                  {editingItem ? "Metin Bloğunu Düzenle" : "Yeni CMS Metin Bloğu"}
                </h3>
                <button onClick={() => setIsCmsModalOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Hedef Sayfa</label>
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
                  <label className="block text-gray-300 font-semibold mb-1">Ana Başlık (Title)</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Başlığı yazınız..."
                    className="w-full rounded-xl bg-black/50 px-3.5 py-2.5 text-white border border-white/10 focus:border-cyan-500 focus:outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Alt Başlık (Subtitle)</label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Alt başlığı yazınız..."
                    className="w-full rounded-xl bg-black/50 px-3.5 py-2.5 text-amber-300 border border-white/10 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Açıklama / Metin Gövdesi</label>
                  <textarea
                    rows={4}
                    required
                    value={bodyText}
                    onChange={(e) => setBodyText(e.target.value)}
                    placeholder="Sayfada görünecek ana metin..."
                    className="w-full rounded-xl bg-black/50 px-3.5 py-2.5 text-white border border-white/10 focus:border-cyan-500 focus:outline-none"
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
                    className="rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2.5 font-bold shadow-lg shadow-cyan-600/30"
                  >
                    Kaydet ve Canlıya Al
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
