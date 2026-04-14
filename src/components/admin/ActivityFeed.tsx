// ActivityFeed: Recent activities for Admin
import React from "react";
import { motion } from "framer-motion";
import { UserPlus, CreditCard, LogIn, ArrowUpRight, Building2 } from "lucide-react";

const activities = [
  { type: "agency", text: "New agency created: Atlas Mobility", icon: Building2, time: "2m ago" },
  { type: "subscription", text: "New subscription: Casablanca Fleet", icon: CreditCard, time: "10m ago" },
  { type: "login", text: "User login: admin@arwapark.com", icon: LogIn, time: "15m ago" },
  { type: "upgrade", text: "Plan upgrade: Marrakech Express", icon: ArrowUpRight, time: "30m ago" },
  { type: "user", text: "New user: john.doe@arwapark.com", icon: UserPlus, time: "1h ago" },
];

export function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col gap-4"
    >
      <div className="font-bold text-lg mb-2 text-pink-700 dark:text-pink-300">Activity Feed</div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {activities.map((a, i) => (
          <li key={i} className="flex items-center gap-3 py-3">
            <a.icon className="w-6 h-6 text-blue-400" />
            <span className="flex-1 text-gray-700 dark:text-gray-200">{a.text}</span>
            <span className="text-xs text-gray-400">{a.time}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
