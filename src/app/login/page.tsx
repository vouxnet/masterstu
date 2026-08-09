"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { Lock, User, ShieldCheck, ArrowRight, AlertCircle, Mail, Infinity } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithEmail, signUpWithEmail, initAuth } = useAuthStore();
  
  const [realEmail, setRealEmail] = useState("");
  const [realPassword, setRealPassword] = useState("");
  const [realName, setRealName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const handleRealLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (isSignUp) {
      if (!realName) {
        setErrorMessage("Lütfen adınızı giriniz.");
        return;
      }
      const { error } = await signUpWithEmail(realEmail, realPassword, realName);
      if (error) {
        setErrorMessage(error);
      } else {
        router.push("/");
      }
    } else {
      const { error } = await signInWithEmail(realEmail, realPassword);
      if (error) {
        setErrorMessage(error);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center p-4 bg-[#0B0F19] overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-emerald-600/20 blur-3xl" />

      <div className="w-full max-w-md rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 shadow-2xl relative z-10">
        <div className="text-center mb-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 font-display text-2xl font-black text-white shadow-xl shadow-indigo-500/30">
            <Infinity className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold text-white tracking-tight sm:text-3xl">
            Asimptot
          </h1>
          <p className="mt-1 text-xs text-gray-400">
            Sınırlarını zorla, başarıya yaklaş.
          </p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-4 rounded-xl bg-rose-950/50 p-3 border border-rose-500/40 text-xs text-rose-200 flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleRealLogin} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Adınız
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  required
                  value={realName}
                  onChange={(e) => setRealName(e.target.value)}
                  className="w-full rounded-xl bg-gray-900/90 pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:outline-none"
                  placeholder="Adınız Soyadınız"
                />
              </div>
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              E-posta Adresi
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
              <input
                type="email"
                required
                value={realEmail}
                onChange={(e) => setRealEmail(e.target.value)}
                className="w-full rounded-xl bg-gray-900/90 pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:outline-none"
                placeholder="ornek@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Şifre
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-gray-500" />
              <input
                type="password"
                required
                value={realPassword}
                onChange={(e) => setRealPassword(e.target.value)}
                className="w-full rounded-xl bg-gray-900/90 pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:outline-none"
                placeholder="******"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl glass-button py-3 text-xs font-bold text-white shadow-xl flex items-center justify-center space-x-2 transition-all hover:scale-[1.01]"
          >
            <span>{isSignUp ? 'Kayıt Ol' : 'Giriş Yap'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-indigo-400 hover:text-indigo-300"
            >
              {isSignUp ? 'Zaten hesabınız var mı? Giriş yapın' : 'Hesabınız yok mu? Hesap oluşturun'}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-white/10" />
          <span className="px-3 text-[10px] text-gray-500 uppercase">veya</span>
          <div className="flex-1 border-t border-white/10" />
        </div>

        {/* Google Sign In */}
        <button
          onClick={async () => {
            setErrorMessage(null);
            const { createClient } = await import("@/src/lib/supabase/client");
            const supabase = createClient();
            const { error } = await supabase.auth.signInWithOAuth({
              provider: 'google',
              options: {
                redirectTo: `${window.location.origin}/`,
              },
            });
            if (error) setErrorMessage(error.message);
          }}
          className="w-full rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 py-3 text-xs font-semibold text-white flex items-center justify-center space-x-3 transition-all hover:scale-[1.01]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span>Google ile Giriş Yap</span>
        </button>

        <div className="mt-6 flex items-center justify-center space-x-2 text-[11px] text-gray-500">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Güvenli Kullanıcı Paneli</span>
        </div>
      </div>
    </main>
  );
}
