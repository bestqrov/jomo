"use client";
import { useState } from "react";
import { useVehicles } from "@/hooks/useVehicles";

const initialState = {
  numeroFournisseur: "",
  numeroFactureFournisseur: "",
  dateFlotte: "",
  vehicule: "",
  modePaiement: "",
  attachementDevise: "DH",
  montantHT: "",
  tva: "",
  montantTTC: "",
  commentaire: "",
  pieces: [
    { nom: "", unite: "", quantite: "", prixUnitaire: "", remise: "", montantHT: "", tva: "", montantTTC: "" }
  ]
};

const deviseOptions = ["DH", "EUR", "USD"];
const modePaiementOptions = ["Espèces", "Chèque", "Virement", "Carte bancaire", "Autre"];

export default function FactureAvoirForm({ onCancel, onSave, initialData }) {
  const [form, setForm] = useState(initialData || initialState);
  const { data, isLoading: loadingVehicles } = useVehicles();
  const vehicles = data?.vehicles || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePieceChange = (idx, e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const pieces = [...prev.pieces];
      pieces[idx][name] = value;
      return { ...prev, pieces };
    });
  };

  const addPiece = () => {
    setForm((prev) => ({
      ...prev,
      pieces: [
        ...prev.pieces,
        { nom: "", unite: "", quantite: "", prixUnitaire: "", remise: "", montantHT: "", tva: "", montantTTC: "" }
      ]
    }));
  };

  const removePiece = (idx) => {
    setForm((prev) => {
      const pieces = prev.pieces.filter((_, i) => i !== idx);
      return { ...prev, pieces };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Numéro Fournisseur</label>
          <input name="numeroFournisseur" value={form.numeroFournisseur} onChange={handleChange} className="input" required />
        </div>
        <div>
          <label>N° Facture fournisseur</label>
          <input name="numeroFactureFournisseur" value={form.numeroFactureFournisseur} onChange={handleChange} className="input" required />
        </div>
        <div>
          <label>Date flotte</label>
          <input type="date" name="dateFlotte" value={form.dateFlotte} onChange={handleChange} className="input" required />
        </div>
        <div>
          <label>Véhicule</label>
          <select name="vehicule" value={form.vehicule} onChange={handleChange} className="input" required>
            <option value="">Sélectionner</option>
            {vehicles.map((v) => (
              <option key={v._id} value={v._id}>{v.immatriculation}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Mode de paiement</label>
          <select name="modePaiement" value={form.modePaiement} onChange={handleChange} className="input" required>
            <option value="">Sélectionner</option>
            {modePaiementOptions.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Devise</label>
          <select name="attachementDevise" value={form.attachementDevise} onChange={handleChange} className="input">
            {deviseOptions.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Montant HT</label>
          <input name="montantHT" value={form.montantHT} onChange={handleChange} className="input" required />
        </div>
        <div>
          <label>TVA %</label>
          <input name="tva" value={form.tva} onChange={handleChange} className="input" required />
        </div>
        <div>
          <label>Montant TTC</label>
          <input name="montantTTC" value={form.montantTTC} onChange={handleChange} className="input" required />
        </div>
      </div>
      <div>
        <label>Commentaire</label>
        <textarea name="commentaire" value={form.commentaire} onChange={handleChange} className="input" />
      </div>
      <div>
        <label>Pièces</label>
        <table className="min-w-full border mt-2">
          <thead>
            <tr>
              <th>Pièce *</th>
              <th>Unité</th>
              <th>Quantité *</th>
              <th>Prix unitaire</th>
              <th>Remise %</th>
              <th>Montant HT</th>
              <th>TVA</th>
              <th>Montant TTC*</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {form.pieces.map((piece, idx) => (
              <tr key={idx}>
                <td><input name="nom" value={piece.nom} onChange={e => handlePieceChange(idx, e)} className="input" required /></td>
                <td><input name="unite" value={piece.unite} onChange={e => handlePieceChange(idx, e)} className="input" /></td>
                <td><input name="quantite" value={piece.quantite} onChange={e => handlePieceChange(idx, e)} className="input" required /></td>
                <td><input name="prixUnitaire" value={piece.prixUnitaire} onChange={e => handlePieceChange(idx, e)} className="input" /></td>
                <td><input name="remise" value={piece.remise} onChange={e => handlePieceChange(idx, e)} className="input" /></td>
                <td><input name="montantHT" value={piece.montantHT} onChange={e => handlePieceChange(idx, e)} className="input" /></td>
                <td><input name="tva" value={piece.tva} onChange={e => handlePieceChange(idx, e)} className="input" /></td>
                <td><input name="montantTTC" value={piece.montantTTC} onChange={e => handlePieceChange(idx, e)} className="input" required /></td>
                <td><button type="button" onClick={() => removePiece(idx)} className="text-red-500">Annuler</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={addPiece} className="mt-2 btn">Ajouter une pièce</button>
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="btn btn-secondary">Annuler</button>
        <button type="submit" className="btn btn-primary">Enregistrer</button>
      </div>
    </form>
  );
}
