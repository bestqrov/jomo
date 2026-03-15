"use client";
import { useState } from "react";

const mockAchats = [
  {
    id: 1,
    vehicule: "Peugeot 208",
    fournisseur: "Fournisseur A",
    dateAchat: "2024-01-01",
    numeroContrat: "ACH-001",
    garantie: "2 ans",
    montantHT: 120000,
    tva: 20,
    montantTTC: 144000,
  },
  {
    id: 2,
    vehicule: "Renault Clio",
    fournisseur: "Fournisseur B",
    dateAchat: "2025-02-01",
    numeroContrat: "ACH-002",
    garantie: "1 an",
    montantHT: 95000,
    tva: 20,
    montantTTC: 114000,
  },
];

export default function AchatList({ onAdd, onEdit }) {
  const [achats, setAchats] = useState(mockAchats);

  // Analytics
  const totalAchats = achats.length;
  const totalTTC = achats.reduce((sum, a) => sum + (a.montantTTC || 0), 0);

  const handleDelete = (id) => {
    setAchats((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 bg-green-50 rounded-xl p-4 border border-green-200 shadow text-center">
          <div className="text-xs text-green-700 font-semibold">Achats</div>
          <div className="text-2xl font-bold text-green-900">{totalAchats}</div>
        </div>
        <div className="flex-1 bg-green-50 rounded-xl p-4 border border-green-200 shadow text-center">
          <div className="text-xs text-green-700 font-semibold">Total TTC</div>
          <div className="text-2xl font-bold text-green-900">{totalTTC} DH</div>
        </div>
        <button
          className="h-12 px-6 bg-green-600 text-white rounded-xl font-bold shadow hover:bg-green-700 transition text-sm self-center mt-2 md:mt-0"
          onClick={onAdd}
        >
          + Nouvel achat
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {achats.map((achat) => (
          <div key={achat.id} className="bg-white rounded-xl shadow p-4 border border-green-200 flex flex-col gap-2">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-green-700">{achat.vehicule}</span>
              <span className="text-xs text-green-500">{achat.numeroContrat}</span>
            </div>
            <div className="text-xs text-gray-500 mb-1">Fournisseur: <span className="text-gray-700">{achat.fournisseur}</span></div>
            <div className="text-xs text-gray-500">Date d'achat: <span className="text-gray-700">{achat.dateAchat}</span></div>
            <div className="text-xs text-gray-500">Garantie: <span className="text-gray-700">{achat.garantie}</span></div>
            <div className="text-xs text-gray-500">Montant TTC: <span className="text-gray-700">{achat.montantTTC} DH</span></div>
            <div className="flex gap-2 mt-2">
              <button className="flex-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold hover:bg-green-200" onClick={() => onEdit?.(achat)}>Modifier</button>
              <button className="flex-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold hover:bg-red-200" onClick={() => handleDelete(achat.id)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
