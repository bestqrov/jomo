"use client";
import { Home, Car, Users, ClipboardList, Wrench, Calendar, FileText, Settings, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

import React, { useState } from "react";

const sections = [
  { label: "Dashboard", icon: Home, href: "/admin/dashboard" },
  {
    label: "ADMINISTRATIF", children: [
      { label: "Vignettes", icon: FileText, href: "/admin/administratif?tab=vignettes" },
      { label: "Cartes grises", icon: FileText, href: "/admin/administratif?tab=cartes-grises" },
      { label: "Visites techniques", icon: FileText, href: "/admin/administratif?tab=visites-techniques" },
      { label: "Taxes", icon: FileText, href: "/admin/administratif?tab=taxes" },
      { label: "Agréments", icon: FileText, href: "/admin/administratif?tab=agrements" },
      { label: "Permis de circulation", icon: FileText, href: "/admin/administratif?tab=permis-circulations" },
      { label: "Autorisations de circulation", icon: FileText, href: "/admin/administratif?tab=autorisations-circulation" },
      { label: "Assurances", icon: FileText, href: "/admin/administratif?tab=assurances" },
      { label: "Assurances Internationales", icon: FileText, href: "/admin/administratif?tab=assurances-internationales" },
      { label: "Carnets métrologiques", icon: FileText, href: "/admin/administratif?tab=carnets-metrologiques" },
      { label: "Extincteurs", icon: FileText, href: "/admin/administratif?tab=extincteurs" },
      { label: "Sinistres", icon: FileText, href: "/admin/administratif?tab=sinistres" },
      { label: "Contrats de leasing", icon: FileText, href: "/admin/administratif?tab=contrats-leasing" },
    ]
  },
  {
    label: "FLOTS", children: [
      { label: "Véhicules", icon: Car, href: "/admin/flots?tab=vehicules" },
      { label: "Kilométrages", icon: FileText, href: "/admin/flots?tab=kilometrages" },
      { label: "Indexe horaire", icon: FileText, href: "/admin/flots?tab=indexe-horaire" },
      { label: "Contrats de leasing", icon: FileText, href: "/admin/flots?tab=leasing" },
      { label: "Contrats de location", icon: FileText, href: "/admin/flots?tab=location" },
      { label: "Contrats d’achat", icon: FileText, href: "/admin/flots?tab=achat" },
      { label: "Véhicules de remplacement", icon: FileText, href: "/admin/flots?tab=remplacement" },
      { label: "Equipements véhicule", icon: FileText, href: "/admin/flots?tab=equipements" },
      { label: "Véhicules réformés", icon: FileText, href: "/admin/flots?tab=reformes" },
      { label: "Factures", icon: FileText, href: "/admin/flots?tab=factures" },
    ]
  },
  {
    label: "TRANSPORT", children: [
      { label: "Factures", icon: FileText, href: "/admin/transport?tab=factures" },
      { label: "Facture avoir", icon: FileText, href: "/admin/transport?tab=facture-avoir" },
      { label: "Demandes trans", icon: FileText, href: "/admin/transport?tab=demandes" },
      { label: "Planing", icon: Calendar, href: "/admin/transport?tab=planning" },
      { label: "Missions", icon: ClipboardList, href: "/admin/transport?tab=missions" },
    ]
  },
  {
    label: "MAINTENANCE", children: [
      { label: "Intervention", icon: Wrench, href: "/admin/maintenance?tab=intervention" },
      { label: "Diagnostiques", icon: FileText, href: "/admin/maintenance?tab=diagnostiques" },
      { label: "Entretien", icon: FileText, href: "/admin/maintenance?tab=entretien" },
    ]
  },
  {
    label: "CONSOMMATION", children: [
      { label: "Carburant", icon: FileText, href: "/admin/consommation?tab=carburant" },
      { label: "Cartes", icon: FileText, href: "/admin/consommation?tab=cartes" },
      { label: "Autoroutes", icon: FileText, href: "/admin/consommation?tab=autoroutes" },
      { label: "Dépenses", icon: FileText, href: "/admin/consommation?tab=depenses" },
    ]
  },
  {
    label: "GESTION", children: [
      { label: "Contrat", icon: FileText, href: "/admin/gestion?tab=contrat" },
      { label: "Salaires", icon: FileText, href: "/admin/gestion?tab=salaires" },
      { label: "Collaborateurs", icon: Users, href: "/admin/gestion?tab=collaborateurs" },
      { label: "Absence", icon: FileText, href: "/admin/gestion?tab=absence" },
      { label: "Congés", icon: FileText, href: "/admin/gestion?tab=conges" },
      { label: "Formations", icon: FileText, href: "/admin/gestion?tab=formations" },
      { label: "Visite medicale", icon: FileText, href: "/admin/gestion?tab=visite-medicale" },
      { label: "Visas", icon: FileText, href: "/admin/gestion?tab=visas" },
      { label: "Passeports", icon: FileText, href: "/admin/gestion?tab=passeports" },
      { label: "Plan d’entretien", icon: FileText, href: "/admin/gestion?tab=plan-entretien" },
    ]
  },
  { label: "Parametres", icon: Settings, href: "/admin/settings" },
];

import { usePathname, useSearchParams } from "next/navigation";

export default function AdminSidebar() {
  const [expandedSections, setExpandedSections] = useState({});
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Build the full path including query string
  const fullPath = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

  const toggleSection = (label) => {
    setExpandedSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  // Remove Parametres from main sections for unique bottom button
  const mainSections = sections.filter((s) => s.label !== "Parametres");
  const paramSection = sections.find((s) => s.label === "Parametres");

  return (
    <aside className="h-screen w-60 bg-blue-700 border-r shadow-lg flex flex-col p-4 fixed top-0 left-0 z-30">
      <div className="mb-6 flex items-center gap-2 px-2">
        <span className="text-2xl font-extrabold text-white tracking-tight">ArwaPark</span>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full ml-2">Admin</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {mainSections.map((section, idx) => (
            <li key={section.label + idx}>
              {section.children ? (
                <div className="mb-1 mt-3 flex items-center justify-between px-1">
                  <span className="text-xs font-bold uppercase tracking-wider px-1 py-0.5 rounded border-l-4 border-green-400 text-green-200 bg-blue-800/60" style={{fontFamily:'serif', letterSpacing:'0.08em', borderColor:'#22c55e'}}>{section.label}</span>
                  {section.children.length > 4 && (
                    <button
                      aria-label={expandedSections[section.label] ? 'Show less' : 'Show more'}
                      className="ml-2 text-green-200 hover:text-green-400 focus:outline-none"
                      onClick={() => toggleSection(section.label)}
                      type="button"
                    >
                      {expandedSections[section.label] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  )}
                </div>
              ) : null}
              <ul className="space-y-0.5">
                {(section.children
                  ? expandedSections[section.label]
                    ? section.children
                    : section.children.slice(0, 4)
                  : [section]
                ).map((item) => {
                  // Compare full path (pathname + search) to item.href for exact match
                  const isSelected = fullPath === item.href;
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition group
                          ${isSelected ? "bg-green-600 text-white font-bold" : "text-blue-100 hover:bg-blue-600 hover:text-white"}`}
                      >
                        <item.icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-blue-200 group-hover:text-white"}`} />
                        <span className="font-medium font-sans text-[15px] tracking-tight" style={{fontFamily:'Poppins,Arial,sans-serif'}}>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
      {/* Unique Parametres button at bottom */}
      {paramSection && (
        <Link
          href={paramSection.href}
          className={`mt-6 flex items-center gap-3 px-3 py-3 rounded-lg text-blue-100 bg-blue-900 hover:bg-green-600 hover:text-white transition font-bold border-t border-blue-800 ${pathname && pathname.startsWith(paramSection.href) ? "bg-green-600 text-white" : ""}`}
          style={{marginTop:'auto'}}
        >
          <paramSection.icon className="w-5 h-5" />
          <span className="font-medium font-sans text-[15px] tracking-tight">{paramSection.label}</span>
        </Link>
      )}
    </aside>
  );
}
