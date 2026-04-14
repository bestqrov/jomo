// SystemHealth: Active users, API response, errors, status for Admin
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Activity, Server } from "lucide-react";

const health = {
  activeUsers: 52,
  apiResponse: 210,
  errors: 1,
  status: "online",
};

export function SystemHealth() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col gap-4"
    >
      <div className="font-bold text-lg mb-2 text-green-700 dark:text-green-300">System Health</div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-blue-400" />
          <span className="font-medium">Active users:</span>
          <span className="font-bold text-blue-700 dark:text-blue-300">{health.activeUsers}</span>
        </div>
        <div className="flex items-center gap-3">
          <Server className="w-6 h-6 text-yellow-400" />
          <span className="font-medium">API response time:</span>
          <span className="font-bold text-yellow-700 dark:text-yellow-300">{health.apiResponse} ms</span>
        </div>
        <div className="flex items-center gap-3">
          <XCircle className="w-6 h-6 text-red-400" />
          <span className="font-medium">Errors:</span>
          <span className="font-bold text-red-700 dark:text-red-300">{health.errors}</span>
        </div>
        <div className="flex items-center gap-3">
          {health.status === "online" ? (
            <CheckCircle className="w-6 h-6 text-green-400" />
          ) : (
            <XCircle className="w-6 h-6 text-red-400" />
          )}
          <span className="font-medium">System status:</span>
          <span className={health.status === "online" ? "font-bold text-green-700 dark:text-green-300" : "font-bold text-red-700 dark:text-red-300"}>
            {health.status}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
