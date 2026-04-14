import mongoose from 'mongoose';

const ContratLeasingSchema = new mongoose.Schema({
  reference: { type: String, required: true },
  locataire: { type: String },
  montant: { type: Number },
  dateDebut: { type: Date },
  dateFin: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.ContratLeasing || mongoose.model('ContratLeasing', ContratLeasingSchema);
