const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['SUPER_ADMIN', 'ADMIN', 'SECRETARY', 'DRIVER'], required: true },
  agencyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agency', default: null },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', default: null },
  lastLogin: { type: Date },
  active: { type: Boolean, default: true },
  twoFactorEnabled: { type: Boolean, default: false }
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
