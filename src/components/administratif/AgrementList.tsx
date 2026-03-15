"use client";
import { useState } from "react";

const initialAgrements = [
  { id: 1, organisme: "Org A", numero: "AGR-001", date: "2026-01-01" },
  { id: 2, organisme: "Org B", numero: "AGR-002", date: "2026-02-01" },
];

export default function AgrementList({ onAdd }) {
  const [agrements, setAgrements] = useState(initialAgrements);
  const handleDelete = (id) => {
    if (window.confirm("Supprimer cet agrément ?")) {
      setAgrements((prev) => prev.filter((a) => a.id !== id));
    }
  };
  const handleEdit = (id) => {
    alert("Mode édition (mock): implémentez la logique d'édition ici.");
  };
  return (
    <div className="bg-white rounded-lg shadow p-6 border border-pink-200 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-pink-700">Liste des agréments</h3>
        <button className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 font-semibold shadow" onClick={onAdd}>+ Ajouter un agrément</button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-pink-100 text-pink-800">
            <th className="py-2 px-3 text-left">Organisme</th>
            <th className="py-2 px-3 text-left">Numéro</th>
            <th className="py-2 px-3 text-left">Date</th>
            <th className="py-2 px-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agrements.map((a) => (
            <tr key={a.id} className="border-b last:border-b-0">
              <td className="py-2 px-3">{a.organisme}</td>
              <td className="py-2 px-3">{a.numero}</td>
              <td className="py-2 px-3">{a.date}</td>
              <td className="py-2 px-3 flex gap-2">
                <button className="px-2 py-1 bg-pink-100 text-pink-700 rounded hover:bg-pink-200 text-xs font-semibold" onClick={() => handleEdit(a.id)}>Modifier</button>
                <button className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-semibold" onClick={() => handleDelete(a.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
