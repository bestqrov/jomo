import mongoose from 'mongoose';

const CarteGriseSchema = new mongoose.Schema({
  vehicule: { type: String, required: true },
  numero: { type: String, required: true, unique: true },
  dateDelivrance: { type: Date, required: true },
  dateExpiration: { type: Date },
  fournisseur: { type: String },
  commentaire: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.CarteGrise || mongoose.model('CarteGrise', CarteGriseSchema);
