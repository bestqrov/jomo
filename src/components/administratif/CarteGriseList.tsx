"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchCartes = async () => {
  const { data } = await axios.get("/api/v1/administratif/cartes-grises");
  return data.cartes || [];
};

export default function CarteGriseList({ onAdd, onEdit }) {
  const queryClient = useQueryClient();
  const { data: cartes = [], isLoading, isError } = useQuery({
    queryKey: ["cartes-grises"],
    queryFn: fetchCartes,
    refetchOnWindowFocus: false,
  });

  const deleteCarteGrise = async (id) => {
    if (!window.confirm("Supprimer cette carte grise ?")) return;

    try {
      await axios.delete(`/api/v1/administratif/cartes-grises/${id}`);
      queryClient.invalidateQueries({ queryKey: ["cartes-grises"] });
    } catch (error) {
      console.error("Erreur suppression carte grise", error);
      alert("Erreur lors de la suppression. Veuillez réessayer.");
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
      {isLoading ? (
        <p className="text-gray-500">Chargement des cartes grises...</p>
      ) : isError ? (
        <p className="text-red-500">Impossible de charger les cartes grises.</p>
      ) : cartes.length === 0 ? (
        <p className="text-gray-500">Aucune carte grise disponible.</p>
      ) : (
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
              <tr key={c._id || c.id} className="border-b last:border-b-0">
                <td className="py-2 px-3">{c.vehicule || c.vehicle}</td>
                <td className="py-2 px-3">{c.numero}</td>
                <td className="py-2 px-3">{new Date(c.dateDelivrance || c.dateDelivrance).toLocaleDateString()}</td>
                <td className="py-2 px-3 flex gap-2">
                  <button className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs font-semibold" onClick={() => onEdit ? onEdit(c) : alert('Mode édition (placeholder)')}>Modifier</button>
                  <button className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-semibold" onClick={() => deleteCarteGrise(c._id || c.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
