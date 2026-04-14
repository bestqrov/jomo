"use client";
import React, { useState } from "react";

interface AutorisationCirculationFormProps {
  onSuccess?: () => void;
}

const AutorisationCirculationForm: React.FC<AutorisationCirculationFormProps> = ({ onSuccess }) => {
  const [form, setForm] = useState({
    numero: "",
    dateDebut: "",
    dateFin: "",
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
      const res = await fetch("/api/v1/administratif/autorisation-circulation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur lors de l'enregistrement");
      setForm({ numero: "", dateDebut: "", dateFin: "", attachement: "", commentaire: "", vehicle: "" });
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
      className="space-y-6 bg-gradient-to-br from-fuchsia-100 via-blue-100 to-lime-100 p-8 rounded-2xl shadow-2xl w-4/5 max-w-3xl mx-auto border-2 border-fuchsia-200 animate-fade-in mt-8"
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)' }}
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-fuchsia-400 via-blue-400 to-lime-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight mb-1">
          Autorisation de circulation
        </h2>
        <p className="text-lg font-semibold text-fuchsia-700">Informations générales</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-fuchsia-700">Numéro</label>
          <input
            name="numero"
            value={form.numero}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white/80 border-fuchsia-300 focus:border-blue-400 focus:ring-2 focus:ring-lime-200 rounded-lg shadow-sm"
            placeholder="N° autorisation"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-blue-700">Date début</label>
          <input
            name="dateDebut"
            type="date"
            value={form.dateDebut}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white/80 border-blue-300 focus:border-fuchsia-400 focus:ring-2 focus:ring-lime-200 rounded-lg shadow-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-lime-700">Date fin</label>
          <input
            name="dateFin"
            type="date"
            value={form.dateFin}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white/80 border-lime-300 focus:border-fuchsia-400 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm"
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="block text-sm font-semibold text-blue-700">Attachement</label>
          <input
            name="attachement"
            value={form.attachement}
            onChange={handleChange}
            className="input input-bordered w-full bg-white/80 border-blue-300 focus:border-fuchsia-400 focus:ring-2 focus:ring-lime-200 rounded-lg shadow-sm"
            placeholder="Lien ou référence du document"
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="block text-sm font-semibold text-fuchsia-700">Commentaire</label>
          <textarea
            name="commentaire"
            value={form.commentaire}
            onChange={handleChange}
            className="textarea textarea-bordered w-full bg-white/80 border-fuchsia-300 focus:border-blue-400 focus:ring-2 focus:ring-lime-200 rounded-lg shadow-sm"
            placeholder="Ajouter un commentaire..."
          />
        </div>
      </div>
      {error && <div className="text-red-500 text-sm text-center font-semibold">{error}</div>}
      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={() => setForm({ numero: "", dateDebut: "", dateFin: "", attachement: "", commentaire: "", vehicle: "" })}
          className="btn bg-gradient-to-r from-gray-200 to-gray-400 text-gray-700 font-bold px-6 py-2 rounded-lg shadow hover:from-gray-300 hover:to-gray-500 transition"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="btn bg-gradient-to-r from-fuchsia-400 via-blue-400 to-lime-400 text-white font-bold px-6 py-2 rounded-lg shadow hover:from-fuchsia-500 hover:to-lime-500 transition"
          disabled={loading}
        >
          {loading ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </form>
  );
};

export default AutorisationCirculationForm;
