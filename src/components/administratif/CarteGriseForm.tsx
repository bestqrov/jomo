"use client";
import React, { useState } from "react";

type CarteGriseFormProps = {
  initialData?: {
    _id?: string;
    vehicule?: string;
    vehicle?: string;
    numero?: string;
    dateDelivrance?: string;
    dateDebut?: string;
    dateExpiration?: string;
    dateFin?: string;
    fournisseur?: string;
    commentaire?: string;
  };
  onSaved?: () => void;
  onCancel?: () => void;
};

export default function CarteGriseForm({ initialData = {}, onSaved, onCancel }: CarteGriseFormProps) {
  const [form, setForm] = useState({
    vehicle: initialData.vehicule || initialData.vehicle || "",
    numero: initialData.numero || "",
    dateDebut: initialData.dateDelivrance || initialData.dateDebut || "",
    dateFin: initialData.dateExpiration || initialData.dateFin || "",
    fournisseur: initialData.fournisseur || "",
    attachement: null,
    commentaire: initialData.commentaire || ""
  });
  const [editId, setEditId] = useState(initialData._id || null);

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
      attachement: null,
      commentaire: ""
    });
    setError("");
    setSuccess(false);
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const payload = {
      vehicule: form.vehicle,
      numero: form.numero,
      dateDelivrance: form.dateDebut,
      dateExpiration: form.dateFin,
      fournisseur: form.fournisseur || "",
      commentaire: form.commentaire || "",
    };

    try {
      const method = editId ? "PATCH" : "POST";
      const endpoint = editId ? `/api/v1/administratif/cartes-grises/${editId}` : "/api/v1/administratif/cartes-grises";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur lors de l'enregistrement");
      } else {
        setSuccess(true);
        if (!editId) {
          setForm({
            vehicle: "",
            numero: "",
            dateDebut: "",
            dateFin: "",
            fournisseur: "",
            attachement: null,
            commentaire: ""
          });
        }
        if (onSaved) onSaved();
      }
    } catch (e) {
      setError("Erreur serveur");
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-8 border-t-8 border-yellow-400">
      <div className="mb-8 text-center">
        {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">Carte grise enregistrée avec succès !</div>}
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
        {loading && <div className="mb-4 p-3 bg-yellow-100 text-yellow-700 rounded">Enregistrement...</div>}
        <h2 className="text-3xl font-bold text-yellow-600 tracking-tight mb-1">Carte grise</h2>
        <p className="text-gray-500">Informations générales</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Véhicule</label>
          <input name="vehicle" value={form.vehicle} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400" placeholder="Entrer le véhicule" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Numéro</label>
          <input name="numero" value={form.numero} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400" placeholder="Numéro de la carte grise" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Fournisseur</label>
          <input name="fournisseur" value={form.fournisseur} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400" placeholder="Fournisseur" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Date début</label>
          <input type="date" name="dateDebut" value={form.dateDebut} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Date fin</label>
          <input type="date" name="dateFin" value={form.dateFin} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400" />
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
      <div className="flex justify-between gap-4 mt-8">
        <button type="button" onClick={() => { handleCancel(); if (onCancel) onCancel(); }} className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition">Annuler</button>
        <button type="submit" className="px-6 py-2 rounded bg-yellow-500 text-white font-bold hover:bg-yellow-600 transition">{editId ? "Mettre à jour" : "Enregistrer"}</button>
      </div>
    </form>
  );
}
