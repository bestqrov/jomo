"use client";
import React from "react";
import { Layers } from "lucide-react";

export default function PlansPanel() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <Layers className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-bold text-blue-900">Plans</h3>
      </div>
      <p className="text-gray-600 mb-2">Configure SaaS subscription plans.</p>
      {/* TODO: Plan management table and actions */}
      <div className="text-gray-400 italic">Plan management UI coming soon...</div>
    </div>
  );
}
