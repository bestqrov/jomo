"use client";
import { useState } from "react";

const initialPermis = [
  { id: 1, numero: "PC-001", titulaire: "John Doe", date: "2026-01-01" },
  { id: 2, numero: "PC-002", titulaire: "Jane Smith", date: "2026-02-01" },
];

export default function PermisCirculationList({ onAdd }) {
  const [permis, setPermis] = useState(initialPermis);
  const handleDelete = (id) => {
    if (window.confirm("Supprimer ce permis ?")) {
      setPermis((prev) => prev.filter((p) => p.id !== id));
    }
  };
  const handleEdit = (id) => {
    alert("Mode édition (mock): implémentez la logique d'édition ici.");
  };
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-orange-200 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-orange-700">Liste des permis de circulation</h3>
        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 font-semibold shadow" onClick={onAdd}>+ Ajouter un permis</button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-orange-100 text-orange-800">
            <th className="py-2 px-3 text-left">Numéro</th>
            <th className="py-2 px-3 text-left">Titulaire</th>
            <th className="py-2 px-3 text-left">Date</th>
            <th className="py-2 px-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {permis.map((p) => (
            <tr key={p.id} className="border-b last:border-b-0">
              <td className="py-2 px-3">{p.numero}</td>
              <td className="py-2 px-3">{p.titulaire}</td>
              <td className="py-2 px-3">{p.date}</td>
              <td className="py-2 px-3 flex gap-2">
                <button className="px-2 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 text-xs font-semibold" onClick={() => handleEdit(p.id)}>Modifier</button>
                <button className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-semibold" onClick={() => handleDelete(p.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
