"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Layers, Plus, FileSpreadsheet, MessageSquarePlus } from "lucide-react";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { motion } from "framer-motion";

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { setQuickActionOpen } = useAuthStore();

  const navItems = [
    { href: "/", label: "Ana Sayfa", icon: Home },
    { href: "/curriculum", label: "Müfredat", icon: BookOpen },
    // Center Floating Button Slot
    { href: "/flashcards", label: "Kartlar", icon: Layers },
    { href: "/shared-qa", label: "Soru & Not", icon: MessageSquarePlus },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 block md:hidden">
      {/* Curved Glass Bar */}
      <div className="relative glass-panel border-t border-white/10 px-4 py-2">
        <div className="mx-auto flex max-w-md items-center justify-between">
          {navItems.slice(0, 2).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center py-1 px-3 transition-colors ${
                  isActive ? "text-indigo-400" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "scale-110" : ""}`} />
                <span className="mt-1 text-[10px] font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="mt-0.5 h-1 w-4 rounded-full bg-indigo-500"
                  />
                )}
              </Link>
            );
          })}

          {/* Central Floating Action Button */}
          <div className="relative -top-5 flex justify-center">
            <button
              onClick={() => setQuickActionOpen(true)}
              className="group flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 text-white shadow-xl shadow-indigo-500/40 ring-4 ring-[#0B0F19] transition-transform active:scale-95 hover:scale-105"
              aria-label="Hızlı Eylem Ekle"
            >
              <Plus className="h-7 w-7 transition-transform group-hover:rotate-90" />
            </button>
          </div>

          {navItems.slice(2).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center py-1 px-3 transition-colors ${
                  isActive ? "text-indigo-400" : "text-gray-400 hover:text-gray-200"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "scale-110" : ""}`} />
                <span className="mt-1 text-[10px] font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="mt-0.5 h-1 w-4 rounded-full bg-indigo-500"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
