"use client";
import { useState } from "react";

const initialState = {
  vehicule: "",
  fournisseur: "",
  dateAchat: "",
  numeroContrat: "",
  garantie: "",
  montantHT: "",
  tva: "",
  montantTTC: "",
};

export default function AchatForm({ onCancel, onSave, initialData }) {
  const [form, setForm] = useState(initialData || initialState);
  const [loading, setLoading] = useState(false);

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
      <h3 className="text-lg font-bold text-green-700 mb-4 text-center tracking-wide">Contrat d'achat</h3>
      {/* Section 1: Véhicule & Fournisseur */}
      <div className="bg-white rounded-xl shadow p-4 border border-green-200 mb-4">
        <h4 className="text-base font-bold text-green-600 mb-2">Véhicule & Fournisseur</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-green-800 text-xs font-semibold mb-1">Véhicule</label>
            <input name="vehicule" value={form.vehicule} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-green-300 text-sm" />
          </div>
          <div>
            <label className="block text-green-800 text-xs font-semibold mb-1">Fournisseur</label>
            <input name="fournisseur" value={form.fournisseur} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-green-300 text-sm" />
          </div>
        </div>
      </div>
      {/* Section 2: Informations générales */}
      <div className="bg-white rounded-xl shadow p-4 border border-green-200 mb-4">
        <h4 className="text-base font-bold text-green-600 mb-2">Informations générales</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-green-800 text-xs font-semibold mb-1">Date d'achat</label>
            <input type="date" name="dateAchat" value={form.dateAchat} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-green-300 text-sm" />
          </div>
          <div>
            <label className="block text-green-800 text-xs font-semibold mb-1">Numéro contrat</label>
            <input name="numeroContrat" value={form.numeroContrat} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-green-300 text-sm" />
          </div>
          <div>
            <label className="block text-green-800 text-xs font-semibold mb-1">Garantie</label>
            <input name="garantie" value={form.garantie} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-green-300 text-sm" />
          </div>
        </div>
      </div>
      {/* Section 3: Montants */}
      <div className="bg-white rounded-xl shadow p-4 border border-green-200 mb-4">
        <h4 className="text-base font-bold text-green-600 mb-2">Montants</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-green-800 text-xs font-semibold mb-1">Montant HT (DH)</label>
            <input type="number" name="montantHT" value={form.montantHT} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-green-300 text-sm" />
          </div>
          <div>
            <label className="block text-green-800 text-xs font-semibold mb-1">TVA (%)</label>
            <input type="number" name="tva" value={form.tva} onChange={handleChange} min={0} max={100} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-green-300 text-sm" />
          </div>
          <div>
            <label className="block text-green-800 text-xs font-semibold mb-1">Montant TTC (DH)</label>
            <input type="number" name="montantTTC" value={form.montantTTC} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-green-300 text-sm" />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-2">
        <button type="submit" className="px-6 py-1.5 bg-green-600 text-white rounded-md font-bold shadow hover:bg-green-700 transition text-sm" disabled={loading}>{loading ? "Enregistrement..." : "Enregistrer"}</button>
        <button type="button" className="px-6 py-1.5 bg-gray-200 text-green-700 rounded-md font-bold shadow hover:bg-gray-300 transition text-sm" onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
}
