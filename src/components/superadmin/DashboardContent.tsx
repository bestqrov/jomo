// DashboardContent: Main dashboard analytics content
import React from "react";
import { KpiCards } from "@/components/superadmin/KpiCards";
import { MainCharts } from "@/components/superadmin/MainCharts";
import { AdvancedAnalytics } from "@/components/superadmin/AdvancedAnalytics";
import { SystemHealth } from "@/components/superadmin/SystemHealth";
import { ActivityFeed } from "@/components/superadmin/ActivityFeed";
import { SmartFeatures } from "@/components/superadmin/SmartFeatures";

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
