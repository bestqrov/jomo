"use client";
import { useState } from "react";

export default function IndexeHoraireForm({ onCancel, onSave, initialData }) {
  const [vehicule, setVehicule] = useState(initialData?.vehicule || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [h, setH] = useState(initialData?.h || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onSave({ vehicule, date, h });
      setLoading(false);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-purple-50 via-white to-purple-100 rounded-3xl shadow-2xl p-8 border-2 border-purple-300 max-w-lg mx-auto">
      <h3 className="text-2xl font-extrabold text-purple-700 mb-6 text-center tracking-wide">Ajouter un indexe horaire</h3>
      <div className="mb-5">
        <label className="block text-purple-800 font-semibold mb-2">Véhicule <span className="text-red-500">*</span></label>
        <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" value={vehicule} onChange={e => setVehicule(e.target.value)} required />
      </div>
      <div className="mb-5">
        <label className="block text-purple-800 font-semibold mb-2">Date indexe horaire <span className="text-red-500">*</span></label>
        <input type="date" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" value={date} onChange={e => setDate(e.target.value)} required />
      </div>
      <div className="mb-8">
        <label className="block text-purple-800 font-semibold mb-2">H <span className="text-red-500">*</span></label>
        <input type="number" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" value={h} onChange={e => setH(e.target.value)} required min={0} />
      </div>
      <div className="flex justify-center gap-6">
        <button type="submit" className="px-8 py-2 bg-purple-600 text-white rounded-lg font-bold shadow hover:bg-purple-700 transition" disabled={loading}>{loading ? "Enregistrement..." : "Enregistrer"}</button>
        <button type="button" className="px-8 py-2 bg-gray-200 text-purple-700 rounded-lg font-bold shadow hover:bg-gray-300 transition" onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
}
