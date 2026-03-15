"use client";
import { useState } from "react";

const initialSinistres = [
  { id: 1, numero: "SIN-001", vehicule: "ABC-123", date: "2026-01-01" },
  { id: 2, numero: "SIN-002", vehicule: "XYZ-789", date: "2026-02-01" },
];

export default function SinistreList({ onAdd }) {
  const [sinistres, setSinistres] = useState(initialSinistres);
  const handleDelete = (id) => {
    if (window.confirm("Supprimer ce sinistre ?")) {
      setSinistres((prev) => prev.filter((s) => s.id !== id));
    }
  };
  const handleEdit = (id) => {
    alert("Mode édition (mock): implémentez la logique d'édition ici.");
  };
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-400 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">Liste des sinistres</h3>
        <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 font-semibold shadow" onClick={onAdd}>+ Ajouter un sinistre</button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-900">
            <th className="py-2 px-3 text-left">Numéro</th>
            <th className="py-2 px-3 text-left">Véhicule</th>
            <th className="py-2 px-3 text-left">Date</th>
            <th className="py-2 px-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sinistres.map((s) => (
            <tr key={s.id} className="border-b last:border-b-0">
              <td className="py-2 px-3">{s.numero}</td>
              <td className="py-2 px-3">{s.vehicule}</td>
              <td className="py-2 px-3">{s.date}</td>
              <td className="py-2 px-3 flex gap-2">
                <button className="px-2 py-1 bg-gray-100 text-gray-900 rounded hover:bg-gray-200 text-xs font-semibold" onClick={() => handleEdit(s.id)}>Modifier</button>
                <button className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-semibold" onClick={() => handleDelete(s.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
