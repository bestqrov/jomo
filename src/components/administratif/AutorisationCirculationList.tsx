"use client";
import { useState } from "react";

const initialAutorisations = [
  { id: 1, numero: "AC-001", vehicule: "ABC-123", date: "2026-01-01" },
  { id: 2, numero: "AC-002", vehicule: "XYZ-789", date: "2026-02-01" },
];

export default function AutorisationCirculationList({ onAdd }) {
  const [autorisations, setAutorisations] = useState(initialAutorisations);
  const handleDelete = (id) => {
    if (window.confirm("Supprimer cette autorisation ?")) {
      setAutorisations((prev) => prev.filter((a) => a.id !== id));
    }
  };
  const handleEdit = (id) => {
    alert("Mode édition (mock): implémentez la logique d'édition ici.");
  };
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-orange-300 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-orange-800">Liste des autorisations de circulation</h3>
        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 font-semibold shadow" onClick={onAdd}>+ Ajouter une autorisation</button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-orange-100 text-orange-800">
            <th className="py-2 px-3 text-left">Numéro</th>
            <th className="py-2 px-3 text-left">Véhicule</th>
            <th className="py-2 px-3 text-left">Date</th>
            <th className="py-2 px-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {autorisations.map((a) => (
            <tr key={a.id} className="border-b last:border-b-0">
              <td className="py-2 px-3">{a.numero}</td>
              <td className="py-2 px-3">{a.vehicule}</td>
              <td className="py-2 px-3">{a.date}</td>
              <td className="py-2 px-3 flex gap-2">
                <button className="px-2 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 text-xs font-semibold" onClick={() => handleEdit(a.id)}>Modifier</button>
                <button className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-semibold" onClick={() => handleDelete(a.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
