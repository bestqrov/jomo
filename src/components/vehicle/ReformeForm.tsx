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
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const { data, isLoading: loadingVehicles } = useVehicles();
  const vehicles = data?.vehicles || [];

  const validateField = (name, value) => {
    switch (name) {
      case "vehicule":
        if (!value) return "Véhicule est requis";
        break;
      case "dateReforme":
        if (!value) return "Date de réforme est requise";
        break;
      case "montant":
        if (value === "" || isNaN(Number(value)) || Number(value) < 0) return "Montant doit être un nombre positif";
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
      <h3 className="text-lg font-bold text-gray-700 mb-4 text-center tracking-wide">Véhicule réformé</h3>
      {/* Section 1: Véhicule */}
      <div className="bg-white rounded-xl shadow p-4 border border-gray-200 mb-4">
        <h4 className="text-base font-bold text-gray-600 mb-2">Véhicule <span className='text-red-500'>*</span></h4>
        <select
          name="vehicule"
          value={form.vehicule}
          onChange={handleChange}
          onBlur={handleBlur}
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
        {fieldErrors.vehicule && <div className="text-red-600 text-xs mt-1">{fieldErrors.vehicule}</div>}
      </div>
      {/* Section 2: Informations générales */}
      <div className="bg-white rounded-xl shadow p-4 border border-gray-200 mb-4">
        <h4 className="text-base font-bold text-gray-600 mb-2">Informations générales</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-gray-800 text-xs font-semibold mb-1">Date de réforme</label>
            <input type="date" name="dateReforme" value={form.dateReforme} onChange={handleChange} onBlur={handleBlur} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-gray-300 text-sm" />
            {fieldErrors.dateReforme && <div className="text-red-600 text-xs mt-1">{fieldErrors.dateReforme}</div>}
          </div>
          <div>
            <label className="block text-gray-800 text-xs font-semibold mb-1">Types de réforme</label>
            <input name="typeReforme" value={form.typeReforme} onChange={handleChange} onBlur={handleBlur} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-gray-300 text-sm" />
            {fieldErrors.typeReforme && <div className="text-red-600 text-xs mt-1">{fieldErrors.typeReforme}</div>}
          </div>
          <div>
            <label className="block text-gray-800 text-xs font-semibold mb-1">Montant (DH)</label>
            <input type="number" name="montant" value={form.montant} onChange={handleChange} onBlur={handleBlur} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-gray-300 text-sm" />
            {fieldErrors.montant && <div className="text-red-600 text-xs mt-1">{fieldErrors.montant}</div>}
          </div>
        </div>
        <div className="mt-3">
          <label className="block text-gray-800 text-xs font-semibold mb-1">Commentaire</label>
          <textarea name="commentaire" value={form.commentaire} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-gray-300 text-sm" rows={2} />
        </div>
      </div>
      {error && <div className="mb-2 text-red-600 text-center">{error}</div>}
      <div className="flex justify-center gap-3 mt-2">
        <button type="submit" className="px-6 py-1.5 bg-gray-600 text-white rounded-md font-bold shadow hover:bg-gray-700 transition text-sm" disabled={loading}>{loading ? "Enregistrement..." : "Enregistrer"}</button>
        <button type="button" className="px-6 py-1.5 bg-gray-200 text-gray-700 rounded-md font-bold shadow hover:bg-gray-300 transition text-sm" onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
}
