"use client";
import React, { useState } from "react";

interface AssuranceFormProps {
  onSuccess?: () => void;
}

const AssuranceForm: React.FC<AssuranceFormProps> = ({ onSuccess }) => {
  const [form, setForm] = useState({
    dateAssurance: "",
    typeAssurance: "",
    dateDebut: "",
    numeroAttestation: "",
    dateFin: "",
    numeroPolice: "",
    duree: "",
    compagnie: "",
    intermediaire: "",
    fraisTimbre: "",
    fraisContrat: "",
    attachement: "",
    commentaire: "",
    vehicle: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/administratif/assurances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          duree: parseInt(form.duree),
          fraisTimbre: parseFloat(form.fraisTimbre),
          fraisContrat: parseFloat(form.fraisContrat),
        }),
      });
      if (!res.ok) throw new Error("Erreur lors de l'enregistrement");
      setForm({ dateAssurance: "", typeAssurance: "", dateDebut: "", numeroAttestation: "", dateFin: "", numeroPolice: "", duree: "", compagnie: "", intermediaire: "", fraisTimbre: "", fraisContrat: "", attachement: "", commentaire: "", vehicle: "" });
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gradient-to-br from-green-100 via-green-200 to-green-300 p-8 rounded-2xl shadow-2xl w-4/5 max-w-3xl mx-auto border-2 border-green-400 animate-fade-in mt-8"
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)' }}
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-green-600 via-green-400 to-green-300 bg-clip-text text-transparent drop-shadow-lg tracking-tight mb-1">
          Assurance
        </h2>
        <p className="text-lg font-semibold text-green-700">Informations générales</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-green-700">Date assurance</label>
          <input name="dateAssurance" type="date" value={form.dateAssurance} onChange={handleChange} required className="input input-bordered w-full bg-white/80 border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg shadow-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-green-700">Type assurance</label>
          <input name="typeAssurance" value={form.typeAssurance} onChange={handleChange} required className="input input-bordered w-full bg-white/80 border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg shadow-sm" placeholder="Type d'assurance" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-green-700">Date début</label>
          <input name="dateDebut" type="date" value={form.dateDebut} onChange={handleChange} required className="input input-bordered w-full bg-white/80 border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg shadow-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-green-700">Numéro attestation</label>
          <input name="numeroAttestation" value={form.numeroAttestation} onChange={handleChange} required className="input input-bordered w-full bg-white/80 border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg shadow-sm" placeholder="N° attestation" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-green-700">Date fin</label>
          <input name="dateFin" type="date" value={form.dateFin} onChange={handleChange} required className="input input-bordered w-full bg-white/80 border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg shadow-sm" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-green-700">Numéro police</label>
          <input name="numeroPolice" value={form.numeroPolice} onChange={handleChange} required className="input input-bordered w-full bg-white/80 border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg shadow-sm" placeholder="N° police" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-green-700">Durée (Jours)</label>
          <input name="duree" type="number" value={form.duree} onChange={handleChange} required className="input input-bordered w-full bg-white/80 border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg shadow-sm" placeholder="Durée en jours" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-green-700">Compagnie d'assurance</label>
          <input name="compagnie" value={form.compagnie} onChange={handleChange} required className="input input-bordered w-full bg-white/80 border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg shadow-sm" placeholder="Compagnie" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-green-700">Intermediaire assurance</label>
          <input name="intermediaire" value={form.intermediaire} onChange={handleChange} required className="input input-bordered w-full bg-white/80 border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg shadow-sm" placeholder="Intermediaire" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-green-700">Frais timbre (DH)</label>
          <input name="fraisTimbre" type="number" value={form.fraisTimbre} onChange={handleChange} required className="input input-bordered w-full bg-white/80 border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg shadow-sm" placeholder="Frais timbre" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-green-700">Frais contrat (DH)</label>
          <input name="fraisContrat" type="number" value={form.fraisContrat} onChange={handleChange} required className="input input-bordered w-full bg-white/80 border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg shadow-sm" placeholder="Frais contrat" />
        </div>
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="block text-sm font-semibold text-green-700">Attachement</label>
          <input name="attachement" value={form.attachement} onChange={handleChange} className="input input-bordered w-full bg-white/80 border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg shadow-sm" placeholder="Lien ou référence du document" />
        </div>
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="block text-sm font-semibold text-green-700">Commentaire</label>
          <textarea name="commentaire" value={form.commentaire} onChange={handleChange} className="textarea textarea-bordered w-full bg-white/80 border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-lg shadow-sm" placeholder="Ajouter un commentaire..." />
        </div>
      </div>
      {error && <div className="text-red-500 text-sm text-center font-semibold">{error}</div>}
      <div className="flex justify-end gap-4 mt-6">
        <button type="button" onClick={() => setForm({ dateAssurance: "", typeAssurance: "", dateDebut: "", numeroAttestation: "", dateFin: "", numeroPolice: "", duree: "", compagnie: "", intermediaire: "", fraisTimbre: "", fraisContrat: "", attachement: "", commentaire: "", vehicle: "" })} className="btn bg-gradient-to-r from-gray-200 to-gray-400 text-gray-700 font-bold px-6 py-2 rounded-lg shadow hover:from-gray-300 hover:to-gray-500 transition">Annuler</button>
        <button type="submit" className="btn bg-gradient-to-r from-green-600 via-green-400 to-green-300 text-white font-bold px-6 py-2 rounded-lg shadow hover:from-green-700 hover:to-green-400 transition" disabled={loading}>{loading ? "Enregistrement..." : "Enregistrer"}</button>
      </div>
    </form>
  );
};

export default AssuranceForm;
