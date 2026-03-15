"use client";
import React from "react";

import { useState } from "react";

const initialVignettes = [
  { id: 1, vehicle: "ABC-123", dateDebut: "2026-01-01", dateFin: "2026-12-31", montantTotal: 500 },
  { id: 2, vehicle: "XYZ-789", dateDebut: "2026-02-01", dateFin: "2027-01-31", montantTotal: 600 },
];

export default function VignetteList({ onAdd }) {
  const [vignettes, setVignettes] = useState(initialVignettes);
  const [editId, setEditId] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Supprimer cette vignette ?")) {
      setVignettes((prev) => prev.filter((v) => v.id !== id));
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
    alert("Mode édition (mock): implémentez la logique d'édition ici.");
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-yellow-200 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-yellow-700">Liste des vignettes</h3>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 font-semibold shadow"
          onClick={onAdd}
        >
          + Ajouter une vignette
        </button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-yellow-100 text-yellow-800">
            <th className="py-2 px-3 text-left">Véhicule</th>
            <th className="py-2 px-3 text-left">Date début</th>
            <th className="py-2 px-3 text-left">Date fin</th>
            <th className="py-2 px-3 text-left">Montant total</th>
            <th className="py-2 px-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vignettes.map((v) => (
            <tr key={v.id} className="border-b last:border-b-0">
              <td className="py-2 px-3">{v.vehicle}</td>
              <td className="py-2 px-3">{v.dateDebut}</td>
              <td className="py-2 px-3">{v.dateFin}</td>
              <td className="py-2 px-3">{v.montantTotal} DH</td>
              <td className="py-2 px-3 flex gap-2">
                <button
                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs font-semibold"
                  onClick={() => handleEdit(v.id)}
                >
                  Modifier
                </button>
                <button
                  className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-semibold"
                  onClick={() => handleDelete(v.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
