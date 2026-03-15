"use client";
import { useState } from "react";

const initialVehicles = [
  { id: 1, designation: "Peugeot 208", immatricule: "ABC-123", typeAcquisition: "achat", couleur: "Bleu" },
  { id: 2, designation: "Renault Clio", immatricule: "XYZ-789", typeAcquisition: "leasing", couleur: "Rouge" },
];

export default function VehicleList({ onAdd }) {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const handleDelete = (id) => {
    if (window.confirm("Supprimer ce véhicule ?")) {
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    }
  };
  const handleEdit = (id) => {
    alert("Mode édition (mock): implémentez la logique d'édition ici.");
  };
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-3xl shadow-2xl p-8 border-2 border-blue-300 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-extrabold text-blue-700 tracking-wide">Véhicules</h3>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold shadow hover:bg-blue-700 transition" onClick={onAdd}>+ Ajouter un véhicule</button>
      </div>
      <table className="w-full text-base rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-200 text-blue-800">
            <th className="py-3 px-4 text-left">Désignation</th>
            <th className="py-3 px-4 text-left">Immatricule</th>
            <th className="py-3 px-4 text-left">Type d'acquisition</th>
            <th className="py-3 px-4 text-left">Couleur</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr key={v.id} className="border-b last:border-b-0 hover:bg-blue-50">
              <td className="py-3 px-4 font-semibold text-blue-900">{v.designation}</td>
              <td className="py-3 px-4">{v.immatricule}</td>
              <td className="py-3 px-4 capitalize">{v.typeAcquisition}</td>
              <td className="py-3 px-4">{v.couleur}</td>
              <td className="py-3 px-4 flex gap-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs font-semibold" onClick={() => handleEdit(v.id)}>Modifier</button>
                <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-semibold" onClick={() => handleDelete(v.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
