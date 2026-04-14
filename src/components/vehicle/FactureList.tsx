"use client";

import { useEffect, useState } from "react";
import { useVehicles } from "@/hooks/useVehicles";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type Facture = {
  _id: string;
  designation: string;
  client: string;
  vehicule: any;
  montant?: number;
  date: string;
  statut?: string;
};

const fetchFactures = async () => {
  const { data } = await axios.get("/api/v1/flotte/factures");
  return data.factures;
};

const deleteFacture = async (id: string) => {
  await axios.delete(`/api/v1/flotte/factures/${id}`);
};

const statusColors = {
  Payée: "bg-green-100 text-green-700",
  "En attente": "bg-yellow-100 text-yellow-700",
  Annulée: "bg-red-100 text-red-700",
};


type FactureListProps = {
  onAdd?: () => void;
};

export default function FactureList({ onAdd }: FactureListProps) {
  const queryClient = useQueryClient();
  const { data: factures = [], isLoading } = useQuery({
    queryKey: ["factures"],
    queryFn: fetchFactures,
  });
  const deleteMutation = useMutation({
    mutationFn: deleteFacture,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["factures"] }),
  });
  const { data: vehiclesData } = useVehicles();
  const vehicles = vehiclesData?.vehicles || [];
  const [search, setSearch] = useState("");
  const [vehiculeFilter, setVehiculeFilter] = useState("");
  const [statutFilter, setStatutFilter] = useState("");

  const filtered = factures.filter((f: Facture) => {
    const matchesSearch =
      f.designation.toLowerCase().includes(search.toLowerCase()) ||
      f.client.toLowerCase().includes(search.toLowerCase());
    const matchesVehicule = vehiculeFilter ? (f.vehicule?.name || f.vehicule?.model || f.vehicule?.plateNumber) === vehiculeFilter : true;
    const matchesStatut = statutFilter ? f.statut === statutFilter : true;
    return matchesSearch && matchesVehicule && matchesStatut;
  });

  return (
    <div className="bg-transparent max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-2 mb-4 items-center justify-between">
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Recherche désignation ou client..."
              className="w-full pl-2 pr-2 py-1 border rounded focus:ring-2 focus:ring-indigo-300 text-sm"
            />
          </div>
          <select
            value={vehiculeFilter}
            onChange={(e) => setVehiculeFilter(e.target.value)}
            className="px-2 py-1 border rounded focus:ring-2 focus:ring-indigo-300 text-sm"
          >
            <option value="">Tous véhicules</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.name || v.model || v.plateNumber}>
                {v.name || v.model || v.plateNumber}
              </option>
            ))}
          </select>
          <select
            value={statutFilter}
            onChange={(e) => setStatutFilter(e.target.value)}
            className="px-2 py-1 border rounded focus:ring-2 focus:ring-indigo-300 text-sm"
          >
            <option value="">Tous statuts</option>
            <option value="Payée">Payée</option>
            <option value="En attente">En attente</option>
            <option value="Annulée">Annulée</option>
          </select>
        </div>
        {onAdd && (
          <button
            type="button"
            onClick={onAdd}
            className="px-4 py-1.5 bg-indigo-600 text-white rounded-md font-bold shadow hover:bg-indigo-700 transition text-sm"
          >
            + Ajouter Facture
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow border border-indigo-200">
          <thead>
            <tr className="bg-indigo-50 text-indigo-700 text-sm">
              <th className="px-3 py-2 text-left">Désignation</th>
              <th className="px-3 py-2 text-left">Client</th>
              <th className="px-3 py-2 text-left">Véhicule</th>
              <th className="px-3 py-2 text-left">Montant</th>
              <th className="px-3 py-2 text-left">Date</th>
              <th className="px-3 py-2 text-left">Statut</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-indigo-400">
                  Chargement des factures...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-400">
                  Aucune facture trouvée.
                </td>
              </tr>
            ) : (
              filtered.map((f) => (
                <tr key={f._id} className="border-t border-indigo-100 hover:bg-indigo-50 transition">
                  <td className="px-3 py-2 font-semibold text-indigo-700">{f.designation}</td>
                  <td className="px-3 py-2">{f.client}</td>
                  <td className="px-3 py-2">{f.vehicule?.name || f.vehicule?.model || f.vehicule?.plateNumber || "-"}</td>
                  <td className="px-3 py-2">{f.montant ?? "-"} DH</td>
                  <td className="px-3 py-2">{f.date?.slice(0, 10)}</td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${statusColors[f.statut] || "bg-gray-100 text-gray-700"}`}>
                      {f.statut}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <button
                      className="text-red-600 hover:underline text-xs font-bold"
                      onClick={() => deleteMutation.mutate(f._id)}
                      disabled={deleteMutation.isPending}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
