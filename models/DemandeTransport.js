import mongoose from 'mongoose';

const DemandeTransportSchema = new mongoose.Schema({
  demandeur: { type: String, required: true },
  destination: { type: String },
  dateDemande: { type: Date },
  statut: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.DemandeTransport || mongoose.model('DemandeTransport', DemandeTransportSchema);
