import mongoose from 'mongoose';

const ReformeSchema = new mongoose.Schema({
  vehicule: { type: String, required: true },
  dateReforme: { type: Date },
  raison: { type: String },
  statut: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Reforme || mongoose.model('Reforme', ReformeSchema);
