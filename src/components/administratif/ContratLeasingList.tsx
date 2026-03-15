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

export default function ContratLeasingList({ onAdd }) {
  const [leasing, setLeasing] = useState(initialLeasing);
  const handleDelete = (id) => {
    if (window.confirm("Supprimer ce contrat de leasing ?")) {
      setLeasing((prev) => prev.filter((l) => l.id !== id));
    }
  };
  const handleEdit = (id) => {
    alert("Mode édition (mock): implémentez la logique d'édition ici.");
  };
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-3xl shadow-2xl p-8 border-2 border-blue-300 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-extrabold text-blue-700 tracking-wide">Contrats de leasing</h3>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold shadow hover:bg-blue-700 transition" onClick={onAdd}>+ Ajouter</button>
      </div>
      <table className="w-full text-base rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-200 text-blue-800">
            <th className="py-3 px-4 text-left">Numéro</th>
            <th className="py-3 px-4 text-left">Date contrat</th>
            <th className="py-3 px-4 text-left">Concessionnaire</th>
            <th className="py-3 px-4 text-left">Société de leasing</th>
            <th className="py-3 px-4 text-left">Montant HT</th>
            <th className="py-3 px-4 text-left">Montant TTC</th>
            <th className="py-3 px-4 text-left">Date fin</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leasing.map((l) => (
            <tr key={l.id} className="border-b last:border-b-0 hover:bg-blue-50">
              <td className="py-3 px-4 font-semibold text-blue-900">{l.numero}</td>
              <td className="py-3 px-4">{l.dateContrat}</td>
              <td className="py-3 px-4">{l.concessionnaire}</td>
              <td className="py-3 px-4">{l.societeLeasing}</td>
              <td className="py-3 px-4">{l.montantContratHT} DH</td>
              <td className="py-3 px-4">{l.montantContratTTC} DH</td>
              <td className="py-3 px-4">{l.dateFinContrat}</td>
              <td className="py-3 px-4 flex gap-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs font-semibold" onClick={() => handleEdit(l.id)}>Modifier</button>
                <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-semibold" onClick={() => handleDelete(l.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
