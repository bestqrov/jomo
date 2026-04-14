"use client";

import { useState } from "react";
import axios from "axios";

const initialState = {
  numero: "",
  dateContrat: "",
  concessionnaire: "",
  datePremierPrelevement: "",
  societeLeasing: "",
  dateFinContrat: "",
  duree: "",
  dateReception: "",
  commentaire: "",
  montantContratHT: "",
  tva: "",
  montantContratTTC: "",
  montantPrelevementHT: "",
  montantPrelevementTTC: "",
  montantFinanceHT: "",
  montantFinanceTTC: "",
  valeurResiduelleHT: "",
  valeurResiduelleTTC: "",
  dureeReport: "",
  avenantMontantPrelevementHT: "",
  avenantMontantPrelevementTTC: "",
  avenantDateDebut: "",
  avenantDateFin: "",
};

export default function LeasingForm({ onCancel, onSave = () => {}, initialData = null }) {
  const [form, setForm] = useState(initialData || initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // Per-field validation
  const validateField = (name, value) => {
    switch (name) {
      case "numero":
        if (!value.trim()) return "Numéro du contrat est requis";
        break;
      case "dateContrat":
        if (!value) return "Date du contrat est requise";
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
      await axios.post("/api/v1/flotte/leasings", form);
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
    <form onSubmit={handleSubmit} className="bg-transparent max-w-2xl mx-auto">
      {success && <div className="mb-2 text-blue-700 font-semibold">{success}</div>}
      {error && <div className="mb-2 text-red-600 font-semibold">{error}</div>}
      <h3 className="text-lg font-bold text-blue-700 mb-4 text-center tracking-wide">Contrat de leasing</h3>
      {/* Section 1: Informations générales */}
      <div className="bg-white rounded-xl shadow p-4 border border-blue-200 mb-4">
        <h4 className="text-base font-bold text-blue-600 mb-2">Informations générales</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Numéro du contrat <span className="text-red-500">*</span></label>
            <input name="numero" value={form.numero} onChange={handleChange} onBlur={handleBlur} required className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
            {fieldErrors.numero && <div className="text-red-600 text-xs mt-1">{fieldErrors.numero}</div>}
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Date du contrat <span className="text-red-500">*</span></label>
            <input type="date" name="dateContrat" value={form.dateContrat} onChange={handleChange} onBlur={handleBlur} required className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
            {fieldErrors.dateContrat && <div className="text-red-600 text-xs mt-1">{fieldErrors.dateContrat}</div>}
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Concessionnaire</label>
            <input name="concessionnaire" value={form.concessionnaire} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Date du 1er prélèvement</label>
            <input type="date" name="datePremierPrelevement" value={form.datePremierPrelevement} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Société de leasing</label>
            <input name="societeLeasing" value={form.societeLeasing} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Date fin du contrat</label>
            <input type="date" name="dateFinContrat" value={form.dateFinContrat} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Durée (Mois)</label>
            <input type="number" name="duree" value={form.duree} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Date de réception</label>
            <input type="date" name="dateReception" value={form.dateReception} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-blue-800 text-xs font-semibold mb-1">Commentaire</label>
            <textarea name="commentaire" value={form.commentaire} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" rows={2} />
          </div>
        </div>
      </div>
      {/* Section 2: Coûts */}
      <div className="bg-white rounded-xl shadow p-4 border border-blue-200 mb-4">
        <h4 className="text-base font-bold text-blue-600 mb-2">Coûts</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Montant contrat HT (DH)</label>
            <input type="number" name="montantContratHT" value={form.montantContratHT} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">TVA (%)</label>
            <input type="number" name="tva" value={form.tva} onChange={handleChange} min={0} max={100} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Montant contrat TTC (DH)</label>
            <input type="number" name="montantContratTTC" value={form.montantContratTTC} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Montant prélèvement HT (DH)</label>
            <input type="number" name="montantPrelevementHT" value={form.montantPrelevementHT} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Montant prélèvement TTC (DH)</label>
            <input type="number" name="montantPrelevementTTC" value={form.montantPrelevementTTC} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Montant financé HT (DH)</label>
            <input type="number" name="montantFinanceHT" value={form.montantFinanceHT} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Montant financé TTC (DH)</label>
            <input type="number" name="montantFinanceTTC" value={form.montantFinanceTTC} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Valeur résiduelle HT (DH)</label>
            <input type="number" name="valeurResiduelleHT" value={form.valeurResiduelleHT} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Valeur résiduelle TTC (DH)</label>
            <input type="number" name="valeurResiduelleTTC" value={form.valeurResiduelleTTC} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Durée de report (Mois)</label>
            <input type="number" name="dureeReport" value={form.dureeReport} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
        </div>
      </div>
      {/* Section 3: Avenant */}
      <div className="bg-white rounded-xl shadow p-4 border border-blue-200 mb-4">
        <h4 className="text-base font-bold text-blue-600 mb-2">Avenant</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Montant prélèvement HT (DH)</label>
            <input type="number" name="avenantMontantPrelevementHT" value={form.avenantMontantPrelevementHT} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Montant prélèvement TTC (DH)</label>
            <input type="number" name="avenantMontantPrelevementTTC" value={form.avenantMontantPrelevementTTC} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Date début</label>
            <input type="date" name="avenantDateDebut" value={form.avenantDateDebut} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Date fin</label>
            <input type="date" name="avenantDateFin" value={form.avenantDateFin} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-2">
        <button type="submit" className="px-6 py-1.5 bg-blue-600 text-white rounded-md font-bold shadow hover:bg-blue-700 transition text-sm" disabled={loading}>{loading ? "Enregistrement..." : "Enregistrer"}</button>
        <button type="button" className="px-6 py-1.5 bg-gray-200 text-blue-700 rounded-md font-bold shadow hover:bg-gray-300 transition text-sm" onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
}
