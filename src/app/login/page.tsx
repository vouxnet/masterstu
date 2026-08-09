"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { Lock, User, ShieldCheck, ArrowRight, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { switchUserRole } = useAuthStore();

  const [username, setUsername] = useState("Bülent");
  const [password, setPassword] = useState("123456");
  const [selectedRole, setSelectedRole] = useState<"lisans_alan" | "onlisans">("lisans_alan");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== "123456") {
      setErrorMessage("⚠️ Hatalı Şifre! Lütfen şifrenizi '123456' olarak giriniz.");
      return;
    }

    setErrorMessage(null);
    switchUserRole(selectedRole);
    document.cookie = "kpss_session=active-user-session; path=/; max-age=86400";
    router.push("/");
  };

  const handleQuickSelect = (role: "lisans_alan" | "onlisans") => {
    setSelectedRole(role);
    setErrorMessage(null);
    if (role === "lisans_alan") {
      setUsername("Bülent");
    } else {
      setUsername("Sena");
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center p-4 bg-[#0B0F19] overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-emerald-600/20 blur-3xl" />

      <div className="w-full max-w-md rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 shadow-2xl relative z-10">
        <div className="text-center mb-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 font-display text-2xl font-black text-white shadow-xl shadow-indigo-500/30">
            M
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold text-white tracking-tight sm:text-3xl">
            Master<span className="text-indigo-400">ÖSYM</span> AI
          </h1>
          <p className="mt-1 text-xs text-gray-400">
            Bülent & Sena Gerçek Kullanıcı Giriş Paneli
          </p>
        </div>

        {/* Quick Profile Selection */}
        <div className="mb-6 rounded-2xl glass-card p-3 border border-white/5">
          <p className="text-[11px] font-semibold text-gray-400 mb-2 uppercase tracking-wider text-center">
            Giriş Yapılacak Kullanıcı
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickSelect("lisans_alan")}
              className={`flex flex-col items-center rounded-xl p-3 text-xs font-semibold transition-all border ${
                selectedRole === "lisans_alan"
                  ? "bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                  : "bg-white/5 border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              <span className="font-bold text-indigo-300">Bülent</span>
              <span className="text-[10px] text-gray-400 mt-0.5">Lisans + Alan</span>
              <span className="mt-1 rounded-full bg-indigo-500/20 px-2 py-0.5 text-[9px] text-indigo-300 font-display font-bold">
                Şifre: 123456
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickSelect("onlisans")}
              className={`flex flex-col items-center rounded-xl p-3 text-xs font-semibold transition-all border ${
                selectedRole === "onlisans"
                  ? "bg-pink-600/30 border-pink-500 text-white shadow-lg shadow-pink-500/20"
                  : "bg-white/5 border-transparent text-gray-400 hover:text-gray-200"
              }`}
            >
              <span className="font-bold text-pink-300">Sena</span>
              <span className="text-[10px] text-gray-400 mt-0.5">Önlisans</span>
              <span className="mt-1 rounded-full bg-pink-500/20 px-2 py-0.5 text-[9px] text-pink-300 font-display font-bold">
                Şifre: 123456
              </span>
            </button>
          </div>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-4 rounded-xl bg-rose-950/50 p-3 border border-rose-500/40 text-xs text-rose-200 flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Kullanıcı Adı
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl bg-gray-900/90 pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Şifre (123456)
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-gray-900/90 pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl glass-button py-3 text-xs font-bold text-white shadow-xl flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
          >
            <span>Güvenli Giriş Yap</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center space-x-2 text-[11px] text-gray-500">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Bülent & Sena Gerçek Kullanıcı Güvenli Paneli</span>
        </div>
      </div>
    </main>
  );
}
