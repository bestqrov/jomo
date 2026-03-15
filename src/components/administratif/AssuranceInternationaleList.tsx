"use client";
import { useState } from "react";

const initialAssurances = [
  { id: 1, compagnie: "AXA Intl", police: "INT-001", date: "2026-01-01" },
  { id: 2, compagnie: "Wafa Intl", police: "INT-002", date: "2026-02-01" },
];

export default function AssuranceInternationaleList({ onAdd }) {
  const [assurances, setAssurances] = useState(initialAssurances);
  const handleDelete = (id) => {
    if (window.confirm("Supprimer cette assurance internationale ?")) {
      setAssurances((prev) => prev.filter((a) => a.id !== id));
    }
  };
  const handleEdit = (id) => {
    alert("Mode édition (mock): implémentez la logique d'édition ici.");
  };
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-blue-400 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-blue-900">Liste des assurances internationales</h3>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold shadow" onClick={onAdd}>+ Ajouter une assurance</button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-blue-100 text-blue-900">
            <th className="py-2 px-3 text-left">Compagnie</th>
            <th className="py-2 px-3 text-left">Police</th>
            <th className="py-2 px-3 text-left">Date</th>
            <th className="py-2 px-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assurances.map((a) => (
            <tr key={a.id} className="border-b last:border-b-0">
              <td className="py-2 px-3">{a.compagnie}</td>
              <td className="py-2 px-3">{a.police}</td>
              <td className="py-2 px-3">{a.date}</td>
              <td className="py-2 px-3 flex gap-2">
                <button className="px-2 py-1 bg-blue-100 text-blue-900 rounded hover:bg-blue-200 text-xs font-semibold" onClick={() => handleEdit(a.id)}>Modifier</button>
                <button className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-semibold" onClick={() => handleDelete(a.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
