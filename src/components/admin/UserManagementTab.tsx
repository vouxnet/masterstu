"use client";

import React, { useState } from "react";
import { useAdminStore, AdminUserRecord } from "@/src/lib/store/useAdminStore";
import { Users, UserPlus, Shield, Edit3, Trash2, CheckCircle2, Ban, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const UserManagementTab: React.FC = () => {
  const { users, addUser, updateUser, deleteUser } = useAdminStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUserRecord | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"lisans_alan" | "onlisans_alan" | "admin">("lisans_alan");
  const [status, setStatus] = useState<"active" | "blocked">("active");

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.friendCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAdd = () => {
    setName("");
    setEmail("");
    setRole("lisans_alan");
    setStatus("active");
    setEditingUser(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (user: AdminUserRecord) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setStatus(user.status);
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const roleLabel = role === "admin" ? "Master Super Admin" : role === "lisans_alan" ? "KPSS Lisans" : "KPSS Önlisans";
    const selectedExams = role === "admin" ? ["kpss_lisans", "kpss_onlisans"] : [role === "lisans_alan" ? "kpss_lisans" : "kpss_onlisans"];
    const activeExam = role === "onlisans_alan" ? "kpss_onlisans" : "kpss_lisans";

    if (editingUser) {
      updateUser(editingUser.id, {
        name,
        email,
        role,
        roleLabel,
        status,
        selectedExams,
        activeExam,
      });
    } else {
      const randomCode = `#ADM-${Math.floor(1000 + Math.random() * 9000)}`;
      addUser({
        name,
        email,
        role,
        roleLabel,
        friendCode: randomCode,
        selectedExams,
        activeExam,
        status,
      });
    }
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl glass-card p-4 border border-white/10">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/30">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-base">Üyelik & Kullanıcı Yönetimi</h3>
            <p className="text-xs text-gray-400">Platformdaki tüm kayıtlı üyelerin yetki, rol ve hesap durumlarını yönetin.</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Kullanıcı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-xl bg-black/40 pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <button
            onClick={handleOpenAdd}
            className="flex items-center space-x-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2 text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
          >
            <UserPlus className="h-4 w-4" />
            <span>Yeni Üye Ekle</span>
          </button>
        </div>
      </div>

      {/* Users Data Table */}
      <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-white/5 uppercase text-[10px] text-gray-400 border-b border-white/10 font-mono">
              <tr>
                <th className="px-5 py-3.5">Kullanıcı / E-posta</th>
                <th className="px-5 py-3.5">Arkadaş Kodu</th>
                <th className="px-5 py-3.5">Sistem Rolü</th>
                <th className="px-5 py-3.5">Durum</th>
                <th className="px-5 py-3.5 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-9 w-9 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-bold font-display text-sm">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">{u.name}</p>
                          <p className="text-[11px] text-gray-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-mono font-bold text-amber-400">{u.friendCode}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center space-x-1 rounded-full px-2.5 py-1 text-[10px] font-bold border ${
                          u.role === "admin"
                            ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                            : u.role === "lisans_alan"
                            ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                            : "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                        }`}
                      >
                        <Shield className="h-3 w-3" />
                        <span>{u.roleLabel}</span>
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {u.status === "active" ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-400 font-bold text-[11px]">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Aktif</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-rose-400 font-bold text-[11px]">
                          <Ban className="h-3.5 w-3.5" />
                          <span>Engelli</span>
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(u)}
                        className="rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 p-2 border border-indigo-500/20 transition-transform active:scale-95"
                        title="Düzenle"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`${u.name} kullanıcısını silmek istediğinize emin misiniz?`)) {
                            deleteUser(u.id);
                          }
                        }}
                        className="rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 p-2 border border-rose-500/20 transition-transform active:scale-95"
                        title="Sil"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-gray-500 text-xs">
                    Aranan kriterlere uygun kullanıcı bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit User Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl glass-panel p-6 border border-white/10 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-display font-bold text-white text-base">
                  {editingUser ? "Kullanıcıyı Düzenle" : "Yeni Üye Kaydı"}
                </h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Ad Soyad</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Örn: Ahmet Yılmaz"
                    className="w-full rounded-xl bg-black/50 px-3.5 py-2.5 text-white border border-white/10 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">E-posta Adresi</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ahmet@example.com"
                    className="w-full rounded-xl bg-black/50 px-3.5 py-2.5 text-white border border-white/10 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Sistem Rolü</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as any)}
                      className="w-full rounded-xl bg-black/50 px-3 py-2.5 text-white border border-white/10 focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="lisans_alan">KPSS Lisans</option>
                      <option value="onlisans_alan">KPSS Önlisans</option>
                      <option value="admin">Master Super Admin</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">Hesap Durumu</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full rounded-xl bg-black/50 px-3 py-2.5 text-white border border-white/10 focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="active">Aktif</option>
                      <option value="blocked">Engelli</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="rounded-xl px-4 py-2.5 text-gray-400 hover:text-white font-bold"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 font-bold shadow-lg shadow-indigo-600/30"
                  >
                    {editingUser ? "Kaydet" : "Kullanıcı Oluştur"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
