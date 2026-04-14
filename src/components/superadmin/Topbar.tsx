// Super Admin Topbar
import React from "react";
import { Search, Bell, UserCircle, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Topbar() {
  // TODO: Add dark mode toggle logic
  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8 py-4 shadow-sm">
      <div className="flex items-center gap-4 w-full max-w-lg">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search agencies, users, vehicles..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition">
          <Bell className="w-5 h-5 text-blue-500" />
          {/* Notification dot */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-950" />
        </button>
        <button className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition">
          <Sun className="w-5 h-5 text-yellow-400 dark:hidden" />
          <Moon className="w-5 h-5 text-blue-400 hidden dark:inline" />
        </button>
        <div className="relative">
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-900 hover:bg-blue-100 dark:hover:bg-blue-900 transition">
            <UserCircle className="w-6 h-6 text-blue-500" />
            <span className="font-medium text-gray-700 dark:text-gray-200">Super Admin</span>
          </button>
          {/* TODO: Profile dropdown */}
        </div>
      </div>
    </header>
  );
}
