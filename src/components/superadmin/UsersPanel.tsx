"use client";
import React from "react";
import { Users } from "lucide-react";

export default function UsersPanel() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-6 h-6 text-blue-500" />
        <h3 className="text-xl font-bold text-blue-900">Users</h3>
      </div>
      <p className="text-gray-600 mb-2">Manage super admins, admins, and clients.</p>
      {/* TODO: User management table and actions */}
      <div className="text-gray-400 italic">User management UI coming soon...</div>
    </div>
  );
}
