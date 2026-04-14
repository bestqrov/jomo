// AdvancedAnalytics: Top agencies, most active, most used features for Admin
import React from "react";
import { motion } from "framer-motion";

const topAgencies = [
  { name: "Atlas Mobility", vehicles: 120, revenue: 3200 },
  { name: "Casablanca Fleet", vehicles: 110, revenue: 3100 },
  { name: "Marrakech Express", vehicles: 95, revenue: 2950 },
  { name: "Rabat Transport", vehicles: 80, revenue: 2700 },
  { name: "Agadir Move", vehicles: 70, revenue: 2500 },
];
const mostActive = [
  { name: "Atlas Mobility", activity: 98 },
  { name: "Casablanca Fleet", activity: 95 },
  { name: "Marrakech Express", activity: 93 },
  { name: "Rabat Transport", activity: 91 },
  { name: "Agadir Move", activity: 89 },
];
const mostUsedFeatures = [
  { feature: "Vehicle Tracking", usage: 92 },
  { feature: "Missions", usage: 88 },
  { feature: "Billing", usage: 85 },
  { feature: "Analytics", usage: 80 },
  { feature: "Notifications", usage: 77 },
];

export function AdvancedAnalytics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col gap-8"
    >
      <div className="font-bold text-lg mb-2 text-blue-700 dark:text-blue-300">Advanced Analytics</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Top 5 Agencies</div>
          <ul className="space-y-2">
            {topAgencies.map((a) => (
              <li key={a.name} className="flex justify-between items-center">
                <span>{a.name}</span>
                <span className="font-bold text-blue-600 dark:text-blue-300">{a.vehicles} vehicles</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Most Active Agencies</div>
          <ul className="space-y-2">
            {mostActive.map((a) => (
              <li key={a.name} className="flex justify-between items-center">
                <span>{a.name}</span>
                <span className="font-bold text-green-600 dark:text-green-300">{a.activity}%</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold text-gray-700 dark:text-gray-200 mb-2">Most Used Features</div>
          <ul className="space-y-2">
            {mostUsedFeatures.map((f) => (
              <li key={f.feature} className="flex justify-between items-center">
                <span>{f.feature}</span>
                <span className="font-bold text-purple-600 dark:text-purple-300">{f.usage}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
