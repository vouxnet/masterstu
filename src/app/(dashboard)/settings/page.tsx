"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, DEFAULT_ASIMPTOT_AVATAR } from "@/src/lib/store/useAuthStore";
import { User, Bell, Lock, Save, LogOut, Camera, CheckCircle2, AlertCircle, KeyRound, Shield } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const { currentUser, updateUserProfile, updateUserPassword, signOut } = useAuthStore();
  
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl || DEFAULT_ASIMPTOT_AVATAR);
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

  // Password state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);

  const [profileMessage, setProfileMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // File upload handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setProfileMessage("⚠️ Lütfen geçerli bir resim dosyası seçin (PNG, JPG, WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setProfileMessage("⚠️ Resim boyutu 5 MB'dan küçük olmalıdır.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setAvatarUrl(event.target.result as string);
        setProfileMessage("📸 Profil fotoğrafınız güncellendi. Kaydet butonuna basmayı unutmayın!");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProfileSave = () => {
    updateUserProfile(name, email, avatarUrl);
    setProfileMessage("✅ Profil bilgileriniz başarıyla kaydedildi!");
    setTimeout(() => setProfileMessage(null), 3000);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (newPassword.length < 6) {
      setPasswordStatus({ type: "error", message: "Şifreniz en az 6 karakter olmalıdır." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: "error", message: "Şifreler birbiriyle eşleşmiyor." });
      return;
    }

    setIsPasswordLoading(true);
    const { error } = await updateUserPassword(newPassword);
    setIsPasswordLoading(false);

    if (error) {
      setPasswordStatus({ type: "error", message: error });
    } else {
      setPasswordStatus({ type: "success", message: "Şifreniz başarıyla değiştirildi!" });
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div className="space-y-6 pb-10 max-w-4xl">
      <div>
        <h1 className="text-3xl font-display font-bold text-white">⚙️ Profil & Ayarlar</h1>
        <p className="text-gray-400 mt-2 text-xs sm:text-sm">Kişisel bilgilerinizi, profil fotoğrafınızı ve güvenlik tercihlerinizi yönetin.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Navigation Sidebar */}
        <div className="col-span-1 space-y-2">
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center space-x-3 p-3 rounded-xl font-medium transition-all ${
              activeTab === "profile"
                ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-lg shadow-indigo-600/10"
                : "bg-white/5 text-gray-400 border border-white/5 hover:text-white"
            }`}
          >
            <User className="w-5 h-5 text-indigo-400" />
            <span>Genel Profil</span>
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`w-full flex items-center space-x-3 p-3 rounded-xl font-medium transition-all ${
              activeTab === "security"
                ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-lg shadow-indigo-600/10"
                : "bg-white/5 text-gray-400 border border-white/5 hover:text-white"
            }`}
          >
            <Lock className="w-5 h-5 text-purple-400" />
            <span>Şifre & Güvenlik</span>
          </button>

          <button
            onClick={async () => {
              await signOut();
              router.push('/login');
            }}
            className="w-full flex items-center space-x-3 p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 font-medium hover:bg-rose-500/20 transition-colors mt-6"
          >
            <LogOut className="w-5 h-5" />
            <span>Çıkış Yap</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          {activeTab === "profile" && (
            <div className="glass-panel p-6 space-y-6 border border-white/10 rounded-3xl shadow-xl">
              <h2 className="text-xl font-bold text-white mb-2 border-b border-white/10 pb-3 flex items-center space-x-2">
                <User className="w-5 h-5 text-indigo-400" />
                <span>Kişisel Profil Bilgileri</span>
              </h2>

              {profileMessage && (
                <div className="p-3 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-xs text-indigo-200 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{profileMessage}</span>
                </div>
              )}

              {/* Avatar Upload Box */}
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 bg-black/30 p-4 rounded-2xl border border-white/5">
                <div className="relative group">
                  <img
                    src={avatarUrl}
                    alt={name}
                    className="w-24 h-24 rounded-2xl object-cover ring-4 ring-indigo-500/40 shadow-xl"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-xs font-bold transition-opacity cursor-pointer"
                  >
                    <Camera className="w-6 h-6 mb-1 text-indigo-400" />
                    <span>Değiştir</span>
                  </button>
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <h4 className="text-sm font-bold text-white">Profil Fotoğrafı</h4>
                  <p className="text-xs text-gray-400">
                    Cihazınızdan (Telefon / Bilgisayar) kendi fotoğrafınızı veya logonuzu seçin.
                  </p>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />

                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 text-xs font-bold transition-colors flex items-center space-x-1.5"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Cihazdan Fotoğraf Seç</span>
                    </button>
                    {avatarUrl !== DEFAULT_ASIMPTOT_AVATAR && (
                      <button
                        type="button"
                        onClick={() => setAvatarUrl(DEFAULT_ASIMPTOT_AVATAR)}
                        className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 text-xs font-medium transition-colors"
                      >
                        Varsayılana Sıfırla
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-300">Kullanıcı Adı / İsim</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-900/90 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-300">Duo Arkadaş Kodu</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={currentUser.friendCode || "#ADAY-2026"}
                        readOnly
                        className="w-full bg-gray-900/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-amber-300 font-mono font-bold cursor-default tracking-wider"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(currentUser.friendCode || "#ADAY-2026");
                          setProfileMessage("📋 Arkadaş kodunuz panoya kopyalandı!");
                          setTimeout(() => setProfileMessage(null), 3000);
                        }}
                        className="px-3 py-2.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 text-xs font-bold transition-colors whitespace-nowrap"
                        title="Kodu Kopyala"
                      >
                        Kopyala
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300">E-Posta Adresi</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-900/90 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    placeholder="ornek@email.com"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button 
                    onClick={handleProfileSave}
                    className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/30"
                  >
                    <Save className="w-4 h-4" />
                    <span>Değişiklikleri Kaydet</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="glass-panel p-6 space-y-6 border border-white/10 rounded-3xl shadow-xl">
              <h2 className="text-xl font-bold text-white mb-2 border-b border-white/10 pb-3 flex items-center space-x-2">
                <Shield className="w-5 h-5 text-purple-400" />
                <span>Şifre Değiştirme ve Güvenlik</span>
              </h2>

              {passwordStatus && (
                <div className={`p-3 rounded-xl border text-xs flex items-center space-x-2 ${
                  passwordStatus.type === "success"
                    ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                    : "bg-rose-500/20 border-rose-500/40 text-rose-300"
                }`}>
                  {passwordStatus.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                  <span>{passwordStatus.message}</span>
                </div>
              )}

              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300">Yeni Şifre</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-gray-900/90 pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 border border-white/10 rounded-xl focus:border-indigo-500 focus:outline-none"
                      placeholder="En az 6 karakterli yeni şifre"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-300">Yeni Şifre (Tekrar)</label>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-gray-900/90 pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 border border-white/10 rounded-xl focus:border-indigo-500 focus:outline-none"
                      placeholder="Yeni şifrenizi tekrar girin"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={isPasswordLoading}
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-lg shadow-purple-600/30 disabled:opacity-50"
                  >
                    <Lock className="w-4 h-4" />
                    <span>{isPasswordLoading ? "Güncelleniyor..." : "Şifreyi Güncelle"}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
