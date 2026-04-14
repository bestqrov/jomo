import mongoose from 'mongoose';

const RemplacementSchema = new mongoose.Schema({
  vehicule: { type: String, required: true },
  date: { type: Date },
  cause: { type: String },
  status: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Remplacement || mongoose.model('Remplacement', RemplacementSchema);
