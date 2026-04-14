// Revenue Growth Line Chart (mock data)
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

const data = [
  { month: "Jan", revenue: 32000 },
  { month: "Feb", revenue: 34000 },
  { month: "Mar", revenue: 37000 },
  { month: "Apr", revenue: 39000 },
  { month: "May", revenue: 42000 },
  { month: "Jun", revenue: 45000 },
  { month: "Jul", revenue: 47000 },
  { month: "Aug", revenue: 49000 },
  { month: "Sep", revenue: 51000 },
  { month: "Oct", revenue: 53000 },
  { month: "Nov", revenue: 55000 },
  { month: "Dec", revenue: 57000 },
];

export function RevenueLineChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col"
    >
      <div className="font-bold text-lg mb-2 text-blue-700 dark:text-blue-300">Revenue Growth</div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={false} activeDot={{ r: 7 }} />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
