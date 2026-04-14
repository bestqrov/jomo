// Main Admin Dashboard Layout
import React from "react";
import { Sidebar } from "@/components/layout/AdminSidebar";
import { Topbar } from "@/components/layout/AdminTopbar";
import { DashboardContent } from "@/components/admin/DashboardContent";

export function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-60">
        <Topbar />
        <main className="flex-1 p-8 md:p-10">
          <DashboardContent />
        </main>
      </div>
    </div>
  );
}
