import mongoose from 'mongoose';

const EquipementSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  categorie: { type: String },
  quantite: { type: Number },
  etat: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Equipement || mongoose.model('Equipement', EquipementSchema);
