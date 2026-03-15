"use client";
import { useState } from "react";

const initialTaxes = [
  { id: 1, type: "Taxe A", montant: 100, date: "2026-01-01" },
  { id: 2, type: "Taxe B", montant: 200, date: "2026-02-01" },
];

export default function TaxeList({ onAdd }) {
  const [taxes, setTaxes] = useState(initialTaxes);
  const handleDelete = (id) => {
    if (window.confirm("Supprimer cette taxe ?")) {
      setTaxes((prev) => prev.filter((t) => t.id !== id));
    }
  };
  const handleEdit = (id) => {
    alert("Mode édition (mock): implémentez la logique d'édition ici.");
  };
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-green-200 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-green-700">Liste des taxes</h3>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 font-semibold shadow" onClick={onAdd}>+ Ajouter une taxe</button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-green-100 text-green-800">
            <th className="py-2 px-3 text-left">Type</th>
            <th className="py-2 px-3 text-left">Montant</th>
            <th className="py-2 px-3 text-left">Date</th>
            <th className="py-2 px-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {taxes.map((t) => (
            <tr key={t.id} className="border-b last:border-b-0">
              <td className="py-2 px-3">{t.type}</td>
              <td className="py-2 px-3">{t.montant} DH</td>
              <td className="py-2 px-3">{t.date}</td>
              <td className="py-2 px-3 flex gap-2">
                <button className="px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-xs font-semibold" onClick={() => handleEdit(t.id)}>Modifier</button>
                <button className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-semibold" onClick={() => handleDelete(t.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
