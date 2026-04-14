"use client";
import { useState } from "react";
import { useVehicles } from "@/hooks/useVehicles";

const initialState = {
  designation: "",
  reference: "",
  bonCommande: "",
  date: "",
  dateEcheance: "",
  client: "",
  vehicule: "",
  commentaire: "",
  montant: "",
  montantHT: "",
  tva: "",
  montantTTC: "",
  devise: "DH",
  modePaiement: "",
};

const deviseOptions = ["DH", "EUR", "USD"];
const modePaiementOptions = ["Espèces", "Chèque", "Virement", "Carte bancaire", "Autre"];

interface FactureFormProps {
  onCancel: () => void;
  onSave?: (data: any) => void;
  initialData?: typeof initialState;
}

export default function FactureForm({ onCancel, onSave, initialData }: FactureFormProps) {
  const [form, setForm] = useState(initialData || initialState);
  const [loading, setLoading] = useState(false);
  const { data, isLoading: loadingVehicles } = useVehicles();
  const vehicles = data?.vehicles || [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onSave?.(form);
      setLoading(false);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-transparent max-w-3xl mx-auto">
      <h3 className="text-xl font-bold text-indigo-700 mb-4 text-center tracking-wide">Nouvelle Facture</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl shadow p-4 border border-indigo-200 flex flex-col gap-3">
          <h4 className="text-base font-bold text-indigo-600 mb-2">Informations principales</h4>
          <label className="text-xs font-semibold text-gray-600">Désignation de la facture *</label>
          <input name="designation" value={form.designation} onChange={handleChange} placeholder="Ex: Réparation moteur" className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-indigo-300 text-sm" required />

          <label className="text-xs font-semibold text-gray-600">Référence interne</label>
          <input name="reference" value={form.reference} onChange={handleChange} placeholder="Ex: REF-2026-001" className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-indigo-300 text-sm" />

          <label className="text-xs font-semibold text-gray-600">Numéro du bon de commande</label>
          <input name="bonCommande" value={form.bonCommande} onChange={handleChange} placeholder="Ex: BC-2026-001" className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-indigo-300 text-sm" />

          <label className="text-xs font-semibold text-gray-600">Date de la facture *</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} placeholder="Date" className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-indigo-300 text-sm" required />

          <label className="text-xs font-semibold text-gray-600">Date d'échéance</label>
          <input type="date" name="dateEcheance" value={form.dateEcheance} onChange={handleChange} placeholder="Date d'échéance" className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-indigo-300 text-sm" />

          <label className="text-xs font-semibold text-gray-600">Nom du client *</label>
          <input name="client" value={form.client} onChange={handleChange} placeholder="Ex: Société X" className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-indigo-300 text-sm" required />

          <label className="text-xs font-semibold text-gray-600">Véhicule concerné *</label>
          <select name="vehicule" value={form.vehicule} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-indigo-300 text-sm" required disabled={loadingVehicles}>
            <option value="">{loadingVehicles ? "Chargement..." : "Sélectionner un véhicule"}</option>
            {vehicles.map((v) => (
              <option key={v._id || v.id} value={v._id || v.id}>
                {`${v.brand ? v.brand + ' ' : ''}${v.model ? v.model + ' - ' : ''}${v.registrationNumber || v.plateNumber || v.name || v._id || v.id}`}
              </option>
            ))}
          </select>
        </div>
        <div className="bg-white rounded-xl shadow p-4 border border-indigo-200 flex flex-col gap-3">
          <h4 className="text-base font-bold text-indigo-600 mb-2">Montants & paiement</h4>
          <label className="text-xs font-semibold text-gray-600">Montant TTC</label>
          <input name="montant" value={form.montant} onChange={handleChange} placeholder="Montant total à payer" type="number" min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-indigo-300 text-sm" />

          <label className="text-xs font-semibold text-gray-600">Montant HT</label>
          <input name="montantHT" value={form.montantHT} onChange={handleChange} placeholder="Montant hors taxes" type="number" min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-indigo-300 text-sm" />

          <label className="text-xs font-semibold text-gray-600">TVA (%)</label>
          <input name="tva" value={form.tva} onChange={handleChange} placeholder="Taux de TVA" type="number" min={0} max={100} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-indigo-300 text-sm" />

          <label className="text-xs font-semibold text-gray-600">Montant TTC calculé</label>
          <input name="montantTTC" value={form.montantTTC} onChange={handleChange} placeholder="Montant TTC" type="number" min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-indigo-300 text-sm" />

          <label className="text-xs font-semibold text-gray-600">Devise</label>
          <select name="devise" value={form.devise} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-indigo-300 text-sm">
            {deviseOptions.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>

          <label className="text-xs font-semibold text-gray-600">Mode de paiement</label>
          <select name="modePaiement" value={form.modePaiement} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-indigo-300 text-sm">
            <option value="">Mode de paiement</option>
            {modePaiementOptions.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-4 border border-indigo-200 mb-4">
        <h4 className="text-base font-bold text-indigo-600 mb-2">Commentaire</h4>
        <label className="text-xs font-semibold text-gray-600">Commentaire ou note interne</label>
        <textarea name="commentaire" value={form.commentaire} onChange={handleChange} placeholder="Ex: Facture réglée partiellement, à relancer le client..." className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-indigo-300 text-sm" rows={2} />
      </div>
      <div className="flex justify-center gap-3 mt-2">
        <button type="submit" className="px-6 py-1.5 bg-indigo-600 text-white rounded-md font-bold shadow hover:bg-indigo-700 transition text-sm" disabled={loading}>{loading ? "Enregistrement..." : "Enregistrer"}</button>
        <button type="button" className="px-6 py-1.5 bg-gray-200 text-indigo-700 rounded-md font-bold shadow hover:bg-gray-300 transition text-sm" onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
}
