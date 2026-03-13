import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Car, Gauge, Clock, FileText, Settings, Users, Wrench, Fuel, Calendar, CreditCard, Briefcase, UserCheck, FileWarning, ShieldCheck, ClipboardList, FileSignature, FileCheck2, FileBadge, FileBarChart, FileCog, FileInput, FileOutput, FileSearch, FileSpreadsheet, FileText as FileTextIcon, FileX, FilePlus, FileMinus, FileEdit, FileLock, FileUnlock, FileUser, FileUserCheck, FileUserX, FileUserPlus, FileUserMinus, FileUserEdit, FileUserCog, FileUserLock, FileUserUnlock, FileUserShield, FileUserBadge, FileUserBarChart, FileUserInput, FileUserOutput, FileUserSearch, FileUserSpreadsheet, FileUserText, FileUserX2, FileUserPlus2, FileUserMinus2, FileUserEdit2, FileUserCog2, FileUserLock2, FileUserUnlock2, FileUserShield2, FileUserBadge2, FileUserBarChart2, FileUserInput2, FileUserOutput2, FileUserSearch2, FileUserSpreadsheet2, FileUserText2, FileUserX3, FileUserPlus3, FileUserMinus3, FileUserEdit3, FileUserCog3, FileUserLock3, FileUserUnlock3, FileUserShield3, FileUserBadge3, FileUserBarChart3, FileUserInput3, FileUserOutput3, FileUserSearch3, FileUserSpreadsheet3, FileUserText3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const sections = [
  {
    label: 'Dashboard',
    icon: Home,
    links: [
      { label: 'Dashboard', href: '/dashboard', icon: Gauge },
    ],
  },
  {
    label: 'FLOTS',
    icon: Car,
    links: [
      { label: 'Vehicles', href: '/flotte/vehicles', icon: Car },
      { label: 'Kilometrages', href: '/flotte/kilometrages', icon: Gauge },
      { label: 'Index horaire', href: '/flotte/index-horaire', icon: Clock },
      { label: 'Contrats leasing', href: '/flotte/contrats-leasing', icon: FileText },
      { label: 'Contrats location', href: '/flotte/contrats-location', icon: FileText },
      { label: 'Contrats achat', href: '/flotte/contrats-achat', icon: FileText },
      { label: 'Vehicules remplacement', href: '/flotte/vehicules-remplacement', icon: Car },
      { label: 'Equipements vehicule', href: '/flotte/equipements-vehicule', icon: Settings },
      { label: 'Vehicules reformes', href: '/flotte/vehicules-reformes', icon: Car },
    ],
  },
  {
    label: 'ADMINISTRATIF',
    icon: FileText,
    links: [
      { label: 'Vignettes', href: '/administratif/vignettes', icon: FileBadge },
      { label: 'Cartes grises', href: '/administratif/cartes-grises', icon: FileTextIcon },
      { label: 'Visites techniques', href: '/administratif/visites-techniques', icon: FileCheck2 },
      { label: 'Taxes', href: '/administratif/taxes', icon: CreditCard },
      { label: 'Agrements', href: '/administratif/agrements', icon: FileSignature },
      { label: 'Permis circulation', href: '/administratif/permis-circulation', icon: FileCheck2 },
      { label: 'Autorisations circulation', href: '/administratif/autorisations-circulation', icon: FileCheck2 },
      { label: 'Assurances', href: '/administratif/assurances', icon: ShieldCheck },
      { label: 'Assurances internationales', href: '/administratif/assurances-internationales', icon: ShieldCheck },
      { label: 'Carnets metrologiques', href: '/administratif/carnets-metrologiques', icon: ClipboardList },
      { label: 'Extincteurs', href: '/administratif/extincteurs', icon: FileWarning },
      { label: 'Sinistres', href: '/administratif/sinistres', icon: FileX },
    ],
  },
  {
    label: 'TRANSPORT',
    icon: Calendar,
    links: [
      { label: 'Factures', href: '/transport/factures', icon: FileText },
      { label: 'Factures avoir', href: '/transport/factures-avoir', icon: FileMinus },
      { label: 'Demandes transport', href: '/transport/demandes-transport', icon: FileEdit },
      { label: 'Planning', href: '/transport/planning', icon: Calendar },
      { label: 'Missions', href: '/transport/missions', icon: Briefcase },
    ],
  },
  {
    label: 'MAINTENANCE',
    icon: Wrench,
    links: [
      { label: 'Interventions', href: '/maintenance/interventions', icon: Wrench },
      { label: 'Diagnostiques', href: '/maintenance/diagnostiques', icon: FileSearch },
      { label: 'Entretiens', href: '/maintenance/entretiens', icon: FileCog },
      { label: 'Plan entretien', href: '/maintenance/plan-entretien', icon: FileInput },
    ],
  },
  {
    label: 'CONSOMMATION',
    icon: Fuel,
    links: [
      { label: 'Carburant', href: '/consommation/carburant', icon: Fuel },
      { label: 'Cartes carburant', href: '/consommation/cartes-carburant', icon: CreditCard },
      { label: 'Autoroutes', href: '/consommation/autoroutes', icon: FileOutput },
      { label: 'Depenses', href: '/consommation/depenses', icon: FileBarChart },
    ],
  },
  {
    label: 'GESTION',
    icon: Briefcase,
    links: [
      { label: 'Contrats', href: '/gestion/contrats', icon: FileText },
      { label: 'Salaires', href: '/gestion/salaires', icon: CreditCard },
    ],
  },
  {
    label: 'HR',
    icon: Users,
    links: [
      { label: 'Collaborateurs', href: '/hr/collaborateurs', icon: UserCheck },
      { label: 'Absences', href: '/hr/absences', icon: FileUserX },
      { label: 'Conges', href: '/hr/conges', icon: FileUserPlus },
      { label: 'Formations', href: '/hr/formations', icon: FileUserEdit },
      { label: 'Visite medicale', href: '/hr/visite-medicale', icon: FileUserShield },
      { label: 'Visas', href: '/hr/visas', icon: FileUserLock },
      { label: 'Passeports', href: '/hr/passeports', icon: FileUser },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside className={cn(
      'h-screen bg-white border-r shadow-sm flex flex-col transition-all duration-300',
      collapsed ? 'w-20' : 'w-64'
    )}>
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <span className="font-bold text-primary text-lg transition-all duration-300" style={{ opacity: collapsed ? 0 : 1 }}>ArwaPark</span>
        <button
          className="p-2 rounded hover:bg-gray-100"
          onClick={() => setCollapsed((c) => !c)}
          aria-label="Toggle sidebar"
        >
          <Settings size={20} />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        {sections.map((section) => (
          <div key={section.label} className="mb-4">
            <div className={cn('flex items-center px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2', collapsed && 'justify-center')}>{React.createElement(section.icon, { size: 16, className: 'mr-2 text-primary-500' })}{!collapsed && section.label}</div>
            <ul className="space-y-1">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={cn(
                    'flex items-center px-4 py-2 rounded transition-colors group',
                    pathname.startsWith(link.href) ? 'bg-primary-100 text-primary-700 font-semibold' : 'text-gray-700 hover:bg-gray-100',
                    collapsed && 'justify-center px-2'
                  )}>
                    {React.createElement(link.icon, { size: 18, className: 'mr-3 text-primary-500 group-hover:text-primary-700 transition-colors' })}
                    {!collapsed && link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
