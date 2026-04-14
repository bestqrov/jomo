import mongoose from 'mongoose';

const ConsommationSchema = new mongoose.Schema({
  vehicule: { type: String, required: true },
  litres: { type: Number },
  date: { type: Date },
  distance: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Consommation || mongoose.model('Consommation', ConsommationSchema);
