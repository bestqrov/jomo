// Missions per Day Area Chart (mock data)
import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion } from "framer-motion";

const data = [
  { day: "Mon", missions: 120 },
  { day: "Tue", missions: 140 },
  { day: "Wed", missions: 160 },
  { day: "Thu", missions: 180 },
  { day: "Fri", missions: 200 },
  { day: "Sat", missions: 170 },
  { day: "Sun", missions: 150 },
];

export function MissionsAreaChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col"
    >
      <div className="font-bold text-lg mb-2 text-pink-700 dark:text-pink-300">Missions per Day</div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="day" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Area type="monotone" dataKey="missions" stroke="#f472b6" fill="#fbcfe8" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
