import { Building, Users, Layers, BarChart2, Car, UserCog, ClipboardList, Wrench, CreditCard, DollarSign, FileText, Bell, Activity, ToggleLeft, Settings, Key, Mail, Cloud } from "lucide-react";
import Link from "next/link";

const sections = [
  { label: "Dashboard", icon: BarChart2, href: "/superadmin/dashboard" },
  {
    label: "SaaS Management", children: [
      { label: "Agencies", icon: Building, href: "/superadmin/agencies" },
      { label: "Users", icon: Users, href: "/superadmin/users" },
      { label: "Plans", icon: Layers, href: "/superadmin/plans" },
      { label: "Subscriptions", icon: ClipboardList, href: "/superadmin/subscriptions" },
    ]
  },
  {
    label: "Fleet Overview", children: [
      { label: "Vehicles", icon: Car, href: "/superadmin/fleet?tab=vehicles" },
      { label: "Drivers", icon: UserCog, href: "/superadmin/fleet?tab=drivers" },
      { label: "Missions", icon: ClipboardList, href: "/superadmin/fleet?tab=missions" },
      { label: "Maintenance", icon: Wrench, href: "/superadmin/fleet?tab=maintenance" },
    ]
  },
  {
    label: "Billing", children: [
      { label: "Payments", icon: CreditCard, href: "/superadmin/billing?tab=payments" },
      { label: "Revenue", icon: DollarSign, href: "/superadmin/billing?tab=revenue" },
      { label: "Invoices", icon: FileText, href: "/superadmin/billing?tab=invoices" },
    ]
  },
  {
    label: "Analytics", children: [
      { label: "Platform Statistics", icon: BarChart2, href: "/superadmin/analytics?tab=platform" },
      { label: "Fleet Analytics", icon: Car, href: "/superadmin/analytics?tab=fleet" },
      { label: "Usage Analytics", icon: Users, href: "/superadmin/analytics?tab=usage" },
    ]
  },
  {
    label: "System", children: [
      { label: "Notifications", icon: Bell, href: "/superadmin/notifications" },
      { label: "Activity Logs", icon: Activity, href: "/superadmin/logs" },
      { label: "Feature Flags", icon: ToggleLeft, href: "/superadmin/feature-flags" },
    ]
  },
  {
    label: "Settings", children: [
      { label: "Global Settings", icon: Settings, href: "/superadmin/settings?tab=global" },
      { label: "API Keys", icon: Key, href: "/superadmin/settings?tab=api-keys" },
      { label: "Email Settings", icon: Mail, href: "/superadmin/settings?tab=email" },
      { label: "File Storage", icon: Cloud, href: "/superadmin/settings?tab=storage" },
    ]
  },
];

export default function SuperAdminSidebar() {
  return (
    <aside className="h-screen w-64 bg-white border-r shadow-lg flex flex-col p-4 fixed top-0 left-0 z-30">
      <div className="mb-8 flex items-center gap-2 px-2">
        <span className="text-2xl font-extrabold text-blue-700 tracking-tight">ArwaPark</span>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full ml-2">Super Admin</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {sections.map((section, idx) => (
            <li key={section.label + idx}>
              {section.children ? (
                <div className="mb-1 mt-4 text-xs font-bold text-gray-500 uppercase tracking-wider px-2">{section.label}</div>
              ) : null}
              <ul className="space-y-1">
                {(section.children || [section]).map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition group">
                      <item.icon className="w-5 h-5 text-blue-400 group-hover:text-blue-700" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
