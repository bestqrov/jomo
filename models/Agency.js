import mongoose from 'mongoose';

const AgencySchema = new mongoose.Schema({
  name: { type: String, required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Agency || mongoose.model('Agency', AgencySchema);
