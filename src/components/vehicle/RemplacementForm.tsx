"use client";
import { useState } from "react";
import { useVehicles } from "@/hooks/useVehicles";

const initialState = {
  vehicule: "",
  dateDemande: "",
  vehiculeRemplacement: "",
  contrat: "",
  sinistre: "",
  dateDebut: "",
  dateFinPrevue: "",
  dateRestitution: "",
  marqueType: "",
  modeFormule: "",
  kilometrageDepart: "",
  kilometrageRetour: "",
  distance: "",
  lieuDepart: "",
  lieuArrivee: "",
  carburantDebut: "",
  carburantFin: "",
  motif: "",
  attachement: "",
};

const carburantOptions = [
  { value: "0", label: "0" },
  { value: "1/4", label: "1/4" },
  { value: "1/2", label: "1/2" },
  { value: "3/4", label: "3/4" },
  { value: "4/4", label: "4/4" },
];


export default function RemplacementForm({ onCancel, onSave = () => {}, initialData = null }) {
  const [form, setForm] = useState(initialData || initialState);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");

  // Per-field validation
  const validateField = (name, value) => {
    switch (name) {
      case "vehicule":
        if (!value) return "Véhicule est requis";
        break;
      case "dateDemande":
        if (!value) return "Date de demande est requise";
        break;
      // Add more field-specific validation as needed
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
      onSave?.(form);
      setLoading(false);
    }, 600);
  };

  const { data, isLoading: loadingVehicles } = useVehicles();
  const vehicles = data?.vehicles || [];

  return (
    <form onSubmit={handleSubmit} className="bg-transparent max-w-2xl mx-auto">
      <h3 className="text-lg font-bold text-yellow-700 mb-4 text-center tracking-wide">Véhicule de remplacement</h3>
      {/* Section 1: Véhicule */}
      <div className="bg-white rounded-xl shadow p-4 border border-yellow-200 mb-4">
        <h4 className="text-base font-bold text-yellow-600 mb-2">Véhicule <span className='text-red-500'>*</span></h4>
        <select
          name="vehicule"
          value={form.vehicule}
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-yellow-300 text-sm"
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
        {error && <div className="mb-2 text-red-600 text-center">{error}</div>}
      </div>
      {/* Section 2: Informations générales */}
      <div className="bg-white rounded-xl shadow p-4 border border-yellow-200 mb-4">
        <h4 className="text-base font-bold text-yellow-600 mb-2">Informations générales <span className='text-red-500'>*</span></h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-yellow-800 text-xs font-semibold mb-1">Date demande <span className='text-red-500'>*</span></label>
            <input type="date" name="dateDemande" value={form.dateDemande} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-yellow-300 text-sm" required />
          </div>
          <div>
            <label className="block text-yellow-800 text-xs font-semibold mb-1">Véhicule de remplacement <span className='text-red-500'>*</span></label>
            <input name="vehiculeRemplacement" value={form.vehiculeRemplacement} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-yellow-300 text-sm" required />
          </div>
          <div>
            <label className="block text-yellow-800 text-xs font-semibold mb-1">Contrat <span className='text-red-500'>*</span></label>
            <input name="contrat" value={form.contrat} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-yellow-300 text-sm" required />
          </div>
          <div>
            <label className="block text-yellow-800 text-xs font-semibold mb-1">Sinistre <span className='text-red-500'>*</span></label>
            <input name="sinistre" value={form.sinistre} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-yellow-300 text-sm" required />
          </div>
          <div>
            <label className="block text-yellow-800 text-xs font-semibold mb-1">Date début <span className='text-red-500'>*</span></label>
            <input type="date" name="dateDebut" value={form.dateDebut} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-yellow-300 text-sm" required />
          </div>
          <div>
            <label className="block text-yellow-800 text-xs font-semibold mb-1">Date fin prévue <span className='text-red-500'>*</span></label>
            <input type="date" name="dateFinPrevue" value={form.dateFinPrevue} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-yellow-300 text-sm" required />
          </div>
          <div>
            <label className="block text-yellow-800 text-xs font-semibold mb-1">Date restitution <span className='text-red-500'>*</span></label>
            <input type="date" name="dateRestitution" value={form.dateRestitution} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-yellow-300 text-sm" required />
          </div>
          <div>
            <label className="block text-yellow-800 text-xs font-semibold mb-1">Marque et type <span className='text-red-500'>*</span></label>
            <input name="marqueType" value={form.marqueType} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-yellow-300 text-sm" required />
          </div>
          <div>
            <label className="block text-yellow-800 text-xs font-semibold mb-1">Mode formule <span className='text-red-500'>*</span></label>
            <input name="modeFormule" value={form.modeFormule} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-yellow-300 text-sm" required />
          </div>
          <div>
            <label className="block text-yellow-800 text-xs font-semibold mb-1">Kilométrage de départ (Km) <span className='text-red-500'>*</span></label>
            <input type="number" name="kilometrageDepart" value={form.kilometrageDepart} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-yellow-300 text-sm" required />
          </div>
          <div>
            <label className="block text-yellow-800 text-xs font-semibold mb-1">Kilométrage de retour (Km) <span className='text-red-500'>*</span></label>
            <input type="number" name="kilometrageRetour" value={form.kilometrageRetour} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-yellow-300 text-sm" required />
          </div>
          <div>
            <label className="block text-yellow-800 text-xs font-semibold mb-1">Distance (Km) <span className='text-red-500'>*</span></label>
            <input type="number" name="distance" value={form.distance} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-yellow-300 text-sm" required />
          </div>
          <div>
            <label className="block text-yellow-800 text-xs font-semibold mb-1">Lieu de départ <span className='text-red-500'>*</span></label>
            <input name="lieuDepart" value={form.lieuDepart} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-yellow-300 text-sm" required />
          </div>
          <div>
            <label className="block text-yellow-800 text-xs font-semibold mb-1">Lieu arrivée <span className='text-red-500'>*</span></label>
            <input name="lieuArrivee" value={form.lieuArrivee} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-yellow-300 text-sm" required />
          </div>
          <div>
            <label className="block text-yellow-800 text-xs font-semibold mb-1">Carburant début <span className='text-red-500'>*</span></label>
            <select name="carburantDebut" value={form.carburantDebut} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-yellow-300 text-sm" required>
              <option value="">Sélectionner</option>
              {carburantOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-yellow-800 text-xs font-semibold mb-1">Carburant fin <span className='text-red-500'>*</span></label>
            <select name="carburantFin" value={form.carburantFin} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-yellow-300 text-sm" required>
              <option value="">Sélectionner</option>
              {carburantOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div className="md:col-span-3">
            <label className="block text-yellow-800 text-xs font-semibold mb-1">Motif <span className='text-red-500'>*</span></label>
            <input name="motif" value={form.motif} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-yellow-300 text-sm" required />
          </div>
          <div className="md:col-span-3">
            <label className="block text-yellow-800 text-xs font-semibold mb-1">Attachement</label>
            <input name="attachement" value={form.attachement} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-yellow-300 text-sm" />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-2">
        <button type="submit" className="px-6 py-1.5 bg-yellow-600 text-white rounded-md font-bold shadow hover:bg-yellow-700 transition text-sm" disabled={loading}>{loading ? "Enregistrement..." : "Enregistrer"}</button>
        <button type="button" className="px-6 py-1.5 bg-gray-200 text-yellow-700 rounded-md font-bold shadow hover:bg-gray-300 transition text-sm" onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
}
