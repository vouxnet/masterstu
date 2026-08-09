"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { CheckSquare, Square, Plus, ListTodo, Sparkles } from "lucide-react";

export const TodoSummary: React.FC = () => {
  const { todos, toggleTodo, addTodo } = useAuthStore();
  const [newTitle, setNewTitle] = useState("");
  const [newSubject, setNewSubject] = useState("Genel");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addTodo(newTitle.trim(), newSubject);
    setNewTitle("");
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="rounded-3xl glass-panel p-6 border border-white/10 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/30">
            <ListTodo className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-base">Günlük Görev Panosu</h3>
            <p className="text-xs text-gray-400">
              {completedCount} / {todos.length} Görev Tamamlandı
            </p>
          </div>
        </div>
      </div>

      {/* Add Todo Form */}
      <form onSubmit={handleAdd} className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Yeni çalışma görevi ekle (örn: Hukuk 30 soru)..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 rounded-xl bg-gray-900/80 px-3.5 py-2 text-xs text-white placeholder-gray-500 border border-white/10 focus:border-indigo-500 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-xl glass-button px-3.5 py-2 text-xs font-semibold text-white flex items-center space-x-1"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Ekle</span>
        </button>
      </form>

      {/* Todo List */}
      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
        {todos.map((todo) => (
          <div
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            className={`flex items-center justify-between rounded-xl p-3 text-xs font-medium cursor-pointer transition-all border ${
              todo.completed
                ? "bg-emerald-950/20 border-emerald-500/20 text-gray-400 line-through"
                : "glass-card border-white/5 text-gray-200 hover:border-indigo-500/40"
            }`}
          >
            <div className="flex items-center space-x-3">
              {todo.completed ? (
                <CheckSquare className="h-4 w-4 text-emerald-400" />
              ) : (
                <Square className="h-4 w-4 text-gray-500" />
              )}
              <span>{todo.title}</span>
            </div>
            <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-gray-400">
              {todo.subject}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
