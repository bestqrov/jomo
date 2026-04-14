"use client";
import { useState } from "react";
import axios from "axios";

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
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Per-field validation
  const validateField = (name, value) => {
    switch (name) {
      case "vehicule":
        if (!value.trim()) return "Véhicule est requis";
        break;
      case "fournisseur":
        if (!value.trim()) return "Fournisseur est requis";
        break;
      case "dateAchat":
        if (!value) return "Date d'achat est requise";
        break;
      default:
        return "";
    }
    return "";
  };

  // Validate all fields
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
    const err = validateField(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    const errors = validateForm();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setError("Veuillez corriger les erreurs ci-dessous.");
      // Focus first invalid field
      const firstErrorField = Object.keys(errors)[0];
      const el = document.getElementsByName(firstErrorField)[0];
      if (el) el.focus();
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/v1/flotte/achats", form);
      setSuccess("Enregistré avec succès !");
      onSave?.(form);
      setForm(initialState);
      setFieldErrors({});
    } catch (err) {
      setError("Erreur lors de l'enregistrement.");
    } finally {
      setLoading(false);
    }
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
            <input name="vehicule" value={form.vehicule} onChange={handleChange} onBlur={handleBlur} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-green-300 text-sm" />
            {fieldErrors.vehicule && <div className="text-red-600 text-xs mt-1">{fieldErrors.vehicule}</div>}
          </div>
          <div>
            <label className="block text-green-800 text-xs font-semibold mb-1">Fournisseur</label>
            <input name="fournisseur" value={form.fournisseur} onChange={handleChange} onBlur={handleBlur} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-green-300 text-sm" />
            {fieldErrors.fournisseur && <div className="text-red-600 text-xs mt-1">{fieldErrors.fournisseur}</div>}
          </div>
        </div>
      </div>
      {/* Section 2: Informations générales */}
      <div className="bg-white rounded-xl shadow p-4 border border-green-200 mb-4">
        <h4 className="text-base font-bold text-green-600 mb-2">Informations générales</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-green-800 text-xs font-semibold mb-1">Date d'achat</label>
            <input type="date" name="dateAchat" value={form.dateAchat} onChange={handleChange} onBlur={handleBlur} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-green-300 text-sm" />
            {fieldErrors.dateAchat && <div className="text-red-600 text-xs mt-1">{fieldErrors.dateAchat}</div>}
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
        {success && <div className="mb-2 text-green-700 font-semibold">{success}</div>}
        {error && <div className="mb-2 text-red-600 font-semibold">{error}</div>}
        <button type="submit" className="px-6 py-1.5 bg-green-600 text-white rounded-md font-bold shadow hover:bg-green-700 transition text-sm" disabled={loading}>{loading ? "Enregistrement..." : "Enregistrer"}</button>
        <button type="button" className="px-6 py-1.5 bg-gray-200 text-green-700 rounded-md font-bold shadow hover:bg-gray-300 transition text-sm" onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
}
