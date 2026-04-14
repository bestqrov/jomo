import mongoose from 'mongoose';

const AgrementSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  reference: { type: String },
  dateDebut: { type: Date },
  dateFin: { type: Date },
  status: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Agrement || mongoose.model('Agrement', AgrementSchema);
