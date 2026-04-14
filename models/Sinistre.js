import mongoose from 'mongoose';

const SinistreSchema = new mongoose.Schema({
  reference: { type: String, required: true },
  dateSinistre: { type: Date },
  montant: { type: Number },
  description: { type: String },
  vehicule: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Sinistre || mongoose.model('Sinistre', SinistreSchema);
