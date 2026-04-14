import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String },
  reference: { type: String },
  expirationDate: { type: Date },
  vehicle: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Document || mongoose.model('Document', DocumentSchema);
