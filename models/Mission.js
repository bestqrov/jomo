import mongoose from 'mongoose';

const MissionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  vehicle: { type: String },
  driver: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Mission || mongoose.model('Mission', MissionSchema);
