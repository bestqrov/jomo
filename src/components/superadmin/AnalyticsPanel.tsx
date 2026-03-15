"use client";
import React from "react";
import { BarChart2 } from "lucide-react";

export default function AnalyticsPanel() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart2 className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-bold text-blue-900">Analytics</h3>
      </div>
      <p className="text-gray-600 mb-2">View platform-wide statistics.</p>
      {/* TODO: Analytics charts and stats */}
      <div className="text-gray-400 italic">Analytics dashboard coming soon...</div>
    </div>
  );
}
