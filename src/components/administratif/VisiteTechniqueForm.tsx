"use client";
import React, { useState } from "react";

export default function VisiteTechniqueForm() {
  const [form, setForm] = useState({
    vehicle: "",
    dateDebut: "",
    montantTVA: "",
    dateFin: "",
    timbres: "",
    typeVisite: "",
    cnpac: "",
    centre: "",
    taxeCom: "",
    cneh: "",
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
      dateDebut: "",
      montantTVA: "",
      dateFin: "",
      timbres: "",
      typeVisite: "",
      cnpac: "",
      centre: "",
      taxeCom: "",
      cneh: "",
      attachement: null,
      commentaire: ""
    });
  };

  return (
    <form
      className="space-y-6 bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 p-8 rounded-2xl shadow-2xl w-4/5 max-w-3xl mx-auto border-2 border-blue-200 animate-fade-in mt-8"
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)' }}
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight mb-1">
          Visite technique
        </h2>
        <p className="text-lg font-semibold text-blue-700">Informations générales</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-blue-700">Véhicule</label>
          <input name="vehicle" value={form.vehicle} onChange={handleChange} className="input input-bordered w-full bg-white/80 border-yellow-300 focus:border-pink-400 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm" placeholder="Entrer le véhicule" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-pink-700">Date début</label>
          <input type="date" name="dateDebut" value={form.dateDebut} onChange={handleChange} className="input input-bordered w-full bg-white/80 border-pink-300 focus:border-yellow-400 focus:ring-2 focus:ring-pink-200 rounded-lg shadow-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-blue-700">Montant TVA (DH)</label>
          <input type="number" name="montantTVA" value={form.montantTVA} onChange={handleChange} className="input input-bordered w-full bg-white/80 border-blue-300 focus:border-yellow-400 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-pink-700">Date fin</label>
          <input type="date" name="dateFin" value={form.dateFin} onChange={handleChange} className="input input-bordered w-full bg-white/80 border-pink-300 focus:border-yellow-400 focus:ring-2 focus:ring-pink-200 rounded-lg shadow-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-blue-700">Timbres (DH)</label>
          <input type="number" name="timbres" value={form.timbres} onChange={handleChange} className="input input-bordered w-full bg-white/80 border-blue-300 focus:border-pink-400 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-pink-700">Type visite technique</label>
          <input name="typeVisite" value={form.typeVisite} onChange={handleChange} className="input input-bordered w-full bg-white/80 border-pink-300 focus:border-yellow-400 focus:ring-2 focus:ring-pink-200 rounded-lg shadow-sm" placeholder="Type de visite" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-blue-700">CNPAC (DH)</label>
          <input type="number" name="cnpac" value={form.cnpac} onChange={handleChange} className="input input-bordered w-full bg-white/80 border-blue-300 focus:border-yellow-400 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Centre de visite technique</label>
          <input name="centre" value={form.centre} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400" placeholder="Nom du centre" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">TAXE COM (DH)</label>
          <input type="number" name="taxeCom" value={form.taxeCom} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">CNEH (DH)</label>
          <input type="number" name="cneh" value={form.cneh} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-yellow-400 focus:border-yellow-400" />
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
