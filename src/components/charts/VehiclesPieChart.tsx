// Vehicles Distribution Pie Chart (mock data)
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Cars", value: 1800 },
  { name: "Vans", value: 700 },
  { name: "Trucks", value: 400 },
  { name: "Buses", value: 200 },
  { name: "Motorcycles", value: 100 },
];
const COLORS = ["#6366f1", "#22d3ee", "#f59e42", "#f43f5e", "#10b981"];

export function VehiclesPieChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col"
    >
      <div className="font-bold text-lg mb-2 text-purple-700 dark:text-purple-300">Vehicles Distribution</div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
            {data.map((entry, i) => (
              <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
