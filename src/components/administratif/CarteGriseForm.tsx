"use client";
import React, { useState } from "react";

export default function CarteGriseForm() {
  const [form, setForm] = useState({
    vehicle: "",
    numero: "",
    dateDebut: "",
    dateFin: "",
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
      attachement: null,
      commentaire: ""
    });
  };

  return (
    <form className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-8 border-t-8 border-yellow-400">
      <div className="mb-8 text-center">
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
      <div className="flex justify-end gap-4 mt-8">
        <button type="button" onClick={handleCancel} className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition">Annuler</button>
        <button type="submit" className="px-6 py-2 rounded bg-yellow-500 text-white font-bold hover:bg-yellow-600 transition">Enregistrer</button>
      </div>
    </form>
  );
}
