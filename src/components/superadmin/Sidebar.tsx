// Super Admin Sidebar
import React from "react";
import Link from "next/link";
import { Home, Building2, Users, CreditCard, BarChart2, Settings, LineChart, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const menu = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/superadmin/dashboard" },
  { label: "Agencies", icon: Building2, href: "/superadmin/agencies" },
  { label: "Users", icon: Users, href: "/superadmin/users" },
  { label: "Plans", icon: BarChart2, href: "/superadmin/plans" },
  { label: "Billing", icon: CreditCard, href: "/superadmin/billing" },
  { label: "Analytics", icon: LineChart, href: "/superadmin/analytics" },
  { label: "Settings", icon: Settings, href: "/superadmin/settings" },
];

export function Sidebar() {
  // TODO: Use usePathname for active state
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 shadow-lg flex flex-col py-6 px-4">
      <div className="mb-8 flex items-center gap-2 px-2">
        <span className="text-2xl font-extrabold text-blue-700 dark:text-blue-300 tracking-tight">ArwaPark</span>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full ml-2">Super Admin</span>
      </div>
      <nav className="flex-1">
        <ul className="space-y-1">
          {menu.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900 transition group text-base",
                  // TODO: Add active state
                  // isActive ? "bg-blue-600 text-white" : ""
                )}
              >
                <item.icon className="w-5 h-5 text-blue-400 group-hover:text-blue-600 transition" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
