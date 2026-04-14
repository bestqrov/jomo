import mongoose from 'mongoose';

const PermisCirculationSchema = new mongoose.Schema({
  numero: { type: String, required: true },
  titulaire: { type: String },
  dateEmission: { type: Date },
  dateExpiration: { type: Date },
  vehicule: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.PermisCirculation || mongoose.model('PermisCirculation', PermisCirculationSchema);
