"use client";

import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type VignetteRecord = {
  _id: string;
  vehicule: string;
  numero: string;
  dateEmission: string;
  dateExpiration: string;
  montant: number;
  fournisseur?: string;
  etat?: string;
};

type VignetteListProps = {
  onAdd?: () => void;
};

const fetchVignettes = async () => {
  const { data } = await axios.get("/api/v1/administratif/vignettes");
  return data.vignettes || [];
};

export default function VignetteList({ onAdd }: VignetteListProps) {
  const queryClient = useQueryClient();
  const { data: vignettes = [], isLoading, isError } = useQuery<VignetteRecord[]>({
    queryKey: ["vignettes"],
    queryFn: fetchVignettes,
    refetchOnWindowFocus: false,
  });
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    if (editId) {
      // Placeholder for edit state behavior.
      setEditId(null);
    }
  }, [editId]);

  const deleteVignette = async (id: string) => {
    if (!window.confirm("Supprimer cette vignette ?")) return;

    try {
      await axios.delete(`/api/v1/administratif/vignettes/${id}`);
      queryClient.invalidateQueries({ queryKey: ["vignettes"] });
    } catch (error) {
      console.error("Erreur de suppression de la vignette", error);
      alert("Erreur lors de la suppression de la vignette. Veuillez réessayer.");
    }
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
      {isLoading ? (
        <p className="text-gray-500">Chargement des vignettes...</p>
      ) : isError ? (
        <p className="text-red-500">Impossible de charger les vignettes. Veuillez réessayer.</p>
      ) : vignettes.length === 0 ? (
        <p className="text-gray-500">Aucune vignette disponible.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-yellow-100 text-yellow-800">
                <th className="py-2 px-3 text-left">Véhicule</th>
                <th className="py-2 px-3 text-left">Numéro</th>
                <th className="py-2 px-3 text-left">Début</th>
                <th className="py-2 px-3 text-left">Fin</th>
                <th className="py-2 px-3 text-left">Montant</th>
                <th className="py-2 px-3 text-left">État</th>
                <th className="py-2 px-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vignettes.map((v) => (
                <tr key={v._id} className="border-b last:border-b-0">
                  <td className="py-2 px-3">{v.vehicule}</td>
                  <td className="py-2 px-3">{v.numero}</td>
                  <td className="py-2 px-3">{new Date(v.dateEmission).toLocaleDateString()}</td>
                  <td className="py-2 px-3">{new Date(v.dateExpiration).toLocaleDateString()}</td>
                  <td className="py-2 px-3">{v.montant} DH</td>
                  <td className="py-2 px-3">{v.etat || "-"}</td>
                  <td className="py-2 px-3 flex gap-2">
                    <button
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs font-semibold"
                      onClick={() => {
                        setEditId(v._id);
                        alert("Mode édition (à implémenter)");
                      }}
                    >
                      Modifier
                    </button>
                    <button
                      className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs font-semibold"
                      onClick={() => deleteVignette(v._id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
