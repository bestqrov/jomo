"use client";
import { useState } from "react";
import axios from "axios";

const initial = { name: "", email: "", password: "", role: "ADMIN", agencyId: "" };

export default function UserCreateForm({ onSaved }) {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const validateField = (name, value) => {
    if (name === "name" && !value.trim()) return "Nom requis";
    if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email invalide";
    if (name === "password" && value.length < 6) return "Mot de passe minimum 6 caractères";
    if (name === "agencyId" && !value.trim()) return "Agency ID requis";
    return "";
  };

  const validateForm = () => {
    const errors = {};
    for (const [k, v] of Object.entries(form)) {
      const err = validateField(k, v);
      if (err) errors[k] = err;
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setFieldErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const errors = validateForm();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setError("Corrigez les erreurs avant de continuer.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/v1/users", form);
      if (res.data?.success) {
        setSuccess("Utilisateur ajouté avec succès");
        setForm(initial);
        onSaved?.();
      } else {
        setError(res.data?.error || "Erreur serveur");
      }
    } catch (err) {
      setError(err?.response?.data?.error || err.message || "Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-5 shadow">
      <h3 className="text-lg font-bold">Ajouter un utilisateur</h3>
      {error && <div className="rounded bg-red-100 px-3 py-2 text-red-700">{error}</div>}
      {success && <div className="rounded bg-green-100 px-3 py-2 text-green-700">{success}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: "name", label: "Nom" },
          { key: "email", label: "Email" },
          { key: "password", label: "Mot de passe", type: "password" },
          { key: "agencyId", label: "Agency ID" },
        ].map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-slate-700">{field.label}</label>
            <input
              name={field.key}
              type={field.type || "text"}
              value={form[field.key]}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            {fieldErrors[field.key] && <p className="mt-1 text-xs text-red-600">{fieldErrors[field.key]}</p>}
          </div>
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Rôle</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        >
          <option value="ADMIN">ADMIN</option>
          <option value="SECRETARY">SECRETARY</option>
          <option value="DRIVER">DRIVER</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Enregistrement..." : "Ajouter l'utilisateur"}
      </button>
    </form>
  );
}
