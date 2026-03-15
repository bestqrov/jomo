"use client";
import React from "react";
import { Building } from "lucide-react";

export default function AgenciesPanel() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <Building className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-bold text-blue-900">Agencies</h3>
      </div>
      <p className="text-gray-600 mb-2">Create, update, and delete agencies.</p>
      {/* TODO: Agency management table and actions */}
      <div className="text-gray-400 italic">Agency management UI coming soon...</div>
    </div>
  );
}
