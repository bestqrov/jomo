import mongoose from 'mongoose';

const AutorisationCirculationSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  reference: { type: String },
  dateDebut: { type: Date },
  dateFin: { type: Date },
  vehicule: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.AutorisationCirculation || mongoose.model('AutorisationCirculation', AutorisationCirculationSchema);
