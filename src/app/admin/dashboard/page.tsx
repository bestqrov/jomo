"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  AlertTriangle,
  CalendarCheck,
  FileText,
  ShieldCheck,
  Truck,
  TrendingUp,
  Clock,
  Droplet,
  Wrench,
} from "lucide-react";
import { PdfReportButton } from "@/components/ui/PdfReportButton";

const metrics = [
  {
    group: "Administratifs",
    items: [
      { label: "Cartes grises", value: 0 },
      { label: "Visites techniques", value: 0 },
      { label: "Carnets métrologiques", value: 0 },
      { label: "Vignettes", value: 0 },
      { label: "Assurances", value: 0 },
      { label: "Taxes", value: 0 },
      { label: "Autorisations de circulation", value: 0 },
      { label: "Permis de circulation", value: 0 },
      { label: "Extincteurs", value: 0 },
      { label: "Agréments", value: 0 },
      { label: "Assurances Internationales", value: 0 },
      { label: "Réforme", value: 0 },
      { label: "Fin mise en circulation", value: 0 },
    ],
  },
  {
    group: "Alertes",
    items: [
      { label: "Location/Plafond kilométrique", value: 0 },
      { label: "Techniques/Saisie du kilométrage", value: 0 },
      { label: "Véhicules en panne", value: 0 },
      { label: "Opérations techniques KM", value: 0 },
      { label: "Pneumatique", value: 0 },
      { label: "Consommations Citerne", value: 0 },
      { label: "Collaborateurs Validité permis", value: 0 },
      { label: "Visite médicale", value: 0 },
      { label: "Formations collaborateur", value: 0 },
      { label: "Contrats collaborateur", value: 0 },
      { label: "Passeports", value: 0 },
      { label: "Visas", value: 0 },
      { label: "Assurance collaborateur", value: 0 },
      { label: "Autorisations d'échantillon", value: 0 },
    ],
  },
  {
    group: "Finance",
    items: [
      { label: "Factures clients", value: 0 },
      { label: "Factures fournisseurs", value: 0 },
      { label: "Bons de commande", value: 0 },
    ],
  },
  {
    group: "Stock",
    items: [
      { label: "Ruptures stock", value: 0 },
      { label: "Bons de commande internes", value: 0 },
    ],
  },
];

const alerts = [
  { title: "Contrats de leasing expirants", value: 4, icon: CalendarCheck, color: "amber" },
  { title: "Avertissements de kilométrage", value: 2, icon: TrendingUp, color: "red" },
  { title: "Documents manquants", value: 7, icon: FileText, color: "blue" },
  { title: "Assurances proches d'expiration", value: 3, icon: ShieldCheck, color: "purple" },
];

const stats = [
  { title: "Statistiques Carburant", subtitle: "Consommation et coût", icon: Droplet, value: "9.1 L/100km", change: "8%" },
  { title: "Véhicules totaux", subtitle: "Flotte active", icon: Truck, value: 120, change: "+5%" },
  { title: "Alertes techniques", subtitle: "Pannes et maintenance", icon: Wrench, value: 14, change: "-2%" },
  { title: "Utilisation moyenne", subtitle: "KM par jour", icon: Clock, value: "254 km", change: "+12%" },
];

export default function AdminDashboard() {
  const reportRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen bg-slate-50 p-5 md:p-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-slate-500">Vue centralisée des statistiques, alertes et opérations critiques.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => window.location.reload()} className="rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50">Actualiser</button>
          <PdfReportButton targetRef={reportRef} fileName="rapport-dashboard" />
        </div>
      </div>

      <div ref={reportRef}>
      <section id="print-dashboard">
      <div className="pdf-header mb-4 p-4 rounded-xl text-white" style={{backgroundColor: '#0d47a1'}}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">ArwaPark Rapport Analytique</h2>
            <p className="text-sm">Date : {new Date().toLocaleDateString()}</p>
          </div>
          <img src="/logo.png" alt="ArwaPark" className="h-12 object-contain mx-auto" style={{height:'54px'}} />
          <div className="text-right text-sm">
            <p>Web : arwapark.com</p>
            <p>Support : support@arwapark.com</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((item) => (
          <div key={item.title} className="rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-medium text-slate-500">{item.title}</p>
                <p className="text-xs text-slate-400">{item.subtitle}</p>
              </div>
              <div className="rounded-full bg-slate-100 p-2 text-slate-600"><item.icon className="h-5 w-5" /></div>
            </div>
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-slate-800">{item.value}</h2>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">{item.change}</span>
            </div>
          </div>
        ))}        </div>      </section>

      <section className="grid grid-cols-1 xl:grid-cols-4 gap-4 mb-6">
        <div className="xl:col-span-1 rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-700">Alertes</h2>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <div className="space-y-2">
            {alerts.map((alert) => (
              <div key={alert.title} className="rounded-xl border border-slate-100 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <alert.icon className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-700 font-medium">{alert.title}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800">{alert.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-3 rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-700">Administratifs</h2>
            <Link href="/admin/administratif" className="text-sm font-semibold text-blue-600">Voir tout</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {metrics.find((section) => section.group === "Administratifs")?.items.map((item) => (
              <article key={item.label} className="rounded-xl border border-slate-100 p-3">
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className="text-2xl font-bold text-slate-800">{item.value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <h3 className="text-lg font-bold text-slate-700 mb-3">Finance</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {metrics.find((section) => section.group === "Finance")?.items.map((item) => (
              <article key={item.label} className="rounded-lg border border-slate-100 p-3">
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className="text-xl font-bold text-slate-800">{item.value}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <h3 className="text-lg font-bold text-slate-700 mb-3">Stock</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {metrics.find((section) => section.group === "Stock")?.items.map((item) => (
              <article key={item.label} className="rounded-lg border border-slate-100 p-3">
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className="text-xl font-bold text-slate-800">{item.value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <div className="pdf-footer mt-8 p-3 border-t text-sm text-gray-600">
        <p>Agence : Sud Tours | Administrateur : Abdessamad X</p>
        <p>Adresse : Casablanca, Maroc | Téléphone : +212 xxx xxx xxx</p>
        <p>Page imprimée le : {new Date().toLocaleString()}</p>
      </div>
      </div>
    </main>
  );
}
