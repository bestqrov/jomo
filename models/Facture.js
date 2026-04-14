import mongoose from 'mongoose';

const FactureSchema = new mongoose.Schema({
  numero: { type: String, required: true },
  fournisseur: { type: String },
  montant: { type: Number },
  statut: { type: String, default: 'pending' },
  dateFacture: { type: Date },
  dateEcheance: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Facture || mongoose.model('Facture', FactureSchema);
