"use client";
import { useState } from "react";

const initialKilometrages = [
  { id: 1, vehicule: "Peugeot 208", date: "2026-01-01", kilometres: 12000 },
  { id: 2, vehicule: "Renault Clio", date: "2026-02-01", kilometres: 15000 },
];

export default function KilometrageList({ onAdd }) {
  const [kilometrages, setKilometrages] = useState(initialKilometrages);
  const handleDelete = (id) => {
    if (window.confirm("Supprimer ce relevé de kilométrage ?")) {
      setKilometrages((prev) => prev.filter((k) => k.id !== id));
    }
  };
  const handleEdit = (id) => {
    alert("Mode édition (mock): implémentez la logique d'édition ici.");
  };
  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-green-100 rounded-3xl shadow-2xl p-8 border-2 border-green-300 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-extrabold text-green-700 tracking-wide">Kilométrages</h3>
        <button className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold shadow hover:bg-green-700 transition" onClick={onAdd}>+ Ajouter</button>
      </div>
      <table className="w-full text-base rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-green-200 text-green-800">
            <th className="py-3 px-4 text-left">Véhicule</th>
            <th className="py-3 px-4 text-left">Date kilométrage</th>
            <th className="py-3 px-4 text-left">Kilomètres</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {kilometrages.map((k) => (
            <tr key={k.id} className="border-b last:border-b-0 hover:bg-green-50">
              <td className="py-3 px-4 font-semibold text-green-900">{k.vehicule}</td>
              <td className="py-3 px-4">{k.date}</td>
              <td className="py-3 px-4">{k.kilometres}</td>
              <td className="py-3 px-4 flex gap-2">
                <button className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-xs font-semibold" onClick={() => handleEdit(k.id)}>Modifier</button>
                <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-semibold" onClick={() => handleDelete(k.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
