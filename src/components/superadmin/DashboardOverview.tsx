import React from "react";

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">Super Admin Dashboard</h1>
      {/* Metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* TODO: MetricsCard components for agencies, vehicles, drivers, users, subscriptions, MRR, maintenance, expiring docs */}
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-2xl font-bold text-blue-700">--</div>
          <div className="text-gray-500 mt-2">Total Agencies</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-2xl font-bold text-blue-700">--</div>
          <div className="text-gray-500 mt-2">Total Vehicles</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-2xl font-bold text-blue-700">--</div>
          <div className="text-gray-500 mt-2">Total Drivers</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-2xl font-bold text-blue-700">--</div>
          <div className="text-gray-500 mt-2">Total Users</div>
        </div>
      </div>
      {/* TODO: More metrics cards and analytics charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow p-6 h-64 flex items-center justify-center text-gray-400">
          Agencies Growth Chart (Coming soon)
        </div>
        <div className="bg-white rounded-xl shadow p-6 h-64 flex items-center justify-center text-gray-400">
          Vehicle Usage Chart (Coming soon)
        </div>
      </div>
    </div>
  );
}
