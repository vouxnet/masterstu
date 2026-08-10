"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { AdminSidebar, AdminTabType } from "@/src/components/admin/AdminSidebar";
import { AdminOverviewTab } from "@/src/components/admin/AdminOverviewTab";
import { PageNavAdminTab } from "@/src/components/admin/PageNavAdminTab";
import { UserManagementTab } from "@/src/components/admin/UserManagementTab";
import { QuestionBankTab } from "@/src/components/admin/QuestionBankTab";
import { CmsContentTab } from "@/src/components/admin/CmsContentTab";
import { CurriculumAdminTab } from "@/src/components/admin/CurriculumAdminTab";
import { FlashcardsAdminTab } from "@/src/components/admin/FlashcardsAdminTab";
import { MediaAdminTab } from "@/src/components/admin/MediaAdminTab";
import { Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboardPage() {
  const { currentUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState<AdminTabType>("overview");

  // Strict Admin access control check
  const isAdmin = currentUser.role === "admin" || currentUser.email === "admin@asimptot.app";

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-4 glass-panel rounded-3xl border border-rose-500/30 my-12 shadow-2xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-600/20 text-rose-400 border border-rose-500/30">
          <Lock className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">403 - Yetkisiz Erişim Engellendi</h2>
        <p className="text-xs text-gray-400 max-w-md leading-relaxed">
          Bu yönetim konsolu yalnızca yetkili Master Super Admin hesabı (`admin@asimptot.app`) tarafından görüntülenebilir.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 min-h-[85vh]">
      {/* 1. Executive Admin Left Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Executive Main Workbench Workspace */}
      <main className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "overview" && <AdminOverviewTab setActiveTab={setActiveTab} />}
            {activeTab === "pagenav" && <PageNavAdminTab />}
            {activeTab === "users" && <UserManagementTab />}
            {activeTab === "questions" && <QuestionBankTab />}
            {activeTab === "cms" && <CmsContentTab />}
            {activeTab === "curriculum" && <CurriculumAdminTab />}
            {activeTab === "media" && <MediaAdminTab />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
