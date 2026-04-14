import mongoose from 'mongoose';

const VehicleSchema = new mongoose.Schema({
  registration: { type: String, required: true, unique: true },
  brand: { type: String },
  model: { type: String },
  year: { type: Number },
  type: { type: String },
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);
