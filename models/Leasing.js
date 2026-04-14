import mongoose from 'mongoose';

const LeasingSchema = new mongoose.Schema({
  reference: { type: String, required: true },
  partenaire: { type: String },
  montant: { type: Number },
  dateDebut: { type: Date },
  dateFin: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Leasing || mongoose.model('Leasing', LeasingSchema);
