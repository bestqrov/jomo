// DashboardContent: Main dashboard analytics content for Admin
import React from "react";
import { KpiCards } from "@/components/admin/KpiCards";
import { MainCharts } from "@/components/admin/MainCharts";
import { AdvancedAnalytics } from "@/components/admin/AdvancedAnalytics";
import { SystemHealth } from "@/components/admin/SystemHealth";
import { ActivityFeed } from "@/components/admin/ActivityFeed";
import { SmartFeatures } from "@/components/admin/SmartFeatures";

export function DashboardContent() {
  return (
    <div className="flex flex-col gap-8">
      <KpiCards />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 flex flex-col gap-8">
          <MainCharts />
          <AdvancedAnalytics />
        </div>
        <div className="flex flex-col gap-8">
          <SystemHealth />
          <ActivityFeed />
        </div>
      </div>
      <SmartFeatures />
    </div>
  );
}
