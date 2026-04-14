// Agencies Growth Bar Chart (mock data)
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

const data = [
  { month: "Jan", agencies: 30 },
  { month: "Feb", agencies: 32 },
  { month: "Mar", agencies: 34 },
  { month: "Apr", agencies: 36 },
  { month: "May", agencies: 38 },
  { month: "Jun", agencies: 40 },
  { month: "Jul", agencies: 41 },
  { month: "Aug", agencies: 42 },
  { month: "Sep", agencies: 42 },
  { month: "Oct", agencies: 42 },
  { month: "Nov", agencies: 42 },
  { month: "Dec", agencies: 42 },
];

export function AgenciesBarChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col"
    >
      <div className="font-bold text-lg mb-2 text-green-700 dark:text-green-300">Agencies Growth</div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Bar dataKey="agencies" fill="#22c55e" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
