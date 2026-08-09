import React from "react";
import { Header } from "@/src/components/navigation/Header";
import { Sidebar } from "@/src/components/navigation/Sidebar";
import { BottomNav } from "@/src/components/navigation/BottomNav";
import { QuickActionModal } from "@/src/components/modals/QuickActionModal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
