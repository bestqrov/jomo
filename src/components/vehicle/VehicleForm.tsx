"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const initialState = {
  designation: "",
  immatricule: "",
  typeAcquisition: "",
  nom: "",
  dateMiseEnCirculation: "",
  codeCentreCout: "",
  numeroOrdre: "",
  carteGrise: "",
  numeroChassis: "",
  numeroW: "",
  couleur: "",
  codeCle: "",
  dateRestitution: "",
  kilometrageInitial: "",
  indexeHoraireInitial: "",
  photoPrincipale: "",
  commentaire: "",
  modele: "",
  acquisitionAchat: false,
  concessionnaire: "",
  dateAchat: "",
  numeroContrat: "",
  garantie: "",
  montantHT: "",
  tva: "",
};


const VehicleForm: React.FC = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newVehicle: typeof initialState) => {
      const { data } = await axios.post('/api/v1/flotte/vehicles', newVehicle);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      setSuccess(true);
      setForm(initialState);
      setFieldErrors({});
    },
    onError: (err: any) => {
      setError(err.message || "Erreur lors de l'enregistrement");
    },
    onSettled: () => setLoading(false),
  });

  // Per-field validation
  const validateField = (name: string, value: any) => {
    switch (name) {
      case "designation":
        if (!value.trim()) return "Désignation est requise";
        break;
      case "immatricule":
        if (!value.trim()) return "Immatricule est requis";
        break;
      case "typeAcquisition":
        if (!value) return "Type d'acquisition est requis";
        break;
      // Add more field-specific validation as needed
      default:
        return "";
    }
    return "";
  };

  // Validate all fields
  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    Object.entries(form).forEach(([key, value]) => {
      const err = validateField(key, value);
      if (err) errors[key] = err;
    });
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
    // Clear error on change
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const err = validateField(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, photoPrincipale: e.target.files[0].name }); // Placeholder for upload
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
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
    mutation.mutate(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-6xl mx-auto bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 p-12 rounded-3xl shadow-2xl border-2 border-blue-300"
    >
      {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">Véhicule enregistré avec succès !</div>}
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      {loading && <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">Enregistrement...</div>}
      <h2 className="text-3xl font-bold mb-10 text-blue-700 text-center tracking-wide bg-blue-200 py-4 rounded-2xl shadow-md">Véhicule</h2>
      {/* Identification Section */}
      <div className="mb-8 bg-white rounded-2xl shadow-lg p-8 border border-blue-200">
        <h3 className="text-2xl font-extrabold mb-4 border-b border-blue-200 pb-2 text-blue-700 bg-blue-100 px-2 rounded text-center">Identification</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Désignation <span className="text-red-500">*</span></label>
            <input type="text" name="designation" value={form.designation} onChange={handleChange} onBlur={handleBlur} className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" required />
            {fieldErrors.designation && <div className="text-red-600 text-xs mt-1">{fieldErrors.designation}</div>}
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Immatricule <span className="text-red-500">*</span></label>
            <input type="text" name="immatricule" value={form.immatricule} onChange={handleChange} onBlur={handleBlur} className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" required />
            {fieldErrors.immatricule && <div className="text-red-600 text-xs mt-1">{fieldErrors.immatricule}</div>}
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Type d'acquisition <span className="text-red-500">*</span></label>
            <select
              name="typeAcquisition"
              value={form.typeAcquisition}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              required
            >
              <option value="">Sélectionner</option>
              <option value="achat">Achat</option>
              <option value="leasing">Leasing</option>
              <option value="location">Location</option>
            </select>
            {fieldErrors.typeAcquisition && <div className="text-red-600 text-xs mt-1">{fieldErrors.typeAcquisition}</div>}
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Nom</label>
            <input type="text" name="nom" value={form.nom} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Date mise en circulation</label>
            <input type="date" name="dateMiseEnCirculation" value={form.dateMiseEnCirculation} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Code Centre de coût</label>
            <input type="text" name="codeCentreCout" value={form.codeCentreCout} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Numéro d'ordre</label>
            <input type="text" name="numeroOrdre" value={form.numeroOrdre} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
          </div>
        </div>
      </div>

      {/* Caractéristiques Section */}
      <div className="mb-8 bg-white rounded-2xl shadow-lg p-8 border border-green-200">
        <h3 className="text-2xl font-extrabold mb-4 border-b border-green-200 pb-2 text-green-700 bg-green-100 px-2 rounded text-center">Caractéristiques</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Carte grise</label>
            <input type="text" name="carteGrise" value={form.carteGrise} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1">N° de châssis</label>
            <input type="text" name="numeroChassis" value={form.numeroChassis} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Numéro W</label>
            <input type="text" name="numeroW" value={form.numeroW} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Couleur</label>
            <input type="text" name="couleur" value={form.couleur} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Code clé</label>
            <input type="text" name="codeCle" value={form.codeCle} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Date prévue de restitution</label>
            <input type="date" name="dateRestitution" value={form.dateRestitution} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Kilométrage initial (Km)</label>
            <input type="number" name="kilometrageInitial" value={form.kilometrageInitial} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" min="0" />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Indexe horaire initial (H)</label>
            <input type="number" name="indexeHoraireInitial" value={form.indexeHoraireInitial} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" min="0" />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Photo principale</label>
            <input type="file" name="photoPrincipale" onChange={handleFileChange} className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
          </div>
        </div>
      </div>

      {/* Infos complémentaires Section */}
      <div className="mb-8 bg-white rounded-2xl shadow-lg p-8 border border-purple-200">
        <h3 className="text-2xl font-extrabold mb-4 border-b border-purple-200 pb-2 text-purple-700 bg-purple-100 px-2 rounded text-center">Infos complémentaires</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className="block text-blue-700 font-semibold mb-1">Commentaire</label>
            <textarea name="commentaire" value={form.commentaire} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white min-h-[60px]" />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Modèle</label>
            <input type="text" name="modele" value={form.modele} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
          </div>
        </div>
      </div>

      {/* Acquisition Section */}
      <div className="mb-8 bg-white rounded-2xl shadow-lg p-8 border border-yellow-200">
        <h3 className="text-2xl font-extrabold mb-4 border-b border-yellow-200 pb-2 text-yellow-800 bg-yellow-100 px-2 rounded text-center">Acquisition</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-2">
            <input type="checkbox" name="acquisitionAchat" checked={form.acquisitionAchat} onChange={handleChange} className="h-5 w-5 text-blue-600 border-blue-300 rounded" />
            <label className="text-blue-700 font-semibold">Acquisition achat</label>
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Concessionnaire</label>
            <input type="text" name="concessionnaire" value={form.concessionnaire} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Date d'achat</label>
            <input type="date" name="dateAchat" value={form.dateAchat} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Numéro contrat</label>
            <input type="text" name="numeroContrat" value={form.numeroContrat} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Garantie</label>
            <input type="text" name="garantie" value={form.garantie} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1">Montant HT (DH)</label>
            <input type="number" name="montantHT" value={form.montantHT} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" min="0" />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-1">TVA (%)</label>
            <input type="number" name="tva" value={form.tva} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white" min="0" max="100" />
          </div>
        </div>
      </div>
      {error && <div className="mb-2 text-red-600 text-center">{error}</div>}
      {success && <div className="mb-2 text-green-600 text-center">Enregistré avec succès !</div>}
      <div className="flex justify-between mt-10">
        <button
          type="button"
          className="px-8 py-3 rounded-lg bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition text-lg"
          onClick={() => setForm(initialState)}
          disabled={loading}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-8 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-lg text-lg"
          disabled={loading}
        >
          {loading ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </form>
  );
};

export default VehicleForm;
