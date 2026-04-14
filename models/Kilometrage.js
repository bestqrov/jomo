import mongoose from 'mongoose';

const KilometrageSchema = new mongoose.Schema({
  vehicule: { type: String, required: true },
  valeur: { type: Number },
  dateReleve: { type: Date },
  commentaire: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Kilometrage || mongoose.model('Kilometrage', KilometrageSchema);
