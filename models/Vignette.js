import mongoose from 'mongoose';

const VignetteSchema = new mongoose.Schema({
  vehicule: { type: String, required: true },
  numero: { type: String, required: true, unique: true },
  dateEmission: { type: Date, required: true },
  dateExpiration: { type: Date, required: true },
  montant: { type: Number, default: 0 },
  fournisseur: { type: String },
  etat: { type: String, enum: ['valide', 'expiré', 'en_attente'], default: 'valide' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Vignette || mongoose.model('Vignette', VignetteSchema);
