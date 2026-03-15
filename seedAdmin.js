// seedAdmin.js
// MongoDB seed script for ArwaPark SaaS
// Ensures an Admin user has access to Pack 3 (full features)

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://advicermano_db_jomo:yfTnNhbUuoornloG@cluster0.ksank4q.mongodb.net/?appName=Cluster0';

// Plan Schema
const planSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  vehicleLimit: { type: Number },
  driverLimit: { type: Number },
  userLimit: { type: Number },
  features: [{ type: String }],
  enabled: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});
const Plan = mongoose.models.Plan || mongoose.model('Plan', planSchema);

// Agency Schema
const agencySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
  subscriptionStatus: { type: String, enum: ['active', 'expired', 'canceled'], default: 'active' },
  vehiclesCount: { type: Number, default: 0 },
  driversCount: { type: Number, default: 0 },
  usersCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});
const Agency = mongoose.models.Agency || mongoose.model('Agency', agencySchema);

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['SUPER_ADMIN', 'ADMIN', 'SECRETARY', 'DRIVER'], required: true },
  agencyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agency', required: true },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

async function seed() {
  await mongoose.connect(MONGO_URI);

  // 1. Create Plan "Pack 3" if not exists
  const planName = 'Pack 3';
  const features = [
    'FLOTS',
    'TRANSPORT',
    'MAINTENANCE',
    'CONSOMMATION',
    'ADMINISTRATIF',
    'GESTION',
    'ANALYTICS',
    'DOCUMENT_ALERTS',
    'GLOBAL_SEARCH',
    'PLANNING',
    'VEHICLE_360',
  ];
  let plan = await Plan.findOne({ name: planName });
  if (!plan) {
    plan = await Plan.create({
      name: planName,
      vehicleLimit: Number.MAX_SAFE_INTEGER,
      driverLimit: Number.MAX_SAFE_INTEGER,
      userLimit: Number.MAX_SAFE_INTEGER,
      features,
      enabled: true,
    });
    console.log('Created plan:', planName);
  } else {
    console.log('Plan already exists:', planName);
  }

  // 2. Create Agency linked to this Plan if not exists
  const agencyName = 'ArwaPark Demo Agency';
  let agency = await Agency.findOne({ name: agencyName });
  if (!agency) {
    agency = await Agency.create({
      name: agencyName,
      planId: plan._id,
      subscriptionStatus: 'active',
      vehiclesCount: 0,
      driversCount: 0,
      usersCount: 0,
      createdAt: new Date(),
    });
    console.log('Created agency:', agencyName);
  } else {
    console.log('Agency already exists:', agencyName);
  }

  // 3. Create Admin User if not exists
  const adminEmail = 'admin@arwapark.com';
  let admin = await User.findOne({ email: adminEmail });
  const password = 'Admin123';
  const passwordHash = await bcrypt.hash(password, 10);
  if (!admin) {
    admin = await User.create({
      name: 'Admin',
      email: adminEmail,
      password: passwordHash,
      role: 'ADMIN',
      agencyId: agency._id,
      active: true,
      createdAt: new Date(),
    });
    console.log('Created admin:', adminEmail, 'Password:', password);
  } else {
    admin.agencyId = agency._id;
    admin.password = passwordHash;
    admin.role = 'ADMIN';
    admin.active = true;
    await admin.save();
    console.log('Updated admin:', adminEmail, 'Password reset to:', password);
  }

  await mongoose.disconnect();
  process.exit();
}

seed().catch(e => { console.error(e); process.exit(1); });
