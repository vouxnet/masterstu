"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { User, Bell, Lock, Save } from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const { currentUser, updateUserProfile } = useAuthStore();
  
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl);

  const handleSave = () => {
    updateUserProfile(name, email, avatarUrl);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10 max-w-4xl">
      <div>
        <h1 className="text-3xl font-display font-bold text-white">⚙️ Profil & Ayarlar</h1>
        <p className="text-gray-400 mt-2">Kişisel bilgilerinizi ve uygulama tercihlerinizi yönetin.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar for Settings */}
        <div className="col-span-1 space-y-2">
          <button className="w-full flex items-center space-x-3 p-3 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-medium">
            <User className="w-5 h-5" />
            <span>Genel Profil</span>
          </button>
          <button disabled className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 text-gray-500 font-medium cursor-not-allowed">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5" />
              <span>Bildirimler</span>
            </div>
            <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">Yakında</span>
          </button>
          <button disabled className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 text-gray-500 font-medium cursor-not-allowed">
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5" />
              <span>Güvenlik</span>
            </div>
            <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">Yakında</span>
          </button>
        </div>

        {/* Settings Form */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="glass-panel p-6 space-y-6">
            <h2 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Profil Bilgileri</h2>
            
            <div className="flex items-center space-x-4">
              <img
                src={avatarUrl}
                alt={name}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-indigo-500/30"
              />
              <div className="flex-1 max-w-sm">
                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="Fotoğraf URL'si yapıştırın..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 mb-2"
                />
                <p className="text-xs text-gray-500">Profil resminizi değiştirmek için geçerli bir resim linki yapıştırın.</p>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-300">İsim</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-300">Arkadaş Kodu</label>
                  <input
                    type="text"
                    defaultValue={currentUser.friendCode}
                    disabled
                    className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-300">E-Posta Adresi</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Değişiklikleri Kaydet</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Danger Zone */}
          <div className="glass-panel p-6 border-red-500/20">
            <h2 className="text-lg font-bold text-red-400 mb-4">Tehlikeli Bölge</h2>
            <p className="text-sm text-gray-400 mb-4">Hesabınızı silmek tüm müfredat ilerlemenizi, arkadaşlıklarınızı ve yanlış kutusu verilerinizi kalıcı olarak siler.</p>
            <button disabled className="px-4 py-2 bg-red-500/10 text-red-500/50 rounded-lg text-sm font-medium cursor-not-allowed flex items-center space-x-2">
              <span>Hesabımı Kalıcı Olarak Sil</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">Yakında</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
