// SmartFeatures: Filters, export, real-time, skeletons, empty states for Admin
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, Loader2, Calendar, FileText } from "lucide-react";

const dateRanges = [
  { label: "Today", value: "today" },
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
];

export function SmartFeatures() {
  const [range, setRange] = useState("month");
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);

  // Simulate loading
  const handleRange = (val: string) => {
    setLoading(true);
    setRange(val);
    setTimeout(() => {
      setLoading(false);
      setEmpty(val === "today"); // Simulate empty state for "today"
    }, 900);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col gap-6"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-400" />
          <span className="font-bold text-gray-700 dark:text-gray-200">Filters:</span>
          <div className="flex gap-2 ml-2">
            {dateRanges.map((d) => (
              <button
                key={d.value}
                onClick={() => handleRange(d.value)}
                className={`px-3 py-1 rounded-lg font-medium transition border border-blue-200 dark:border-blue-800 ${range === d.value ? "bg-blue-600 text-white" : "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-900"}`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition">
            <FileText className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          <span className="ml-4 text-lg text-blue-400 font-semibold">Loading data...</span>
        </div>
      ) : empty ? (
        <div className="flex flex-col items-center justify-center py-12">
          <img src="/empty-state.svg" alt="No data" className="w-32 h-32 mb-4 opacity-80" />
          <span className="text-lg text-gray-400 font-semibold">No data for this range.</span>
        </div>
      ) : (
        <div className="flex items-center justify-center py-8">
          <span className="text-lg text-gray-600 dark:text-gray-300">Data loaded! (Simulated real-time updates)</span>
        </div>
      )}
    </motion.div>
  );
}
