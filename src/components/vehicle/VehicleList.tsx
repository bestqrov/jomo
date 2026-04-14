"use client";

import { useVehicles } from '@/hooks/useVehicles';

export default function VehicleList({ onAdd }) {
  const { data, isLoading, error } = useVehicles();
  const vehicles = data?.vehicles || [];
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-3xl shadow-2xl p-8 border-2 border-blue-300 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-extrabold text-blue-700 tracking-wide">Véhicules</h3>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold shadow hover:bg-blue-700 transition" onClick={onAdd}>+ Ajouter un véhicule</button>
      </div>
      {isLoading && <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">Chargement...</div>}
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">Erreur de chargement</div>}
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
              <td className="py-3 px-4 font-semibold text-blue-900">{v.designation || v.name}</td>
              <td className="py-3 px-4">{v.immatricule || v.plateNumber}</td>
              <td className="py-3 px-4 capitalize">{v.typeAcquisition}</td>
              <td className="py-3 px-4">{v.couleur}</td>
              <td className="py-3 px-4 flex gap-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs font-semibold" onClick={() => alert('Édition non implémentée')}>Modifier</button>
                <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-semibold" onClick={() => alert('Suppression non implémentée')}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
