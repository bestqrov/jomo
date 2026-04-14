import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  vehicule: { type: String, required: true },
  locataire: { type: String },
  dateDebut: { type: Date },
  dateFin: { type: Date },
  montant: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Location || mongoose.model('Location', LocationSchema);
