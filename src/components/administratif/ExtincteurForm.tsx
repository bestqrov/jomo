"use client";
import React, { useState } from "react";

interface ExtincteurFormProps {
  onSuccess?: () => void;
}

const ExtincteurForm: React.FC<ExtincteurFormProps> = ({ onSuccess }) => {
  const [form, setForm] = useState({
    numeroVolume: "",
    kg: "",
    dateAchat: "",
    fournisseur: "",
    attachement: "",
    commentaire: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, attachement: e.target.files[0].name }); // Placeholder, handle upload as needed
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/v1/administratif/extincteurs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          kg: Number(form.kg),
          dateAchat: form.dateAchat ? new Date(form.dateAchat) : undefined,
        }),
      });
      if (!res.ok) throw new Error("Erreur lors de l'enregistrement");
      setSuccess(true);
      setForm({
        numeroVolume: "",
        kg: "",
        dateAchat: "",
        fournisseur: "",
        attachement: "",
        commentaire: "",
      });
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
      className="max-w-lg mx-auto bg-gradient-to-br from-orange-100 via-yellow-100 to-pink-200 p-8 rounded-3xl shadow-2xl border-2 border-orange-300"
    >
      <h2 className="text-2xl font-bold mb-6 text-orange-700 text-center tracking-wide">Extincteur</h2>
      <div className="mb-4">
        <label className="block text-orange-700 font-semibold mb-1">Numéro Volume <span className="text-red-500">*</span></label>
        <input
          type="text"
          name="numeroVolume"
          value={form.numeroVolume}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border-2 border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
          required
        />
      </div>
      <div className="mb-4 flex gap-4">
        <div className="flex-1">
          <label className="block text-orange-700 font-semibold mb-1">KG <span className="text-red-500">*</span></label>
          <input
            type="number"
            name="kg"
            value={form.kg}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border-2 border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            required
            min="0"
            step="0.1"
          />
        </div>
        <div className="flex-1">
          <label className="block text-orange-700 font-semibold mb-1">Date d'achat <span className="text-red-500">*</span></label>
          <input
            type="date"
            name="dateAchat"
            value={form.dateAchat}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border-2 border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-orange-700 font-semibold mb-1">Fournisseur <span className="text-red-500">*</span></label>
        <input
          type="text"
          name="fournisseur"
          value={form.fournisseur}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border-2 border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-orange-700 font-semibold mb-1">Attachement</label>
        <input
          type="file"
          name="attachement"
          onChange={handleFileChange}
          className="w-full px-4 py-2 rounded-lg border-2 border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
        />
      </div>
      <div className="mb-4">
        <label className="block text-orange-700 font-semibold mb-1">Commentaire</label>
        <textarea
          name="commentaire"
          value={form.commentaire}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border-2 border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white min-h-[60px]"
        />
      </div>
      {error && <div className="mb-2 text-red-600 text-center">{error}</div>}
      {success && <div className="mb-2 text-green-600 text-center">Enregistré avec succès !</div>}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          className="px-6 py-2 rounded-lg bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition"
          onClick={() => setForm({
            numeroVolume: "",
            kg: "",
            dateAchat: "",
            fournisseur: "",
            attachement: "",
            commentaire: "",
          })}
          disabled={loading}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-orange-500 text-white font-bold hover:bg-orange-600 transition shadow-lg"
          disabled={loading}
        >
          {loading ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </form>
  );
};

export default ExtincteurForm;
