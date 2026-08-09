"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/src/lib/store/useAuthStore";
import { CheckSquare, Square, Plus, ListTodo, Trash2, Pencil, Check, X } from "lucide-react";

export const TodoSummary: React.FC = () => {
  const { todos, toggleTodo, addTodo, removeTodo, updateTodo } = useAuthStore();
  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const lowerTitle = newTitle.toLowerCase();
    let detectedSubject = "Genel";
    if (lowerTitle.includes("tarih")) detectedSubject = "Tarih";
    else if (lowerTitle.includes("mat")) detectedSubject = "Matematik";
    else if (lowerTitle.includes("türkçe") || lowerTitle.includes("turkce") || lowerTitle.includes("paragraf")) detectedSubject = "Türkçe";
    else if (lowerTitle.includes("coğrafya") || lowerTitle.includes("cografya")) detectedSubject = "Coğrafya";
    else if (lowerTitle.includes("hukuk")) detectedSubject = "Hukuk";
    else if (lowerTitle.includes("iktisat")) detectedSubject = "İktisat";
    else if (lowerTitle.includes("vatandaşlık") || lowerTitle.includes("vatandaslik")) detectedSubject = "Vatandaşlık";

    addTodo(newTitle.trim(), detectedSubject);
    setNewTitle("");
  };

  const startEditing = (e: React.MouseEvent, id: string, currentTitle: string) => {
    e.stopPropagation();
    setEditingId(id);
    setEditTitle(currentTitle);
  };

  const saveEdit = () => {
    if (editingId && editTitle.trim()) {
      updateTodo(editingId, editTitle.trim());
    }
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    removeTodo(id);
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="rounded-3xl glass-panel p-5 border border-white/10 shadow-xl flex flex-col max-h-[360px] overflow-hidden">
      <div className="flex items-center justify-between mb-3 shrink-0">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/30">
            <ListTodo className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-base">Yapılacaklar</h3>
            <p className="text-xs text-gray-400">
              {completedCount} / {todos.length} Görev Tamamlandı
            </p>
          </div>
        </div>
      </div>

      {/* Todo List */}
      <div className="space-y-2 overflow-y-auto pr-1 flex-1 max-h-[220px] scrollbar-thin mb-3">
        {todos.map((todo) => (
          <div
            key={todo.id}
            onClick={() => {
              if (editingId !== todo.id) toggleTodo(todo.id);
            }}
            className={`group flex items-center justify-between rounded-xl p-3 text-xs font-medium cursor-pointer transition-all border ${
              todo.completed && editingId !== todo.id
                ? "bg-emerald-950/20 border-emerald-500/20 text-gray-500 opacity-75"
                : "glass-card border-white/5 text-gray-200 hover:border-indigo-500/40"
            }`}
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0 mr-3">
              {editingId !== todo.id && (
                <div className="shrink-0">
                  {todo.completed ? (
                    <CheckSquare className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Square className="h-4 w-4 text-gray-500" />
                  )}
                </div>
              )}
              
              {editingId === todo.id ? (
                <input
                  type="text"
                  autoFocus
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      saveEdit();
                    } else if (e.key === "Escape") {
                      e.preventDefault();
                      cancelEdit();
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  onBlur={saveEdit}
                  className="flex-1 bg-black/40 border border-indigo-500/50 rounded-lg px-2 py-1 text-white focus:outline-none"
                />
              ) : (
                <span className={`break-words leading-relaxed ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                  {todo.title}
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2 shrink-0">
              {editingId !== todo.id && (
                <span className="hidden sm:inline-block rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-gray-400">
                  {todo.subject}
                </span>
              )}
              
              <div className="flex items-center space-x-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                {editingId === todo.id ? (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); saveEdit(); }} className="p-1 hover:text-emerald-400 text-gray-400 transition-colors">
                      <Check className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); cancelEdit(); }} className="p-1 hover:text-red-400 text-gray-400 transition-colors">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={(e) => startEditing(e, todo.id, todo.title)} className="p-1 hover:text-blue-400 text-gray-400 transition-colors">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={(e) => handleDelete(e, todo.id)} className="p-1 hover:text-red-400 text-gray-400 transition-colors">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        {todos.length === 0 && (
          <div className="text-center py-6 text-xs text-gray-500">
            Henüz görev eklenmemiş.
          </div>
        )}
      </div>

      {/* Add Todo Form */}
      <form onSubmit={handleAdd} className="flex space-x-2 shrink-0">
        <input
          type="text"
          placeholder="Konu gir... (örn: Anayasa çalış)"
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
    </div>
  );
};
