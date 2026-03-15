"use client";
import { useState } from "react";

const initialIndexeHoraire = [
  { id: 1, vehicule: "Peugeot 208", date: "2026-01-01", h: 120 },
  { id: 2, vehicule: "Renault Clio", date: "2026-02-01", h: 150 },
];

export default function IndexeHoraireList({ onAdd }) {
  const [indexeHoraire, setIndexeHoraire] = useState(initialIndexeHoraire);
  const handleDelete = (id) => {
    if (window.confirm("Supprimer cet indexe horaire ?")) {
      setIndexeHoraire((prev) => prev.filter((i) => i.id !== id));
    }
  };
  const handleEdit = (id) => {
    alert("Mode édition (mock): implémentez la logique d'édition ici.");
  };
  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-purple-100 rounded-3xl shadow-2xl p-8 border-2 border-purple-300 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-extrabold text-purple-700 tracking-wide">Indexe horaire</h3>
        <button className="px-6 py-2 bg-purple-600 text-white rounded-lg font-bold shadow hover:bg-purple-700 transition" onClick={onAdd}>+ Ajouter</button>
      </div>
      <table className="w-full text-base rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-purple-200 text-purple-800">
            <th className="py-3 px-4 text-left">Véhicule</th>
            <th className="py-3 px-4 text-left">Date indexe horaire</th>
            <th className="py-3 px-4 text-left">H</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {indexeHoraire.map((i) => (
            <tr key={i.id} className="border-b last:border-b-0 hover:bg-purple-50">
              <td className="py-3 px-4 font-semibold text-purple-900">{i.vehicule}</td>
              <td className="py-3 px-4">{i.date}</td>
              <td className="py-3 px-4">{i.h}</td>
              <td className="py-3 px-4 flex gap-2">
                <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 text-xs font-semibold" onClick={() => handleEdit(i.id)}>Modifier</button>
                <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-semibold" onClick={() => handleDelete(i.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
