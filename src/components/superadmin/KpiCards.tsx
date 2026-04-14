// KPI Cards for Super Admin Dashboard
import React from "react";
import { TrendingUp, TrendingDown, Building2, Users, Car, User, CreditCard, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const kpis = [
  {
    label: "Total Agencies",
    value: 42,
    icon: Building2,
    color: "from-blue-400 to-blue-600",
    trend: 5.2,
    trendUp: true,
  },
  {
    label: "Total Users",
    value: 1280,
    icon: Users,
    color: "from-green-400 to-green-600",
    trend: 2.1,
    trendUp: true,
  },
  {
    label: "Total Vehicles",
    value: 3200,
    icon: Car,
    color: "from-purple-400 to-purple-600",
    trend: 1.7,
    trendUp: false,
  },
  {
    label: "Total Drivers",
    value: 850,
    icon: User,
    color: "from-pink-400 to-pink-600",
    trend: 3.8,
    trendUp: true,
  },
  {
    label: "Active Subscriptions",
    value: 1100,
    icon: CheckCircle,
    color: "from-yellow-400 to-yellow-600",
    trend: 0.9,
    trendUp: true,
  },
  {
    label: "Monthly Revenue",
    value: 42000,
    icon: CreditCard,
    color: "from-orange-400 to-orange-600",
    trend: 4.5,
    trendUp: true,
    isMoney: true,
  },
];

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {kpis.map((kpi, i) => (
        <motion.div
          key={kpi.label}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          whileHover={{ scale: 1.04 }}
          className={`rounded-2xl shadow-xl bg-gradient-to-br ${kpi.color} p-6 flex items-center gap-5 relative overflow-hidden cursor-pointer group transition`}
        >
          <kpi.icon className="w-10 h-10 text-white drop-shadow-lg" />
          <div className="flex-1">
            <div className="text-white text-lg font-semibold mb-1 flex items-center gap-2">
              {kpi.label}
            </div>
            <div className="text-3xl font-extrabold text-white flex items-end gap-2">
              <AnimatedCounter value={kpi.value} isMoney={kpi.isMoney} />
              <span className={`text-sm font-bold ${kpi.trendUp ? "text-green-200" : "text-red-200"} flex items-center gap-1`}>
                {kpi.trendUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {kpi.trend}%
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
