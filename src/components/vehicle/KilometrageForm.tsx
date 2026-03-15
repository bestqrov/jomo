"use client";
import { useState } from "react";

export default function KilometrageForm({ onCancel }) {
  const [form, setForm] = useState({
    vehicule: "",
    date: "",
    kilometres: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Enregistrement (mock): implémentez la logique d'enregistrement ici.");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border-t-8 border-green-400 mt-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-green-700 tracking-tight mb-1">Kilométrage</h2>
        <p className="text-gray-500">Ajouter un relevé de kilométrage</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Véhicule</label>
          <input name="vehicule" value={form.vehicule} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-green-400 focus:border-green-400" placeholder="Entrer le véhicule" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Date kilométrage</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-green-400 focus:border-green-400" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Kilomètres</label>
          <input type="number" name="kilometres" value={form.kilometres} onChange={handleChange} className="w-full border rounded px-3 py-2 focus:ring-green-400 focus:border-green-400" />
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-8">
        <button type="button" onClick={onCancel} className="px-6 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition">Annuler</button>
        <button type="submit" className="px-6 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700 transition">Enregistrer</button>
      </div>
    </form>
  );
}
