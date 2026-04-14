import mongoose from 'mongoose';

const AssuranceInternationaleSchema = new mongoose.Schema({
  compagnie: { type: String, required: true },
  police: { type: String },
  couverture: { type: String },
  dateDebut: { type: Date },
  dateFin: { type: Date },
  montant: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.AssuranceInternationale || mongoose.model('AssuranceInternationale', AssuranceInternationaleSchema);
