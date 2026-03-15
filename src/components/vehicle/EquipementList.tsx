"use client";
import { useState } from "react";

const mockEquipements = [
  {
    id: 1,
    code: "EQ-001",
    libelle: "GPS Tracker",
    typeEquipement: "Electronique",
    montantHT: 1200,
    tva: 20,
    montantTTC: 1440,
    fournisseur: "Fournisseur A",
    dateAchat: "2024-01-01",
  },
  {
    id: 2,
    code: "EQ-002",
    libelle: "Extincteur",
    typeEquipement: "Sécurité",
    montantHT: 300,
    tva: 20,
    montantTTC: 360,
    fournisseur: "Fournisseur B",
    dateAchat: "2025-02-01",
  },
];

export default function EquipementList({ onAdd, onEdit }) {
  const [equipements, setEquipements] = useState(mockEquipements);

  // Analytics
  const totalEquipements = equipements.length;
  const totalTTC = equipements.reduce((sum, e) => sum + (e.montantTTC || 0), 0);

  const handleDelete = (id) => {
    setEquipements((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 bg-purple-50 rounded-xl p-4 border border-purple-200 shadow text-center">
          <div className="text-xs text-purple-700 font-semibold">Equipements</div>
          <div className="text-2xl font-bold text-purple-900">{totalEquipements}</div>
        </div>
        <div className="flex-1 bg-purple-50 rounded-xl p-4 border border-purple-200 shadow text-center">
          <div className="text-xs text-purple-700 font-semibold">Total TTC</div>
          <div className="text-2xl font-bold text-purple-900">{totalTTC} DH</div>
        </div>
        <button
          className="h-12 px-6 bg-purple-600 text-white rounded-xl font-bold shadow hover:bg-purple-700 transition text-sm self-center mt-2 md:mt-0"
          onClick={onAdd}
        >
          + Nouvel équipement
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {equipements.map((eq) => (
          <div key={eq.id} className="bg-white rounded-xl shadow p-4 border border-purple-200 flex flex-col gap-2">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-purple-700">{eq.libelle}</span>
              <span className="text-xs text-purple-500">{eq.code}</span>
            </div>
            <div className="text-xs text-gray-500 mb-1">Type: <span className="text-gray-700">{eq.typeEquipement}</span></div>
            <div className="text-xs text-gray-500">Montant TTC: <span className="text-gray-700">{eq.montantTTC} DH</span></div>
            <div className="text-xs text-gray-500">Fournisseur: <span className="text-gray-700">{eq.fournisseur}</span></div>
            <div className="text-xs text-gray-500">Date d'achat: <span className="text-gray-700">{eq.dateAchat}</span></div>
            <div className="flex gap-2 mt-2">
              <button className="flex-1 px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-bold hover:bg-purple-200" onClick={() => onEdit?.(eq)}>Modifier</button>
              <button className="flex-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold hover:bg-red-200" onClick={() => handleDelete(eq.id)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
