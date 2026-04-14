"use client";
import { useState } from "react";

const initialState = {
  code: "",
  montantHT: "",
  libelle: "",
  tva: "",
  typeEquipement: "",
  montantTTC: "",
  fournisseur: "",
  dateAchat: "",
  description: "",
};

export default function EquipementForm({ onCancel, onSave = () => {}, initialData = null }) {
  const [form, setForm] = useState(initialData || initialState);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");

  const validateField = (name, value) => {
    switch (name) {
      case "code":
        if (!value.trim()) return "Code est requis";
        break;
      case "montantHT":
        if (value === "" || isNaN(Number(value)) || Number(value) < 0) return "Montant HT doit être un nombre positif";
        break;
      case "typeEquipement":
        if (!value.trim()) return "Type équipement est requis";
        break;
      default:
        return "";
    }
    return "";
  };

  const validateForm = () => {
    const errors = {};
    Object.entries(form).forEach(([key, value]) => {
      const err = validateField(key, value);
      if (err) errors[key] = err;
    });
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFieldErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const errors = validateForm();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setError("Veuillez corriger les erreurs ci-dessous.");
      const firstErrorField = Object.keys(errors)[0];
      const el = document.getElementsByName(firstErrorField)[0];
      if (el) el.focus();
      return;
    }
    setLoading(true);
    setTimeout(() => {
      onSave?.(form);
      setLoading(false);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-transparent max-w-xl mx-auto">
      <h3 className="text-lg font-bold text-purple-700 mb-4 text-center tracking-wide">Equipement véhicule</h3>
      {/* Section 1: Informations générales */}
      <div className="bg-white rounded-xl shadow p-4 border border-purple-200 mb-4">
        <h4 className="text-base font-bold text-purple-600 mb-2">Informations générales</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-purple-800 text-xs font-semibold mb-1">Code</label>
            <input name="code" value={form.code} onChange={handleChange} onBlur={handleBlur} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-purple-300 text-sm" />
            {fieldErrors.code && <div className="text-red-600 text-xs mt-1">{fieldErrors.code}</div>}
          </div>
          <div>
            <label className="block text-purple-800 text-xs font-semibold mb-1">Montant HT (DH)</label>
            <input type="number" name="montantHT" value={form.montantHT} onChange={handleChange} onBlur={handleBlur} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-purple-300 text-sm" />
            {fieldErrors.montantHT && <div className="text-red-600 text-xs mt-1">{fieldErrors.montantHT}</div>}
          </div>
          <div>
            <label className="block text-purple-800 text-xs font-semibold mb-1">Libellé</label>
            <input name="libelle" value={form.libelle} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-purple-300 text-sm" />
          </div>
          <div>
            <label className="block text-purple-800 text-xs font-semibold mb-1">TVA (%)</label>
            <input type="number" name="tva" value={form.tva} onChange={handleChange} min={0} max={100} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-purple-300 text-sm" />
          </div>
          <div>
            <label className="block text-purple-800 text-xs font-semibold mb-1">Type équipement</label>
            <input name="typeEquipement" value={form.typeEquipement} onChange={handleChange} onBlur={handleBlur} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-purple-300 text-sm" />
            {fieldErrors.typeEquipement && <div className="text-red-600 text-xs mt-1">{fieldErrors.typeEquipement}</div>}
          </div>
          <div>
            <label className="block text-purple-800 text-xs font-semibold mb-1">Montant TTC (DH)</label>
            <input type="number" name="montantTTC" value={form.montantTTC} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-purple-300 text-sm" />
          </div>
          <div>
            <label className="block text-purple-800 text-xs font-semibold mb-1">Fournisseur</label>
            <input name="fournisseur" value={form.fournisseur} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-purple-300 text-sm" />
          </div>
          <div>
            <label className="block text-purple-800 text-xs font-semibold mb-1">Date d'achat</label>
            <input type="date" name="dateAchat" value={form.dateAchat} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-purple-300 text-sm" />
          </div>
          <div className="md:col-span-3">
            <label className="block text-purple-800 text-xs font-semibold mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-purple-300 text-sm" rows={2} />
          </div>
        </div>
      </div>
      {error && <div className="mb-2 text-red-600 text-center">{error}</div>}
      <div className="flex justify-center gap-3 mt-2">
        <button type="submit" className="px-6 py-1.5 bg-purple-600 text-white rounded-md font-bold shadow hover:bg-purple-700 transition text-sm" disabled={loading}>{loading ? "Enregistrement..." : "Enregistrer"}</button>
        <button type="button" className="px-6 py-1.5 bg-gray-200 text-purple-700 rounded-md font-bold shadow hover:bg-gray-300 transition text-sm" onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
}
