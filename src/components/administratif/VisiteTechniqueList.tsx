"use client";
import { useState } from "react";

const initialVisites = [
  { id: 1, vehicle: "ABC-123", date: "2026-01-01", resultat: "Valide" },
  { id: 2, vehicle: "XYZ-789", date: "2026-02-01", resultat: "A revoir" },
];

export default function VisiteTechniqueList({ onAdd }) {
  const [visites, setVisites] = useState(initialVisites);
  const handleDelete = (id) => {
    if (window.confirm("Supprimer cette visite technique ?")) {
      setVisites((prev) => prev.filter((v) => v.id !== id));
    }
  };
  const handleEdit = (id) => {
    alert("Mode édition (mock): implémentez la logique d'édition ici.");
  };
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-purple-200 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-purple-700">Liste des visites techniques</h3>
        <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 font-semibold shadow" onClick={onAdd}>+ Ajouter une visite</button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-purple-100 text-purple-800">
            <th className="py-2 px-3 text-left">Véhicule</th>
            <th className="py-2 px-3 text-left">Date</th>
            <th className="py-2 px-3 text-left">Résultat</th>
            <th className="py-2 px-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {visites.map((v) => (
            <tr key={v.id} className="border-b last:border-b-0">
              <td className="py-2 px-3">{v.vehicle}</td>
              <td className="py-2 px-3">{v.date}</td>
              <td className="py-2 px-3">{v.resultat}</td>
              <td className="py-2 px-3 flex gap-2">
                <button className="px-2 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 text-xs font-semibold" onClick={() => handleEdit(v.id)}>Modifier</button>
                <button className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-semibold" onClick={() => handleDelete(v.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
