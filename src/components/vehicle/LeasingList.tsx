"use client";
import { useState } from "react";

const initialLeasing = [
  {
    id: 1,
    numero: "CL-2026-001",
    dateContrat: "2026-01-10",
    concessionnaire: "Renault Maroc",
    societeLeasing: "Wafasalaf",
    montantContratHT: 200000,
    montantContratTTC: 220000,
    dateFinContrat: "2029-01-10",
  },
  {
    id: 2,
    numero: "CL-2026-002",
    dateContrat: "2026-02-15",
    concessionnaire: "Peugeot Maroc",
    societeLeasing: "BMCI Leasing",
    montantContratHT: 180000,
    montantContratTTC: 198000,
    dateFinContrat: "2028-02-15",
  },
];

export default function LeasingList({ onAdd }) {
  const [leasing, setLeasing] = useState(initialLeasing);
  const handleDelete = (id) => {
    if (window.confirm("Supprimer ce contrat de leasing ?")) {
      setLeasing((prev) => prev.filter((l) => l.id !== id));
    }
  };
  const handleEdit = (id) => {
    alert("Mode édition (mock): implémentez la logique d'édition ici.");
  };
  // Analytics
  const total = leasing.length;
  const montantTotalHT = leasing.reduce((sum, l) => sum + (Number(l.montantContratHT) || 0), 0);
  const montantTotalTTC = leasing.reduce((sum, l) => sum + (Number(l.montantContratTTC) || 0), 0);
  // Group contracts in rows of 3
  const rows = [];
  for (let i = 0; i < leasing.length; i += 3) {
    rows.push(leasing.slice(i, i + 3));
  }
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 border border-blue-200 mb-6">
      {/* Analytics Card */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
        <div className="flex gap-4 flex-wrap">
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 flex flex-col items-center min-w-[120px]">
            <span className="text-xs text-blue-600 font-semibold">Total contrats</span>
            <span className="text-lg font-bold text-blue-800">{total}</span>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 flex flex-col items-center min-w-[120px]">
            <span className="text-xs text-blue-600 font-semibold">Montant HT</span>
            <span className="text-lg font-bold text-blue-800">{montantTotalHT.toLocaleString()} DH</span>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 flex flex-col items-center min-w-[120px]">
            <span className="text-xs text-blue-600 font-semibold">Montant TTC</span>
            <span className="text-lg font-bold text-blue-800">{montantTotalTTC.toLocaleString()} DH</span>
          </div>
        </div>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold shadow hover:bg-blue-700 transition text-base" onClick={onAdd}>+ Nouveau contrat</button>
      </div>
      <div className="space-y-4">
        {rows.map((row, idx) => (
          <div key={idx} className="flex flex-wrap gap-4">
            {row.map((l) => (
              <div key={l.id} className="flex-1 min-w-[260px] max-w-[340px] bg-gradient-to-br from-blue-50 via-white to-blue-100 border border-blue-100 rounded-xl shadow p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-800 font-bold text-base">{l.numero}</span>
                    <span className="text-xs text-blue-500 font-semibold">{l.dateContrat}</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-1">Concessionnaire: <span className="text-gray-700 font-medium">{l.concessionnaire}</span></div>
                  <div className="text-xs text-gray-500 mb-1">Leasing: <span className="text-gray-700 font-medium">{l.societeLeasing}</span></div>
                  <div className="flex gap-2 text-xs mb-1">
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">HT: {l.montantContratHT} DH</span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">TTC: {l.montantContratTTC} DH</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-2">Fin: <span className="text-gray-700 font-medium">{l.dateFinContrat}</span></div>
                </div>
                <div className="flex gap-2 mt-2 self-end">
                  <button className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs font-semibold" onClick={() => handleEdit(l.id)}>✏️</button>
                  <button className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-semibold" onClick={() => handleDelete(l.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
