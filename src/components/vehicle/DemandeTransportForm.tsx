"use client";
import { useState } from "react";
import { useVehicles } from "@/hooks/useVehicles";

const initialState = {
  numeroAtlasVoyage: "",
  numeroDossier: "",
  client: "",
  typeTrajet: "",
  trajet: "",
  specifications: [
    { nom: "", montantHT: "" }
  ],
  details: [
    { dateDebut: "", dateFin: "", dateMiseEnPlace: "", lieuMiseEnPlace: "", flotte: "", typeVehicule: "", prix: "", prixAchat: "", ecart: "", chargeCompte: "", pax: "", numeroVol: "", dateVol: "", ville: "", nomsTouristes: "" }
  ]
};

export default function DemandeTransportForm({ onCancel, onSave, initialData }) {
  const [form, setForm] = useState(initialData || initialState);
  const { data, isLoading: loadingVehicles } = useVehicles();
  const vehicles = data?.vehicles || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecChange = (idx, e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const specifications = [...prev.specifications];
      specifications[idx][name] = value;
      return { ...prev, specifications };
    });
  };

  const addSpec = () => {
    setForm((prev) => ({
      ...prev,
      specifications: [
        ...prev.specifications,
        { nom: "", montantHT: "" }
      ]
    }));
  };

  const removeSpec = (idx) => {
    setForm((prev) => {
      const specifications = prev.specifications.filter((_, i) => i !== idx);
      return { ...prev, specifications };
    });
  };

  const handleDetailChange = (idx, e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const details = [...prev.details];
      details[idx][name] = value;
      return { ...prev, details };
    });
  };

  const addDetail = () => {
    setForm((prev) => ({
      ...prev,
      details: [
        ...prev.details,
        { dateDebut: "", dateFin: "", dateMiseEnPlace: "", lieuMiseEnPlace: "", flotte: "", typeVehicule: "", prix: "", prixAchat: "", ecart: "", chargeCompte: "", pax: "", numeroVol: "", dateVol: "", ville: "", nomsTouristes: "" }
      ]
    }));
  };

  const removeDetail = (idx) => {
    setForm((prev) => {
      const details = prev.details.filter((_, i) => i !== idx);
      return { ...prev, details };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-bold">Demande transport</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label>Numéro Atlas Voyage</label>
          <input name="numeroAtlasVoyage" value={form.numeroAtlasVoyage} onChange={handleChange} className="input" required />
        </div>
        <div>
          <label>N° dossier</label>
          <input name="numeroDossier" value={form.numeroDossier} onChange={handleChange} className="input" required />
        </div>
        <div>
          <label>Client</label>
          <input name="client" value={form.client} onChange={handleChange} className="input" required />
        </div>
        <div>
          <label>Type trajet</label>
          <input name="typeTrajet" value={form.typeTrajet} onChange={handleChange} className="input" required />
        </div>
        <div>
          <label>Trajet</label>
          <input name="trajet" value={form.trajet} onChange={handleChange} className="input" required />
        </div>
      </div>
      <div>
        <label>Spécifications</label>
        <table className="min-w-full border mt-2">
          <thead>
            <tr>
              <th>Spécification</th>
              <th>Montant HT</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {form.specifications.map((spec, idx) => (
              <tr key={idx}>
                <td><input name="nom" value={spec.nom} onChange={e => handleSpecChange(idx, e)} className="input" required /></td>
                <td><input name="montantHT" value={spec.montantHT} onChange={e => handleSpecChange(idx, e)} className="input" required /></td>
                <td><button type="button" onClick={() => removeSpec(idx)} className="text-red-500">Annuler</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={addSpec} className="mt-2 btn">Ajouter une spécification</button>
      </div>
      <div>
        <label>Détails</label>
        <table className="min-w-full border mt-2">
          <thead>
            <tr>
              <th>Date début</th>
              <th>Date fin</th>
              <th>Date mise en place</th>
              <th>Lieu mise en place</th>
              <th>Flotte</th>
              <th>Type véhicule</th>
              <th>Prix (DH)</th>
              <th>Prix d'achat (DH)</th>
              <th>Ecart (DH)</th>
              <th>Chargé compte</th>
              <th>PAX</th>
              <th>Numéro de vol</th>
              <th>Date de vol</th>
              <th>Ville</th>
              <th>Noms des touristes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {form.details.map((detail, idx) => (
              <tr key={idx}>
                <td><input type="date" name="dateDebut" value={detail.dateDebut} onChange={e => handleDetailChange(idx, e)} className="input" required /></td>
                <td><input type="date" name="dateFin" value={detail.dateFin} onChange={e => handleDetailChange(idx, e)} className="input" required /></td>
                <td><input type="date" name="dateMiseEnPlace" value={detail.dateMiseEnPlace} onChange={e => handleDetailChange(idx, e)} className="input" /></td>
                <td><input name="lieuMiseEnPlace" value={detail.lieuMiseEnPlace} onChange={e => handleDetailChange(idx, e)} className="input" /></td>
                <td><input name="flotte" value={detail.flotte} onChange={e => handleDetailChange(idx, e)} className="input" /></td>
                <td><input name="typeVehicule" value={detail.typeVehicule} onChange={e => handleDetailChange(idx, e)} className="input" /></td>
                <td><input name="prix" value={detail.prix} onChange={e => handleDetailChange(idx, e)} className="input" /></td>
                <td><input name="prixAchat" value={detail.prixAchat} onChange={e => handleDetailChange(idx, e)} className="input" /></td>
                <td><input name="ecart" value={detail.ecart} onChange={e => handleDetailChange(idx, e)} className="input" /></td>
                <td><input name="chargeCompte" value={detail.chargeCompte} onChange={e => handleDetailChange(idx, e)} className="input" /></td>
                <td><input name="pax" value={detail.pax} onChange={e => handleDetailChange(idx, e)} className="input" /></td>
                <td><input name="numeroVol" value={detail.numeroVol} onChange={e => handleDetailChange(idx, e)} className="input" /></td>
                <td><input type="date" name="dateVol" value={detail.dateVol} onChange={e => handleDetailChange(idx, e)} className="input" /></td>
                <td><input name="ville" value={detail.ville} onChange={e => handleDetailChange(idx, e)} className="input" /></td>
                <td><input name="nomsTouristes" value={detail.nomsTouristes} onChange={e => handleDetailChange(idx, e)} className="input" /></td>
                <td><button type="button" onClick={() => removeDetail(idx)} className="text-red-500">Annuler</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={addDetail} className="mt-2 btn">Ajouter un détail</button>
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="btn btn-secondary">Annuler</button>
        <button type="submit" className="btn btn-primary">Enregistrer</button>
      </div>
    </form>
  );
}
