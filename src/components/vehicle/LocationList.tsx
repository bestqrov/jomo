"use client";
import { useState } from "react";

const mockLocations = [
  {
    id: 1,
    vehicule: "Peugeot 208",
    identificationFournisseur: "Fournisseur A",
    numeroContrat: "LOC-001",
    typeContrat: "Longue durée",
    dateDebut: "2024-01-01",
    dateFinPrevue: "2025-01-01",
    loyerMensuelTTC: 3500,
    kilometrageDebut: 10000,
    kilometrageFin: 12000,
    plafondKilometrique: 20000,
  },
  {
    id: 2,
    vehicule: "Renault Clio",
    identificationFournisseur: "Fournisseur B",
    numeroContrat: "LOC-002",
    typeContrat: "Courte durée",
    dateDebut: "2025-02-01",
    dateFinPrevue: "2025-08-01",
    loyerMensuelTTC: 2800,
    kilometrageDebut: 5000,
    kilometrageFin: 7000,
    plafondKilometrique: 10000,
  },
];

export default function LocationList({ onAdd, onEdit }) {
  const [locations, setLocations] = useState(mockLocations);
  const [selected, setSelected] = useState(null);

  // Analytics
  const totalContrats = locations.length;
  const totalTTC = locations.reduce((sum, l) => sum + (l.loyerMensuelTTC || 0), 0);
  const totalKm = locations.reduce((sum, l) => sum + ((l.kilometrageFin || 0) - (l.kilometrageDebut || 0)), 0);

  const handleDelete = (id) => {
    setLocations((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 bg-blue-50 rounded-xl p-4 border border-blue-200 shadow text-center">
          <div className="text-xs text-blue-700 font-semibold">Contrats</div>
          <div className="text-2xl font-bold text-blue-900">{totalContrats}</div>
        </div>
        <div className="flex-1 bg-blue-50 rounded-xl p-4 border border-blue-200 shadow text-center">
          <div className="text-xs text-blue-700 font-semibold">Total TTC</div>
          <div className="text-2xl font-bold text-blue-900">{totalTTC} DH</div>
        </div>
        <div className="flex-1 bg-blue-50 rounded-xl p-4 border border-blue-200 shadow text-center">
          <div className="text-xs text-blue-700 font-semibold">Total Km parcourus</div>
          <div className="text-2xl font-bold text-blue-900">{totalKm} Km</div>
        </div>
        <button
          className="h-12 px-6 bg-blue-600 text-white rounded-xl font-bold shadow hover:bg-blue-700 transition text-sm self-center mt-2 md:mt-0"
          onClick={onAdd}
        >
          + Nouveau contrat
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {locations.map((loc) => (
          <div key={loc.id} className="bg-white rounded-xl shadow p-4 border border-blue-200 flex flex-col gap-2">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-blue-700">{loc.vehicule}</span>
              <span className="text-xs text-blue-500">{loc.numeroContrat}</span>
            </div>
            <div className="text-xs text-gray-500 mb-1">Fournisseur: <span className="text-gray-700">{loc.identificationFournisseur}</span></div>
            <div className="text-xs text-gray-500">Type: <span className="text-gray-700">{loc.typeContrat}</span></div>
            <div className="text-xs text-gray-500">Début: <span className="text-gray-700">{loc.dateDebut}</span></div>
            <div className="text-xs text-gray-500">Fin prévue: <span className="text-gray-700">{loc.dateFinPrevue}</span></div>
            <div className="text-xs text-gray-500">Loyer TTC: <span className="text-gray-700">{loc.loyerMensuelTTC} DH</span></div>
            <div className="text-xs text-gray-500">Km: <span className="text-gray-700">{loc.kilometrageDebut} → {loc.kilometrageFin} / {loc.plafondKilometrique}</span></div>
            <div className="flex gap-2 mt-2">
              <button className="flex-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold hover:bg-blue-200" onClick={() => onEdit?.(loc)}>Modifier</button>
              <button className="flex-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold hover:bg-red-200" onClick={() => handleDelete(loc.id)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
