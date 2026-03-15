"use client";
import React, { useState } from "react";

interface TaxeFormProps {
  onSuccess?: () => void;
}

const TaxeForm: React.FC<TaxeFormProps> = ({ onSuccess }) => {
  const [form, setForm] = useState({
    numero: "",
    montant: "",
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
      const res = await fetch("/api/administratif/taxes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          montant: parseFloat(form.montant),
        }),
      });
      if (!res.ok) throw new Error("Erreur lors de l'enregistrement");
      setForm({ numero: "", montant: "", dateDebut: "", dateFin: "", attachement: "", commentaire: "", vehicle: "" });
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
      className="space-y-6 bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 p-8 rounded-2xl shadow-2xl max-w-xl mx-auto border-2 border-blue-200 animate-fade-in"
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)' }}
    >
      <h2 className="text-2xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg text-center tracking-wide">
        Formulaire Taxe Véhicule
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-blue-700">Numéro</label>
          <input
            name="numero"
            value={form.numero}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white/80 border-yellow-300 focus:border-pink-400 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm"
            placeholder="N° taxe"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-pink-700">Montant (DH)</label>
          <input
            name="montant"
            type="number"
            value={form.montant}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white/80 border-pink-300 focus:border-yellow-400 focus:ring-2 focus:ring-pink-200 rounded-lg shadow-sm"
            placeholder="Montant en dirhams"
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
            className="input input-bordered w-full bg-white/80 border-blue-300 focus:border-yellow-400 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-sm font-semibold text-pink-700">Date fin</label>
          <input
            name="dateFin"
            type="date"
            value={form.dateFin}
            onChange={handleChange}
            required
            className="input input-bordered w-full bg-white/80 border-pink-300 focus:border-yellow-400 focus:ring-2 focus:ring-pink-200 rounded-lg shadow-sm"
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="block text-sm font-semibold text-blue-700">Attachement</label>
          <input
            name="attachement"
            value={form.attachement}
            onChange={handleChange}
            className="input input-bordered w-full bg-white/80 border-blue-300 focus:border-pink-400 focus:ring-2 focus:ring-blue-200 rounded-lg shadow-sm"
            placeholder="Lien ou référence du document"
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="block text-sm font-semibold text-pink-700">Commentaire</label>
          <textarea
            name="commentaire"
            value={form.commentaire}
            onChange={handleChange}
            className="textarea textarea-bordered w-full bg-white/80 border-pink-300 focus:border-yellow-400 focus:ring-2 focus:ring-pink-200 rounded-lg shadow-sm"
            placeholder="Ajouter un commentaire..."
          />
        </div>
      </div>
      {error && <div className="text-red-500 text-sm text-center font-semibold">{error}</div>}
      <div className="flex justify-end gap-4 mt-6">
        <button
          type="button"
          onClick={() => setForm({ numero: "", montant: "", dateDebut: "", dateFin: "", attachement: "", commentaire: "", vehicle: "" })}
          className="btn bg-gradient-to-r from-gray-200 to-gray-400 text-gray-700 font-bold px-6 py-2 rounded-lg shadow hover:from-gray-300 hover:to-gray-500 transition"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="btn bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 text-white font-bold px-6 py-2 rounded-lg shadow hover:from-yellow-500 hover:to-blue-500 transition"
          disabled={loading}
        >
          {loading ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </form>
  );
};

export default TaxeForm;
