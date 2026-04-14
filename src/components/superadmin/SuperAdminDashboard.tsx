// Main Super Admin Dashboard Layout
import React from "react";
import { Sidebar } from "@/components/superadmin/Sidebar";
import { Topbar } from "@/components/superadmin/Topbar";
import { DashboardContent } from "@/components/superadmin/DashboardContent";

export function SuperAdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64">
        <Topbar />
        <main className="flex-1 p-8 md:p-10">
          <DashboardContent />
        </main>
      </div>
    </div>
  );
}
