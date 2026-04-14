"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_KEY = "arwapark-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    const preference = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(preference);
    document.documentElement.classList.toggle("dark", preference === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem(THEME_KEY, next);
  };

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="fixed right-4 bottom-4 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white/95 text-slate-700 shadow-lg backdrop-blur transition hover:scale-105 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
