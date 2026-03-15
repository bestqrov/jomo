
"use client";
import React, { useState } from "react";
import { Building, Users, Layers, BarChart2 } from "lucide-react";
import {
  AgenciesPanel,
  UsersPanel,
  PlansPanel,
  AnalyticsPanel,
} from "./superadmin";

const menu = [
  {
    label: "Agencies",
    description: "Create, update, and delete agencies",
    icon: Building,
    component: AgenciesPanel,
  },
  {
    label: "Users",
    description: "Manage super admins, admins, and clients",
    icon: Users,
    component: UsersPanel,
  },
  {
    label: "Plans",
    description: "Configure SaaS subscription plans",
    icon: Layers,
    component: PlansPanel,
  },
  {
    label: "Analytics",
    description: "View platform-wide statistics",
    icon: BarChart2,
    component: AnalyticsPanel,
  },
];

export default function SaaSManagementPanel() {
  const [selected, setSelected] = useState(menu[0].label);
  const ActivePanel = menu.find((m) => m.label === selected)?.component;

  return (
    <section className="bg-white/80 rounded-2xl shadow-xl p-8 mb-8 max-w-4xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-extrabold mb-8 text-blue-900 tracking-tight flex items-center gap-2">
        <span className="inline-block w-2 h-8 bg-blue-500 rounded-full mr-2"></span>
        SaaS Management
      </h2>
      <div className="flex gap-4 mb-8">
        {menu.map((item) => (
          <button
            key={item.label}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-150 text-blue-800 font-medium bg-white hover:bg-blue-50 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              selected === item.label
                ? "border-blue-500 bg-blue-100 text-blue-900 shadow"
                : "border-blue-100"
            }`}
            onClick={() => setSelected(item.label)}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </div>
      <div>
        {ActivePanel && <ActivePanel />}
      </div>
    </section>
  );
}
