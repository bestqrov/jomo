import mongoose from 'mongoose';

const AssuranceSchema = new mongoose.Schema({
  compagnie: { type: String, required: true },
  police: { type: String },
  dateDebut: { type: Date },
  dateFin: { type: Date },
  montant: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Assurance || mongoose.model('Assurance', AssuranceSchema);
