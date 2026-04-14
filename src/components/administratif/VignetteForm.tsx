"use client";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function VignetteForm() {
  const [form, setForm] = useState({
    vehicle: "",
    numero: "",
    dateDebut: "",
    dateFin: "",
    montantPrincipal: "",
    penalite: "",
    majoration: "",
    fraisService: "",
    timbre: "",
    tvaFraisService: "",
    montantTotal: "",
    fournisseur: "",
    etat: "valide",
    attachement: null,
    commentaire: ""
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value
    }));
  };

  const handleCancel = () => {
    setForm({
      vehicle: "",
      numero: "",
      dateDebut: "",
      dateFin: "",
      montantPrincipal: "",
      penalite: "",
      majoration: "",
      fraisService: "",
      timbre: "",
      tvaFraisService: "",
      montantTotal: "",
      fournisseur: "",
      etat: "valide",
      attachement: null,
      commentaire: ""
    });
  };

  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const payload = {
        vehicule: form.vehicle,
        numero: form.numero || `${form.vehicle || 'vignette'}-${Date.now()}`,
        dateEmission: form.dateDebut,
        dateExpiration: form.dateFin,
        montant: Number(form.montantTotal || form.montantPrincipal || 0),
        fournisseur: form.fournisseur,
        etat: form.etat,
        commentaire: form.commentaire,
      };

      const res = await fetch("/api/v1/administratif/vignettes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Erreur lors de l'enregistrement");
      } else {
        setSuccess(true);
        queryClient.invalidateQueries({ queryKey: ["vignettes"] });
        setForm({
          vehicle: "",
          numero: "",
          dateDebut: "",
          dateFin: "",
          montantPrincipal: "",
          penalite: "",
          majoration: "",
          fraisService: "",
          timbre: "",
          tvaFraisService: "",
          montantTotal: "",
          fournisseur: "",
          etat: "valide",
          attachement: null,
          commentaire: ""
        });
      }
    } catch (e) {
      setError("Erreur serveur");
    }
    setLoading(false);
  };

  return (
    <form className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-8 border-t-8 border-yellow-400" onSubmit={handleSubmit}>
      <div className="mb-8 text-center">
        {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">Vignette enregistrée avec succès !</div>}
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
        {loading && <div className="mb-4 p-3 bg-yellow-100 text-yellow-700 rounded">Enregistrement...</div>}
        <h2 className="text-3xl font-bold text-yellow-600 tracking-tight mb-1">Vignette</h2>
        <p className="text-gray-500">Informations générales</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Véhicule</label>
          <input name="vehicle" value={form.vehicle} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400" placeholder="Entrer le véhicule" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Numéro de vignette</label>
          <input name="numero" value={form.numero} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400" placeholder="Entrer le numéro" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Fournisseur</label>
          <input name="fournisseur" value={form.fournisseur} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400" placeholder="Entrer le fournisseur" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">État</label>
          <select name="etat" value={form.etat} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400">
            <option value="valide">Valide</option>
            <option value="expiré">Expiré</option>
            <option value="en_attente">En attente</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Date début</label>
          <input type="date" name="dateDebut" value={form.dateDebut} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Date fin</label>
          <input type="date" name="dateFin" value={form.dateFin} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Montant principal (DH)</label>
          <input type="number" name="montantPrincipal" value={form.montantPrincipal} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Penalité (DH)</label>
          <input type="number" name="penalite" value={form.penalite} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Majoration (DH)</label>
          <input type="number" name="majoration" value={form.majoration} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Frais service (DH)</label>
          <input type="number" name="fraisService" value={form.fraisService} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Timbre (DH)</label>
          <input type="number" name="timbre" value={form.timbre} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Tva frais service (DH)</label>
          <input type="number" name="tvaFraisService" value={form.tvaFraisService} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Montant Total (DH)</label>
          <input type="number" name="montantTotal" value={form.montantTotal} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Attachement</label>
          <input type="file" name="attachement" onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400 bg-white" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Commentaire</label>
          <textarea name="commentaire" value={form.commentaire} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400" rows={2} placeholder="Ajouter un commentaire..." />
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-8">
        <button type="button" onClick={handleCancel} className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition">Annuler</button>
        <button type="submit" className="px-6 py-2 rounded bg-yellow-500 text-white font-bold hover:bg-yellow-600 transition">Enregistrer</button>
      </div>
    </form>
  );
}
