"use client";
import React, { useState } from "react";

interface PermisCirculationFormProps {
  onSuccess?: () => void;
}

const PermisCirculationForm: React.FC<PermisCirculationFormProps> = ({ onSuccess }) => {
  const [form, setForm] = useState({
    numero: "",
    montantHT: "",
    dateDebut: "",
    tva: "",
    dateFin: "",
    montantTTC: "",
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
      const res = await fetch("/api/administratif/permis-circulations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          montantHT: parseFloat(form.montantHT),
          tva: parseFloat(form.tva),
          montantTTC: parseFloat(form.montantTTC),
        }),
      });
      if (!res.ok) throw new Error("Erreur lors de l'enregistrement");
      setForm({ numero: "", montantHT: "", dateDebut: "", tva: "", dateFin: "", montantTTC: "", attachement: "", commentaire: "", vehicle: "" });
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
      className="space-y-6 bg-gradient-to-br from-orange-100 via-red-100 to-indigo-100 p-8 rounded-2xl shadow-2xl w-4/5 max-w-3xl mx-auto border-2 border-indigo-200 animate-fade-in mt-8"
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)' }}
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-orange-400 via-red-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight mb-1">
          Permis de circulation
        </h2>
        <p className="text-lg font-semibold text-indigo-700">Informations générales</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-indigo-700">Numéro</label>
          <input
            name="numero"
            value={form.numero}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white/80 border-orange-300 focus:border-indigo-400 focus:ring-2 focus:ring-red-200 rounded-lg shadow-sm"
            placeholder="N° permis"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-red-700">Montant HT (DH)</label>
          <input
            name="montantHT"
            type="number"
            value={form.montantHT}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white/80 border-red-300 focus:border-orange-400 focus:ring-2 focus:ring-indigo-200 rounded-lg shadow-sm"
            placeholder="Montant hors taxe"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-orange-700">Date début</label>
          <input
            name="dateDebut"
            type="date"
            value={form.dateDebut}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white/80 border-orange-300 focus:border-red-400 focus:ring-2 focus:ring-indigo-200 rounded-lg shadow-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-indigo-700">TVA (%)</label>
          <input
            name="tva"
            type="number"
            value={form.tva}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white/80 border-indigo-300 focus:border-orange-400 focus:ring-2 focus:ring-red-200 rounded-lg shadow-sm"
            placeholder="TVA en %"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-red-700">Date fin</label>
          <input
            name="dateFin"
            type="date"
            value={form.dateFin}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white/80 border-red-300 focus:border-indigo-400 focus:ring-2 focus:ring-orange-200 rounded-lg shadow-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-indigo-700">Montant TTC (DH)</label>
          <input
            name="montantTTC"
            type="number"
            value={form.montantTTC}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white/80 border-indigo-300 focus:border-red-400 focus:ring-2 focus:ring-orange-200 rounded-lg shadow-sm"
            placeholder="Montant toutes taxes comprises"
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="block text-sm font-semibold text-orange-700">Attachement</label>
          <input
            name="attachement"
            value={form.attachement}
            onChange={handleChange}
            className="input input-bordered w-full bg-white/80 border-orange-300 focus:border-indigo-400 focus:ring-2 focus:ring-red-200 rounded-lg shadow-sm"
            placeholder="Lien ou référence du document"
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="block text-sm font-semibold text-indigo-700">Commentaire</label>
          <textarea
            name="commentaire"
            value={form.commentaire}
            onChange={handleChange}
            className="textarea textarea-bordered w-full bg-white/80 border-indigo-300 focus:border-orange-400 focus:ring-2 focus:ring-indigo-200 rounded-lg shadow-sm"
            placeholder="Ajouter un commentaire..."
          />
        </div>
      </div>
      {error && <div className="text-red-500 text-sm text-center font-semibold">{error}</div>}
      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={() => setForm({ numero: "", montantHT: "", dateDebut: "", tva: "", dateFin: "", montantTTC: "", attachement: "", commentaire: "", vehicle: "" })}
          className="btn bg-gradient-to-r from-gray-200 to-gray-400 text-gray-700 font-bold px-6 py-2 rounded-lg shadow hover:from-gray-300 hover:to-gray-500 transition"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="btn bg-gradient-to-r from-orange-400 via-red-400 to-indigo-400 text-white font-bold px-6 py-2 rounded-lg shadow hover:from-orange-500 hover:to-indigo-500 transition"
          disabled={loading}
        >
          {loading ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </form>
  );
};

export default PermisCirculationForm;
