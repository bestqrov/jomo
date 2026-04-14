// MainCharts: Revenue, Agencies, Vehicles, Missions charts for Admin
import React from "react";
import { RevenueLineChart } from "@/components/charts/RevenueLineChart";
import { AgenciesBarChart } from "@/components/charts/AgenciesBarChart";
import { VehiclesPieChart } from "@/components/charts/VehiclesPieChart";
import { MissionsAreaChart } from "@/components/charts/MissionsAreaChart";

export function MainCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <RevenueLineChart />
      <AgenciesBarChart />
      <VehiclesPieChart />
      <MissionsAreaChart />
    </div>
  );
}
