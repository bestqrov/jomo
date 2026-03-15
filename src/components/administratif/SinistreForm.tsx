"use client";
import React, { useState } from "react";

interface SinistreFormProps {
  onSuccess?: () => void;
}

const SinistreForm: React.FC<SinistreFormProps> = ({ onSuccess }) => {
  const [form, setForm] = useState({
    circonstances: "",
    vehicule: "",
    infoAdverse: "",
    expert: "",
    temoins: "",
    autres: "",
    date: "",
    dateDeclaration: "",
    typeSinistre: "",
    lieu: "",
    constatRapports: "",
    numeroPV: "",
    datePV: "",
    degatMateriel: false,
    degatCorporel: false,
    degatMortel: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/administratif/sinistres", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          date: form.date ? new Date(form.date) : undefined,
          dateDeclaration: form.dateDeclaration ? new Date(form.dateDeclaration) : undefined,
          datePV: form.datePV ? new Date(form.datePV) : undefined,
        }),
      });
      if (!res.ok) throw new Error("Erreur lors de l'enregistrement");
      setSuccess(true);
      setForm({
        circonstances: "",
        vehicule: "",
        infoAdverse: "",
        expert: "",
        temoins: "",
        autres: "",
        date: "",
        dateDeclaration: "",
        typeSinistre: "",
        lieu: "",
        constatRapports: "",
        numeroPV: "",
        datePV: "",
        degatMateriel: false,
        degatCorporel: false,
        degatMortel: false,
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
      className="max-w-2xl mx-auto bg-gradient-to-br from-blue-100 via-cyan-100 to-indigo-200 p-8 rounded-3xl shadow-2xl border-2 border-blue-300"
    >
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center tracking-wide">Sinistre</h2>
      <div className="mb-4">
        <label className="block text-blue-700 font-semibold mb-1">Circonstances sinistre <span className="text-red-500">*</span></label>
        <textarea
          name="circonstances"
          value={form.circonstances}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white min-h-[60px]"
          required
        />
      </div>
      <div className="mb-4 flex gap-4">
        <div className="flex-1">
          <label className="block text-blue-700 font-semibold mb-1">Véhicule <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="vehicule"
            value={form.vehicule}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-blue-700 font-semibold mb-1">Info adverse</label>
          <input
            type="text"
            name="infoAdverse"
            value={form.infoAdverse}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>
      </div>
      <div className="mb-4 flex gap-4">
        <div className="flex-1">
          <label className="block text-blue-700 font-semibold mb-1">Expert</label>
          <input
            type="text"
            name="expert"
            value={form.expert}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>
        <div className="flex-1">
          <label className="block text-blue-700 font-semibold mb-1">Témoins</label>
          <input
            type="text"
            name="temoins"
            value={form.temoins}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-blue-700 font-semibold mb-1">Autres</label>
        <input
          type="text"
          name="autres"
          value={form.autres}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />
      </div>
      <div className="mb-4 flex gap-4">
        <div className="flex-1">
          <label className="block text-blue-700 font-semibold mb-1">Date <span className="text-red-500">*</span></label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-blue-700 font-semibold mb-1">Date déclaration</label>
          <input
            type="date"
            name="dateDeclaration"
            value={form.dateDeclaration}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>
      </div>
      <div className="mb-4 flex gap-4">
        <div className="flex-1">
          <label className="block text-blue-700 font-semibold mb-1">Type sinistre</label>
          <input
            type="text"
            name="typeSinistre"
            value={form.typeSinistre}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>
        <div className="flex-1">
          <label className="block text-blue-700 font-semibold mb-1">Lieu</label>
          <input
            type="text"
            name="lieu"
            value={form.lieu}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-blue-700 font-semibold mb-1">Constat / Rapports / Autorité PV</label>
        <input
          type="text"
          name="constatRapports"
          value={form.constatRapports}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
        />
      </div>
      <div className="mb-4 flex gap-4">
        <div className="flex-1">
          <label className="block text-blue-700 font-semibold mb-1">Numéro PV</label>
          <input
            type="text"
            name="numeroPV"
            value={form.numeroPV}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>
        <div className="flex-1">
          <label className="block text-blue-700 font-semibold mb-1">Date PV</label>
          <input
            type="date"
            name="datePV"
            value={form.datePV}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          />
        </div>
      </div>
      <div className="mb-4 flex gap-4">
        <div className="flex-1 flex items-center gap-2">
          <input
            type="checkbox"
            name="degatMateriel"
            checked={form.degatMateriel}
            onChange={handleChange}
            className="h-5 w-5 text-blue-600 border-blue-300 rounded"
          />
          <label className="text-blue-700 font-semibold">Dégât matériel</label>
        </div>
        <div className="flex-1 flex items-center gap-2">
          <input
            type="checkbox"
            name="degatCorporel"
            checked={form.degatCorporel}
            onChange={handleChange}
            className="h-5 w-5 text-blue-600 border-blue-300 rounded"
          />
          <label className="text-blue-700 font-semibold">Dégât corporel</label>
        </div>
        <div className="flex-1 flex items-center gap-2">
          <input
            type="checkbox"
            name="degatMortel"
            checked={form.degatMortel}
            onChange={handleChange}
            className="h-5 w-5 text-blue-600 border-blue-300 rounded"
          />
          <label className="text-blue-700 font-semibold">Dégât mortel</label>
        </div>
      </div>
      {error && <div className="mb-2 text-red-600 text-center">{error}</div>}
      {success && <div className="mb-2 text-green-600 text-center">Enregistré avec succès !</div>}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          className="px-6 py-2 rounded-lg bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition"
          onClick={() => setForm({
            circonstances: "",
            vehicule: "",
            infoAdverse: "",
            expert: "",
            temoins: "",
            autres: "",
            date: "",
            dateDeclaration: "",
            typeSinistre: "",
            lieu: "",
            constatRapports: "",
            numeroPV: "",
            datePV: "",
            degatMateriel: false,
            degatCorporel: false,
            degatMortel: false,
          })}
          disabled={loading}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-blue-500 text-white font-bold hover:bg-blue-600 transition shadow-lg"
          disabled={loading}
        >
          {loading ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </form>
  );
};

export default SinistreForm;
