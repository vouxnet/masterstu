"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Header } from "@/src/components/navigation/Header";
import { Sidebar } from "@/src/components/navigation/Sidebar";
import { BottomNav } from "@/src/components/navigation/BottomNav";
import { QuickActionModal } from "@/src/components/modals/QuickActionModal";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { ShieldCheck, LogOut, ArrowLeft, Activity, Database, Users, BookOpen, Layout, BarChart3, Image } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, signOut } = useAuthStore();

  const isAdminPage = pathname?.startsWith("/admin");

  // If rendering Admin Console, provide an Exclusive Executive Studio Layout
  if (isAdminPage) {
    return (
      <div className="min-h-screen bg-[#07090E] text-gray-100 flex flex-col">
        {/* Executive Admin Top Header */}
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-rose-500/30 bg-[#0A0D16]/90 px-6 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-600 text-white shadow-lg shadow-rose-600/40 font-bold">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-display text-base font-black tracking-tight text-white">
                  ASIMPTOT <span className="text-rose-400">ADMIN CONSOLE</span>
                </h1>
                <span className="rounded-md bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-300 border border-rose-500/30 font-mono">
                  PRO STUDIO
                </span>
              </div>
              <p className="text-[10px] text-gray-400 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Sistem Yönetim & İletişim Konsolu</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="flex items-center space-x-1.5 rounded-xl glass-card px-3.5 py-1.5 text-xs font-bold text-gray-300 hover:text-white border border-white/10 hover:border-white/20 transition-all"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Öğrenci Görünümüne Dön</span>
            </Link>

            <button
              onClick={async () => {
                await signOut();
                router.push("/login");
              }}
              className="flex items-center space-x-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/30 px-3.5 py-1.5 text-xs font-bold transition-all"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Çıkış</span>
            </button>
          </div>
        </header>

        {/* Admin Executive Content Body */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    );
  }

  // Normal Student Dashboard Layout
  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 pb-24 md:pb-8">
      {/* Header Bar */}
      <Header />

      {/* Main Body Layout */}
      <div className="mx-auto flex max-w-7xl">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Dynamic Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Bar */}
      <BottomNav />

      {/* Quick Action Modal */}
      <QuickActionModal />
    </div>
  );
}
