"use client";
import { useState } from "react";

const initialState = {
  vehicule: "",
  identificationFournisseur: "",
  numeroContrat: "",
  typeContrat: "",
  commentaire: "",
  dateDebut: "",
  dateFinPrevue: "",
  dateFinReelle: "",
  montantFranchise: "",
  dureePrevue: "",
  dureeReelle: "",
  loyerMensuelHT: "",
  tva: "",
  loyerMensuelTTC: "",
  prixKmSupp: "",
  kilometrageDebut: "",
  kilometrageFin: "",
  kilometrageParcouru: "",
  carburantDebut: "",
  carburantFin: "",
  carburantConsomme: "",
  plafondKilometrique: "",
  plafondPneumatique: "",
};

export default function LocationForm({ onCancel, onSave = () => {}, initialData = null }) {
  const [form, setForm] = useState(initialData || initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onSave?.(form);
      setLoading(false);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-transparent max-w-2xl mx-auto">
      <h3 className="text-lg font-bold text-blue-700 mb-4 text-center tracking-wide">Contrat de location</h3>
      {/* Section 1: Identification */}
      <div className="bg-white rounded-xl shadow p-4 border border-blue-200 mb-4">
        <h4 className="text-base font-bold text-blue-600 mb-2">Identification</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Véhicule</label>
            <input name="vehicule" value={form.vehicule} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Identification Fournisseur</label>
            <input name="identificationFournisseur" value={form.identificationFournisseur} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Numéro contrat</label>
            <input name="numeroContrat" value={form.numeroContrat} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Type contrat</label>
            <input name="typeContrat" value={form.typeContrat} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-blue-800 text-xs font-semibold mb-1">Commentaire</label>
            <textarea name="commentaire" value={form.commentaire} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" rows={2} />
          </div>
        </div>
      </div>
      {/* Section 2: Informations générales */}
      <div className="bg-white rounded-xl shadow p-4 border border-blue-200 mb-4">
        <h4 className="text-base font-bold text-blue-600 mb-2">Informations générales</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Date début</label>
            <input type="date" name="dateDebut" value={form.dateDebut} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Date fin prévue</label>
            <input type="date" name="dateFinPrevue" value={form.dateFinPrevue} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Date fin réelle</label>
            <input type="date" name="dateFinReelle" value={form.dateFinReelle} onChange={handleChange} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Montant de franchise (DH)</label>
            <input type="number" name="montantFranchise" value={form.montantFranchise} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Durée prévue (Mois)</label>
            <input type="number" name="dureePrevue" value={form.dureePrevue} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Durée réelle (Mois)</label>
            <input type="number" name="dureeReelle" value={form.dureeReelle} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Loyer mensuel HT (DH)</label>
            <input type="number" name="loyerMensuelHT" value={form.loyerMensuelHT} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">TVA (%)</label>
            <input type="number" name="tva" value={form.tva} onChange={handleChange} min={0} max={100} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Loyer mensuel TTC (DH)</label>
            <input type="number" name="loyerMensuelTTC" value={form.loyerMensuelTTC} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Prix km supp (DH)</label>
            <input type="number" name="prixKmSupp" value={form.prixKmSupp} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
        </div>
      </div>
      {/* Section 3: Kilométrage & Carburant */}
      <div className="bg-white rounded-xl shadow p-4 border border-blue-200 mb-4">
        <h4 className="text-base font-bold text-blue-600 mb-2">Kilométrage & Carburant</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Kilométrage début (Km)</label>
            <input type="number" name="kilometrageDebut" value={form.kilometrageDebut} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Kilométrage fin (Km)</label>
            <input type="number" name="kilometrageFin" value={form.kilometrageFin} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Kilométrage parcouru (Km)</label>
            <input type="number" name="kilometrageParcouru" value={form.kilometrageParcouru} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Carburant début (%)</label>
            <input type="number" name="carburantDebut" value={form.carburantDebut} onChange={handleChange} min={0} max={100} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Carburant fin (%)</label>
            <input type="number" name="carburantFin" value={form.carburantFin} onChange={handleChange} min={0} max={100} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Carburant consommé (%)</label>
            <input type="number" name="carburantConsomme" value={form.carburantConsomme} onChange={handleChange} min={0} max={100} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Plafond kilométrique (Km)</label>
            <input type="number" name="plafondKilometrique" value={form.plafondKilometrique} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
          <div>
            <label className="block text-blue-800 text-xs font-semibold mb-1">Plafond pneumatique (Km)</label>
            <input type="number" name="plafondPneumatique" value={form.plafondPneumatique} onChange={handleChange} min={0} className="w-full px-2 py-1 border rounded focus:ring-2 focus:ring-blue-300 text-sm" />
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-2">
        <button type="submit" className="px-6 py-1.5 bg-blue-600 text-white rounded-md font-bold shadow hover:bg-blue-700 transition text-sm" disabled={loading}>{loading ? "Enregistrement..." : "Enregistrer"}</button>
        <button type="button" className="px-6 py-1.5 bg-gray-200 text-blue-700 rounded-md font-bold shadow hover:bg-gray-300 transition text-sm" onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
}
