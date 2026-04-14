import mongoose from 'mongoose';

const ExtincteurSchema = new mongoose.Schema({
  reference: { type: String, required: true },
  modele: { type: String },
  dateInspection: { type: Date },
  statut: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Extincteur || mongoose.model('Extincteur', ExtincteurSchema);
