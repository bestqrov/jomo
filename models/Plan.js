import mongoose from 'mongoose';

const PlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userLimit: { type: Number, default: 5 },
  vehicleLimit: { type: Number, default: 100 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Plan || mongoose.model('Plan', PlanSchema);
