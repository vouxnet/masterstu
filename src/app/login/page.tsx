"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { useThemeStore } from "@/src/lib/store/useThemeStore";
import { createClient } from "@/src/lib/supabase/client";
import {
  Lock,
  User,
  ShieldCheck,
  ArrowRight,
  AlertCircle,
  Mail,
  Infinity,
  CheckCircle2,
  RefreshCw,
  Sun,
  Moon,
  KeyRound,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithEmail, signUpWithEmail, initAuth } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();

  const [isSignUp, setIsSignUp] = useState(false);
  const [realName, setRealName] = useState("");
  const [realEmail, setRealEmail] = useState("");
  const [realPassword, setRealPassword] = useState("");

  // OTP Verification States
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [otpTimer, setOtpTimer] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval: any;
    if (isOtpStep && otpTimer > 0) {
      interval = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isOtpStep, otpTimer]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        if (!realName.trim()) {
          setErrorMessage("Lütfen adınızı giriniz.");
          setIsSubmitting(false);
          return;
        }

        const supabase = createClient();
        const { data, error } = await supabase.auth.signUp({
          email: realEmail,
          password: realPassword,
          options: {
            data: {
              name: realName,
            },
          },
        });

        if (error) {
          setErrorMessage(error.message);
          setIsSubmitting(false);
          return;
        }

        // Switch to 6-digit OTP verification screen
        setIsOtpStep(true);
        setOtpTimer(60);
        setSuccessMessage(`Doğrulama kodu ${realEmail} adresine iletildi.`);
      } else {
        // Normal Sign In
        const { error } = await signInWithEmail(realEmail, realPassword);
        if (error) {
          setErrorMessage(error);
        } else {
          const currentUser = useAuthStore.getState().currentUser;
          if (realEmail.toLowerCase() === "admin@asimptot.app" || currentUser?.role === "admin") {
            router.push("/admin");
          } else {
            const isOnboarded = typeof window !== "undefined" && localStorage.getItem("asimptot_onboarded") === "true";
            if (!isOnboarded) {
              router.push("/onboarding");
            } else {
              router.push("/");
            }
          }
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || "İşlem sırasında bir hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle OTP digit changes
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newDigits = [...otpDigits];
    newDigits[index] = value;
    setOtpDigits(newDigits);

    // Auto-focus to next box
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Verify 6-digit OTP code
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = otpDigits.join("");
    if (token.length !== 6) {
      setErrorMessage("Lütfen 6 haneli doğrulama kodunu eksiksiz giriniz.");
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      // 1. Call server confirmation endpoint with master fallback support
      const response = await fetch("/api/auth/confirm-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: realEmail, code: token }),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        setErrorMessage(result.error || "Onay kodu doğrulanamadı.");
        setIsSubmitting(false);
        return;
      }

      // 2. Automatically log the user in
      await signInWithEmail(realEmail, realPassword);

      setSuccessMessage("✅ Hesabınız başarıyla doğrulandı ve aktive edildi! Yönlendiriliyorsunuz...");
      setTimeout(() => {
        router.push("/onboarding");
      }, 1000);
    } catch (err: any) {
      setErrorMessage(err.message || "Doğrulama sırasında hata oluştu.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resend OTP code
  const handleResendOtp = async () => {
    if (otpTimer > 0) return;
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: realEmail,
      });
      if (error) {
        setErrorMessage(error.message);
      } else {
        setOtpTimer(60);
        setSuccessMessage("Yeni doğrulama kodu gönderildi.");
      }
    } catch (err: any) {
      setErrorMessage("Yeniden gönderim başarısız oldu.");
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center p-4 bg-[#0B0F19] overflow-hidden">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-emerald-600/20 blur-3xl" />

      {/* Top Right Theme Toggle Switch */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleTheme}
          className="flex items-center space-x-2 rounded-2xl glass-card px-3.5 py-2 border border-white/10 text-xs font-bold text-gray-300 hover:text-white shadow-xl transition-all"
        >
          {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-400" />}
          <span>{theme === "dark" ? "Açık Tema" : "Koyu Tema"}</span>
        </button>
      </div>

      <div className="w-full max-w-md rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 shadow-2xl relative z-10">
        <div className="text-center mb-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 font-display text-2xl font-black text-white shadow-xl shadow-indigo-500/30">
            <Infinity className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-black text-white tracking-tight sm:text-3xl">
            Asimptot
          </h1>
          <p className="mt-1 text-xs text-gray-400">
            Sınırlarını zorla, başarıya yaklaş.
          </p>
        </div>

        {/* Status Alerts */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 rounded-xl bg-rose-950/60 p-3 border border-rose-500/40 text-xs text-rose-200 flex items-center space-x-2 shadow-lg"
            >
              <AlertCircle className="h-4 w-4 text-rose-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 rounded-xl bg-emerald-950/60 p-3 border border-emerald-500/40 text-xs text-emerald-200 flex items-center space-x-2 shadow-lg"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <span>{successMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 2: 6-DIGIT OTP VERIFICATION CARD */}
        {isOtpStep ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-5"
          >
            <div className="text-center space-y-1">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mb-1">
                <KeyRound className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-white text-base">E-posta Onay Kodu</h3>
              <p className="text-xs text-gray-400">
                <span className="text-indigo-300 font-medium">{realEmail}</span> adresine 6 haneli aktivasyon kodu gönderildi.
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-5">
              {/* 6 Digit Input Grid */}
              <div className="flex items-center justify-center gap-2 sm:gap-2.5">
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      otpInputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="h-12 w-11 sm:h-14 sm:w-12 rounded-2xl bg-black/60 text-center font-display text-xl font-bold text-white border border-white/10 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none transition-all shadow-inner"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 py-3 text-xs font-bold text-white shadow-xl shadow-emerald-500/20 flex items-center justify-center space-x-2 transition-all active:scale-95 disabled:opacity-50"
              >
                <span>{isSubmitting ? "Doğrulanıyor..." : "Hesabı Aktif Et ve Başla"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10">
              <span className="text-gray-400">
                Kalan Süre: <span className="font-mono font-bold text-emerald-400">{otpTimer}s</span>
              </span>

              <button
                type="button"
                disabled={otpTimer > 0}
                onClick={handleResendOtp}
                className="text-indigo-400 hover:text-indigo-300 font-semibold disabled:text-gray-500 flex items-center gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Tekrar Gönder</span>
              </button>
            </div>

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setIsOtpStep(false)}
                className="text-xs text-gray-500 hover:text-gray-400 underline"
              >
                Geri Dön & E-postayı Değiştir
              </button>
            </div>
          </motion.div>
        ) : (
          /* STEP 1: SIGN IN / SIGN UP FORM */
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Adınız ve Soyadınız
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
              disabled={isSubmitting}
              className="w-full rounded-xl glass-button py-3 text-xs font-bold text-white shadow-xl flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] disabled:opacity-50"
            >
              <span>{isSubmitting ? "İşleniyor..." : isSignUp ? "Kayıt Ol & Onay Kodu Al" : "Giriş Yap"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                {isSignUp ? "Zaten hesabınız var mı? Giriş yapın" : "Hesabınız yok mu? Hesap oluşturun"}
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-white/10" />
              <span className="px-3 text-[10px] text-gray-500 uppercase font-mono">veya</span>
              <div className="flex-1 border-t border-white/10" />
            </div>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={async () => {
                setErrorMessage(null);
                const supabase = createClient();
                const { error } = await supabase.auth.signInWithOAuth({
                  provider: "google",
                  options: {
                    redirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
                  },
                });
                if (error) setErrorMessage(error.message);
              }}
              className="w-full rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 py-2.5 text-xs font-semibold text-white flex items-center justify-center space-x-3 transition-all hover:scale-[1.01]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Google ile Giriş Yap</span>
            </button>
          </form>
        )}

        <div className="mt-6 flex items-center justify-center space-x-2 text-[11px] text-gray-500">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>256-Bit SSL Güvenli Kullanıcı Portalı</span>
        </div>
      </div>
    </main>
  );
}
