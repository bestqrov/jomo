import mongoose from 'mongoose';

const AchatSchema = new mongoose.Schema({
  reference: { type: String, required: true },
  fournisseur: { type: String },
  montant: { type: Number },
  dateAchat: { type: Date },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Achat || mongoose.model('Achat', AchatSchema);
