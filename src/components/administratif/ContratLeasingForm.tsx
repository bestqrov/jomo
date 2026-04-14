"use client";
import { useState } from "react";

type ContratLeasingFormProps = {
  onCancel?: () => void;
  onSave?: (data: any) => void;
  initialData?: Record<string, any>;
};

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

export default function ContratLeasingForm({ onCancel, onSave, initialData }: ContratLeasingFormProps) {
  const [form, setForm] = useState(initialData || initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/v1/administratif/contrats-leasing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Erreur lors de l'enregistrement");
      } else {
        setSuccess(true);
        onSave?.(form);
      }
    } catch (e) {
      setError("Erreur serveur");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-3xl shadow-2xl p-8 border-2 border-blue-300 max-w-2xl mx-auto">
      {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">Contrat enregistré avec succès !</div>}
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      <h3 className="text-2xl font-extrabold text-blue-700 mb-6 text-center tracking-wide">Contrat de leasing</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Informations générales */}
        <div>
          <label className="block text-blue-800 font-semibold mb-2">Numéro du contrat <span className="text-red-500">*</span></label>
          <input name="numero" value={form.numero} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label className="block text-blue-800 font-semibold mb-2">Date du contrat <span className="text-red-500">*</span></label>
          <input type="date" name="dateContrat" value={form.dateContrat} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label className="block text-blue-800 font-semibold mb-2">Concessionnaire</label>
          <input name="concessionnaire" value={form.concessionnaire} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label className="block text-blue-800 font-semibold mb-2">Date du 1er prélèvement</label>
          <input type="date" name="datePremierPrelevement" value={form.datePremierPrelevement} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label className="block text-blue-800 font-semibold mb-2">Société de leasing</label>
          <input name="societeLeasing" value={form.societeLeasing} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label className="block text-blue-800 font-semibold mb-2">Date fin du contrat</label>
          <input type="date" name="dateFinContrat" value={form.dateFinContrat} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label className="block text-blue-800 font-semibold mb-2">Durée (Mois)</label>
          <input type="number" name="duree" value={form.duree} onChange={handleChange} min={0} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label className="block text-blue-800 font-semibold mb-2">Date de réception</label>
          <input type="date" name="dateReception" value={form.dateReception} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-blue-800 font-semibold mb-2">Commentaire</label>
          <textarea name="commentaire" value={form.commentaire} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" rows={2} />
        </div>
      </div>
      {/* Coûts */}
      <div className="mb-8">
        <h4 className="text-lg font-bold text-blue-600 mb-4">Coûts</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-blue-800 font-semibold mb-2">Montant contrat HT (DH)</label>
            <input type="number" name="montantContratHT" value={form.montantContratHT} onChange={handleChange} min={0} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-blue-800 font-semibold mb-2">TVA (%)</label>
            <input type="number" name="tva" value={form.tva} onChange={handleChange} min={0} max={100} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-blue-800 font-semibold mb-2">Montant contrat TTC (DH)</label>
            <input type="number" name="montantContratTTC" value={form.montantContratTTC} onChange={handleChange} min={0} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-blue-800 font-semibold mb-2">Montant prélèvement HT (DH)</label>
            <input type="number" name="montantPrelevementHT" value={form.montantPrelevementHT} onChange={handleChange} min={0} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-blue-800 font-semibold mb-2">Montant prélèvement TTC (DH)</label>
            <input type="number" name="montantPrelevementTTC" value={form.montantPrelevementTTC} onChange={handleChange} min={0} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-blue-800 font-semibold mb-2">Montant financé HT (DH)</label>
            <input type="number" name="montantFinanceHT" value={form.montantFinanceHT} onChange={handleChange} min={0} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-blue-800 font-semibold mb-2">Montant financé TTC (DH)</label>
            <input type="number" name="montantFinanceTTC" value={form.montantFinanceTTC} onChange={handleChange} min={0} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-blue-800 font-semibold mb-2">Valeur résiduelle HT (DH)</label>
            <input type="number" name="valeurResiduelleHT" value={form.valeurResiduelleHT} onChange={handleChange} min={0} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-blue-800 font-semibold mb-2">Valeur résiduelle TTC (DH)</label>
            <input type="number" name="valeurResiduelleTTC" value={form.valeurResiduelleTTC} onChange={handleChange} min={0} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-blue-800 font-semibold mb-2">Durée de report (Mois)</label>
            <input type="number" name="dureeReport" value={form.dureeReport} onChange={handleChange} min={0} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>
      </div>
      {/* Avenant */}
      <div className="mb-8">
        <h4 className="text-lg font-bold text-blue-600 mb-4">Avenant</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-blue-800 font-semibold mb-2">Montant prélèvement HT (DH)</label>
            <input type="number" name="avenantMontantPrelevementHT" value={form.avenantMontantPrelevementHT} onChange={handleChange} min={0} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-blue-800 font-semibold mb-2">Montant prélèvement TTC (DH)</label>
            <input type="number" name="avenantMontantPrelevementTTC" value={form.avenantMontantPrelevementTTC} onChange={handleChange} min={0} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-blue-800 font-semibold mb-2">Date début</label>
            <input type="date" name="avenantDateDebut" value={form.avenantDateDebut} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>
          <div>
            <label className="block text-blue-800 font-semibold mb-2">Date fin</label>
            <input type="date" name="avenantDateFin" value={form.avenantDateFin} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-6">
        <button type="submit" className="px-8 py-2 bg-blue-600 text-white rounded-lg font-bold shadow hover:bg-blue-700 transition" disabled={loading}>{loading ? "Enregistrement..." : "Enregistrer"}</button>
        <button type="button" className="px-8 py-2 bg-gray-200 text-blue-700 rounded-lg font-bold shadow hover:bg-gray-300 transition" onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
}
