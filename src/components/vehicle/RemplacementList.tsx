"use client";
import { useState } from "react";

const mockRemplacements = [
  {
    id: 1,
    vehicule: "Peugeot 208",
    vehiculeRemplacement: "Renault Clio",
    dateDemande: "2024-01-01",
    contrat: "CTR-001",
    sinistre: "S-001",
    dateDebut: "2024-01-02",
    dateFinPrevue: "2024-01-10",
    dateRestitution: "2024-01-09",
    marqueType: "Renault Clio 2023",
    modeFormule: "Standard",
    kilometrageDepart: 10000,
    kilometrageRetour: 10200,
    distance: 200,
    lieuDepart: "Casablanca",
    lieuArrivee: "Rabat",
    carburantDebut: "1/2",
    carburantFin: "1/4",
    motif: "Accident",
  },
];

export default function RemplacementList({ onAdd, onEdit }) {
  const [remplacements, setRemplacements] = useState(mockRemplacements);

  // Analytics
  const totalRemplacements = remplacements.length;
  const totalKm = remplacements.reduce((sum, r) => sum + (r.kilometrageRetour - r.kilometrageDepart), 0);

  const handleDelete = (id) => {
    setRemplacements((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 bg-yellow-50 rounded-xl p-4 border border-yellow-200 shadow text-center">
          <div className="text-xs text-yellow-700 font-semibold">Remplacements</div>
          <div className="text-2xl font-bold text-yellow-900">{totalRemplacements}</div>
        </div>
        <div className="flex-1 bg-yellow-50 rounded-xl p-4 border border-yellow-200 shadow text-center">
          <div className="text-xs text-yellow-700 font-semibold">Total Km</div>
          <div className="text-2xl font-bold text-yellow-900">{totalKm} Km</div>
        </div>
        <button
          className="h-12 px-6 bg-yellow-600 text-white rounded-xl font-bold shadow hover:bg-yellow-700 transition text-sm self-center mt-2 md:mt-0"
          onClick={onAdd}
        >
          + Nouveau remplacement
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {remplacements.map((r) => (
          <div key={r.id} className="bg-white rounded-xl shadow p-4 border border-yellow-200 flex flex-col gap-2">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-yellow-700">{r.vehiculeRemplacement}</span>
              <span className="text-xs text-yellow-500">{r.contrat}</span>
            </div>
            <div className="text-xs text-gray-500 mb-1">Véhicule: <span className="text-gray-700">{r.vehicule}</span></div>
            <div className="text-xs text-gray-500">Date demande: <span className="text-gray-700">{r.dateDemande}</span></div>
            <div className="text-xs text-gray-500">Début: <span className="text-gray-700">{r.dateDebut}</span> / Fin prévue: <span className="text-gray-700">{r.dateFinPrevue}</span></div>
            <div className="text-xs text-gray-500">Km: <span className="text-gray-700">{r.kilometrageDepart} → {r.kilometrageRetour}</span></div>
            <div className="text-xs text-gray-500">Motif: <span className="text-gray-700">{r.motif}</span></div>
            <div className="flex gap-2 mt-2">
              <button className="flex-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-bold hover:bg-yellow-200" onClick={() => onEdit?.(r)}>Modifier</button>
              <button className="flex-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold hover:bg-red-200" onClick={() => handleDelete(r.id)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
