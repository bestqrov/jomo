"use client";
import { useState } from "react";


export default function IndexeHoraireForm({ onCancel, onSave = () => {}, initialData = null }) {
  const [vehicule, setVehicule] = useState(initialData?.vehicule || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [h, setH] = useState(initialData?.h || "");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");

  // Per-field validation
  const validateField = (name, value) => {
    switch (name) {
      case "vehicule":
        if (!value.trim()) return "Véhicule est requis";
        break;
      case "date":
        if (!value) return "Date indexe horaire est requise";
        break;
      case "h":
        if (!value || isNaN(Number(value)) || Number(value) < 0) return "H doit être un nombre positif";
        break;
      default:
        return "";
    }
    return "";
  };

  // Validate all fields
  const validateForm = () => {
    const errors = {};
    if (validateField("vehicule", vehicule)) errors.vehicule = validateField("vehicule", vehicule);
    if (validateField("date", date)) errors.date = validateField("date", date);
    if (validateField("h", h)) errors.h = validateField("h", h);
    return errors;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const err = validateField(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <input
          type="text"
          name="vehicule"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={vehicule}
          onChange={e => { setVehicule(e.target.value); setFieldErrors(prev => ({ ...prev, vehicule: "" })); }}
          onBlur={handleBlur}
          required
        />
        {fieldErrors.vehicule && <div className="text-red-600 text-xs mt-1">{fieldErrors.vehicule}</div>}
      </div>
      <div className="mb-5">
        <label className="block text-purple-800 font-semibold mb-2">Date indexe horaire <span className="text-red-500">*</span></label>
        <input
          type="date"
          name="date"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={date}
          onChange={e => { setDate(e.target.value); setFieldErrors(prev => ({ ...prev, date: "" })); }}
          onBlur={handleBlur}
          required
        />
        {fieldErrors.date && <div className="text-red-600 text-xs mt-1">{fieldErrors.date}</div>}
      </div>
      <div className="mb-8">
        <label className="block text-purple-800 font-semibold mb-2">H <span className="text-red-500">*</span></label>
        <input
          type="number"
          name="h"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          value={h}
          onChange={e => { setH(e.target.value); setFieldErrors(prev => ({ ...prev, h: "" })); }}
          onBlur={handleBlur}
          required
          min={0}
        />
        {fieldErrors.h && <div className="text-red-600 text-xs mt-1">{fieldErrors.h}</div>}
      </div>
      {error && <div className="mb-2 text-red-600 text-center">{error}</div>}
      <div className="flex justify-center gap-6">
        <button type="submit" className="px-8 py-2 bg-purple-600 text-white rounded-lg font-bold shadow hover:bg-purple-700 transition" disabled={loading}>{loading ? "Enregistrement..." : "Enregistrer"}</button>
        <button type="button" className="px-8 py-2 bg-gray-200 text-purple-700 rounded-lg font-bold shadow hover:bg-gray-300 transition" onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
}
