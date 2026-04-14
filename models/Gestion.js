import mongoose from 'mongoose';

const GestionSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String },
  type: { type: String },
  statut: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Gestion || mongoose.model('Gestion', GestionSchema);
