"use client";
import { useState } from "react";

const initialCarnets = [
  { id: 1, numero: "CM-001", vehicule: "ABC-123", date: "2026-01-01" },
  { id: 2, numero: "CM-002", vehicule: "XYZ-789", date: "2026-02-01" },
];

export default function CarnetMetrologiqueList({ onAdd }) {
  const [carnets, setCarnets] = useState(initialCarnets);
  const handleDelete = (id) => {
    if (window.confirm("Supprimer ce carnet ?")) {
      setCarnets((prev) => prev.filter((c) => c.id !== id));
    }
  };
  const handleEdit = (id) => {
    alert("Mode édition (mock): implémentez la logique d'édition ici.");
  };
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-purple-300 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-purple-900">Liste des carnets métrologiques</h3>
        <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 font-semibold shadow" onClick={onAdd}>+ Ajouter un carnet</button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-purple-100 text-purple-900">
            <th className="py-2 px-3 text-left">Numéro</th>
            <th className="py-2 px-3 text-left">Véhicule</th>
            <th className="py-2 px-3 text-left">Date</th>
            <th className="py-2 px-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {carnets.map((c) => (
            <tr key={c.id} className="border-b last:border-b-0">
              <td className="py-2 px-3">{c.numero}</td>
              <td className="py-2 px-3">{c.vehicule}</td>
              <td className="py-2 px-3">{c.date}</td>
              <td className="py-2 px-3 flex gap-2">
                <button className="px-2 py-1 bg-purple-100 text-purple-900 rounded hover:bg-purple-200 text-xs font-semibold" onClick={() => handleEdit(c.id)}>Modifier</button>
                <button className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-semibold" onClick={() => handleDelete(c.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
