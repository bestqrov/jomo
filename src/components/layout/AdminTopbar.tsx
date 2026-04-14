"use client";
import React, { useState } from "react";
import { Sun, Moon, Image, LogOut } from "lucide-react";

export default function AdminTopbar({ logoUrl, steName, adminName }: { logoUrl?: string | null, steName: string, adminName: string }) {
  const [dark, setDark] = useState(false);
  const athan = { name: "Fajr", time: "05:14" };

  const toggleDark = () => {
    setDark((d) => {
      const html = document.documentElement;
      if (!d) {
        html.classList.add("dark");
        localStorage.setItem('theme', 'dark');
      } else {
        html.classList.remove("dark");
        localStorage.setItem('theme', 'light');
      }
      return !d;
    });
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 border-b dark:border-gray-800 shadow-sm sticky top-0 z-40">
      <div className="flex items-center gap-8">
        <div className="text-xs text-gray-500 dark:text-gray-300 font-semibold flex items-center gap-2">
          <span>Prochain Athan</span>
          <span className="font-bold text-blue-600 dark:text-blue-400">{athan.name}</span>
          <span className="text-lg font-bold text-gray-800 dark:text-white">{athan.time}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          onClick={toggleDark}
          aria-label="Toggle dark mode"
        >
          {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600 dark:text-gray-200" />}
        </button>
        <button
          className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition flex items-center justify-center"
          title="Déconnexion"
          onClick={async () => {
            await fetch('/api/auth/logout', { method: 'POST' });
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = '/login';
          }}
        >
          <LogOut className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-3 ml-4">
          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center border overflow-hidden">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo établissement" className="object-cover w-full h-full" />
            ) : (
              <Image size={24} className="text-gray-400" />
            )}
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-bold text-gray-800 dark:text-white">{steName}</span>
            <span className="text-xs text-gray-500 dark:text-gray-300">Administrateur</span>
            <span className="text-xs text-blue-700 dark:text-blue-300 font-semibold">{adminName}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
