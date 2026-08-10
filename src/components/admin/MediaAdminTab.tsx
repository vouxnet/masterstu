"use client";

import React, { useState } from "react";
import { Image, Upload, Trash2, CheckCircle2, ShieldCheck, Database, RefreshCw } from "lucide-react";
import { useAdminStore } from "@/src/lib/store/useAdminStore";

export const MediaAdminTab: React.FC = () => {
  const { resetToDefaults } = useAdminStore();
  const [successMsg, setSuccessMsg] = useState("");

  const handleResetData = () => {
    if (confirm("Tüm admin verilerini varsayılan fabrika ayarlarına döndürmek istediğinize emin misiniz?")) {
      resetToDefaults();
      setSuccessMsg("Tüm veriler başarıyla sıfırlandı ve güncellendi.");
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 rounded-2xl glass-card p-4 border border-white/10">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600/30 text-emerald-400 border border-emerald-500/30">
          <Image className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display font-bold text-white text-base">Medya Görselleri & Sistem Sağlığı</h3>
          <p className="text-xs text-gray-400">Banner resimleri, görsel varlıklar ve veritabanı fabrika ayarları paneli.</p>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Media Asset Manager */}
        <div className="rounded-2xl glass-panel p-5 border border-white/10 shadow-xl space-y-4">
          <h4 className="font-display font-bold text-white text-sm flex items-center gap-2">
            <Upload className="h-4 w-4 text-emerald-400" />
            <span>Platform Görsel Varlıkları (Banner & İkonlar)</span>
          </h4>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-black/40 border border-dashed border-white/20 flex flex-col items-center justify-center text-center space-y-2">
              <Image className="h-8 w-8 text-gray-500" />
              <p className="text-gray-300 font-semibold">Yeni Banner veya İkon Yükle</p>
              <p className="text-[10px] text-gray-500">PNG, JPG, SVG veya WEBP (Maks 5 MB)</p>
              <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-95">
                Dosya Seç
              </button>
            </div>
          </div>
        </div>

        {/* Database & System Controls */}
        <div className="rounded-2xl glass-panel p-5 border border-white/10 shadow-xl space-y-4">
          <h4 className="font-display font-bold text-white text-sm flex items-center gap-2">
            <Database className="h-4 w-4 text-amber-400" />
            <span>Sistem Bakım & Fabrika Ayarları</span>
          </h4>

          <p className="text-xs text-gray-300 leading-relaxed">
            Platform veritabanındaki tüm test sorularını, kullanıcı üyeliklerini ve CMS metinlerini fabrika ayarlarına döndürebilirsiniz.
          </p>

          <button
            onClick={handleResetData}
            className="w-full flex items-center justify-center space-x-2 rounded-xl bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 p-3 text-xs font-bold transition-all active:scale-95"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Tüm Verileri Fabrika Ayarlarına Sıfırla</span>
          </button>
        </div>
      </div>
    </div>
  );
};
