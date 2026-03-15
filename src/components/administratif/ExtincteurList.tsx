"use client";
import { useState } from "react";

const initialExtincteurs = [
  { id: 1, numero: "EXT-001", vehicule: "ABC-123", date: "2026-01-01" },
  { id: 2, numero: "EXT-002", vehicule: "XYZ-789", date: "2026-02-01" },
];

export default function ExtincteurList({ onAdd }) {
  const [extincteurs, setExtincteurs] = useState(initialExtincteurs);
  const handleDelete = (id) => {
    if (window.confirm("Supprimer cet extincteur ?")) {
      setExtincteurs((prev) => prev.filter((e) => e.id !== id));
    }
  };
  const handleEdit = (id) => {
    alert("Mode édition (mock): implémentez la logique d'édition ici.");
  };
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-red-300 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-red-900">Liste des extincteurs</h3>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-semibold shadow" onClick={onAdd}>+ Ajouter un extincteur</button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-red-100 text-red-900">
            <th className="py-2 px-3 text-left">Numéro</th>
            <th className="py-2 px-3 text-left">Véhicule</th>
            <th className="py-2 px-3 text-left">Date</th>
            <th className="py-2 px-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {extincteurs.map((e) => (
            <tr key={e.id} className="border-b last:border-b-0">
              <td className="py-2 px-3">{e.numero}</td>
              <td className="py-2 px-3">{e.vehicule}</td>
              <td className="py-2 px-3">{e.date}</td>
              <td className="py-2 px-3 flex gap-2">
                <button className="px-2 py-1 bg-red-100 text-red-900 rounded hover:bg-red-200 text-xs font-semibold" onClick={() => handleEdit(e.id)}>Modifier</button>
                <button className="px-2 py-1 bg-red-200 text-red-700 rounded hover:bg-red-300 text-xs font-semibold" onClick={() => handleDelete(e.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
