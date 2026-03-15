"use client";
import { useState } from "react";
import { useVehicles } from "@/hooks/useVehicles";

const initialState = {
  vehicule: "",
  dateReforme: "",
  typeReforme: "",
  montant: "",
  commentaire: "",
};

export default function ReformeForm({ onCancel, onSave, initialData }) {
  const [form, setForm] = useState(initialData || initialState);
  const [loading, setLoading] = useState(false);
  const { data, isLoading: loadingVehicles } = useVehicles();
  const vehicles = data?.vehicles || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onSave?.(form);
      setLoading(false);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-transparent max-w-xl mx-auto">
      <h3 className="text-lg font-bold text-gray-700 mb-4 text-center tracking-wide">Véhicule réformé</h3>
      {/* Section 1: Véhicule */}
      <div className="bg-white rounded-xl shadow p-4 border border-gray-200 mb-4">
        <h4 className="text-base font-bold text-gray-600 mb-2">Véhicule <span className='text-red-500'>*</span></h4>
        <select
          name="vehicule"
          value={form.vehicule}
          onChange={handleChange}
          className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-gray-300 text-sm"
          required
          disabled={loadingVehicles}
        >
          <option value="">{loadingVehicles ? "Chargement..." : "Sélectionner un véhicule"}</option>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name || v.model || v.plateNumber}
            </option>
          ))}
        </select>
      </div>
      {/* Section 2: Informations générales */}
      <div className="bg-white rounded-xl shadow p-4 border border-gray-200 mb-4">
        <h4 className="text-base font-bold text-gray-600 mb-2">Informations générales</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-gray-800 text-xs font-semibold mb-1">Date de réforme</label>
            <input type="date" name="dateReforme" value={form.dateReforme} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-gray-300 text-sm" />
          </div>
          <div>
            <label className="block text-gray-800 text-xs font-semibold mb-1">Types de réforme</label>
            <input name="typeReforme" value={form.typeReforme} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-gray-300 text-sm" />
          </div>
          <div>
            <label className="block text-gray-800 text-xs font-semibold mb-1">Montant (DH)</label>
            <input type="number" name="montant" value={form.montant} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-gray-300 text-sm" />
          </div>
        </div>
        <div className="mt-3">
          <label className="block text-gray-800 text-xs font-semibold mb-1">Commentaire</label>
          <textarea name="commentaire" value={form.commentaire} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-gray-300 text-sm" rows={2} />
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-2">
        <button type="submit" className="px-6 py-1.5 bg-gray-600 text-white rounded-md font-bold shadow hover:bg-gray-700 transition text-sm" disabled={loading}>{loading ? "Enregistrement..." : "Enregistrer"}</button>
        <button type="button" className="px-6 py-1.5 bg-gray-200 text-gray-700 rounded-md font-bold shadow hover:bg-gray-300 transition text-sm" onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
}
