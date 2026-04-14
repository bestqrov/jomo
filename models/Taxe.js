import mongoose from 'mongoose';

const TaxeSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  montant: { type: Number },
  date: { type: Date },
  vehicule: { type: String },
  statut: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Taxe || mongoose.model('Taxe', TaxeSchema);
