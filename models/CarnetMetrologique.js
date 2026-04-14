import mongoose from 'mongoose';

const CarnetMetrologiqueSchema = new mongoose.Schema({
  reference: { type: String, required: true },
  dateInspection: { type: Date },
  resultat: { type: String },
  vehicule: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.CarnetMetrologique || mongoose.model('CarnetMetrologique', CarnetMetrologiqueSchema);
