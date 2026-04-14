"use client";
import React, { useState } from "react";

interface AgrementFormProps {
  onSuccess?: () => void;
}

const AgrementForm: React.FC<AgrementFormProps> = ({ onSuccess }) => {
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
      const res = await fetch("/api/v1/administratif/agrements", {
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
      className="space-y-6 bg-gradient-to-br from-green-100 via-cyan-100 to-purple-100 p-8 rounded-2xl shadow-2xl w-4/5 max-w-3xl mx-auto border-2 border-purple-200 animate-fade-in mt-8"
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)' }}
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight mb-1">
          Agrément
        </h2>
        <p className="text-lg font-semibold text-purple-700">Informations générales</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-purple-700">Numéro</label>
          <input
            name="numero"
            value={form.numero}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white/80 border-green-300 focus:border-purple-400 focus:ring-2 focus:ring-cyan-200 rounded-lg shadow-sm"
            placeholder="N° agrément"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-cyan-700">Date début</label>
          <input
            name="dateDebut"
            type="date"
            value={form.dateDebut}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white/80 border-cyan-300 focus:border-green-400 focus:ring-2 focus:ring-purple-200 rounded-lg shadow-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-purple-700">Date fin</label>
          <input
            name="dateFin"
            type="date"
            value={form.dateFin}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white/80 border-purple-300 focus:border-cyan-400 focus:ring-2 focus:ring-green-200 rounded-lg shadow-sm"
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="block text-sm font-semibold text-green-700">Attachement</label>
          <input
            name="attachement"
            value={form.attachement}
            onChange={handleChange}
            className="input input-bordered w-full bg-white/80 border-green-300 focus:border-purple-400 focus:ring-2 focus:ring-cyan-200 rounded-lg shadow-sm"
            placeholder="Lien ou référence du document"
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="block text-sm font-semibold text-purple-700">Commentaire</label>
          <textarea
            name="commentaire"
            value={form.commentaire}
            onChange={handleChange}
            className="textarea textarea-bordered w-full bg-white/80 border-purple-300 focus:border-green-400 focus:ring-2 focus:ring-purple-200 rounded-lg shadow-sm"
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
          className="btn bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 text-white font-bold px-6 py-2 rounded-lg shadow hover:from-green-500 hover:to-purple-500 transition"
          disabled={loading}
        >
          {loading ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </form>
  );
};

export default AgrementForm;
