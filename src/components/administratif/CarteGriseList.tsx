"use client";
import { useState } from "react";

const initialCartes = [
  { id: 1, vehicle: "ABC-123", numero: "CG-001", dateDelivrance: "2026-01-01" },
  { id: 2, vehicle: "XYZ-789", numero: "CG-002", dateDelivrance: "2026-02-01" },
];

export default function CarteGriseList({ onAdd }) {
  const [cartes, setCartes] = useState(initialCartes);
  const handleDelete = (id) => {
    if (window.confirm("Supprimer cette carte grise ?")) {
      setCartes((prev) => prev.filter((c) => c.id !== id));
    }
  };
  const handleEdit = (id) => {
    alert("Mode édition (mock): implémentez la logique d'édition ici.");
  };
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-blue-200 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-blue-700">Liste des cartes grises</h3>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-semibold shadow" onClick={onAdd}>+ Ajouter une carte grise</button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-blue-100 text-blue-800">
            <th className="py-2 px-3 text-left">Véhicule</th>
            <th className="py-2 px-3 text-left">Numéro</th>
            <th className="py-2 px-3 text-left">Date délivrance</th>
            <th className="py-2 px-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartes.map((c) => (
            <tr key={c.id} className="border-b last:border-b-0">
              <td className="py-2 px-3">{c.vehicle}</td>
              <td className="py-2 px-3">{c.numero}</td>
              <td className="py-2 px-3">{c.dateDelivrance}</td>
              <td className="py-2 px-3 flex gap-2">
                <button className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs font-semibold" onClick={() => handleEdit(c.id)}>Modifier</button>
                <button className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-semibold" onClick={() => handleDelete(c.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
