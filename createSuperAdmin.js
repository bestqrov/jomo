const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Use the main User model for compatibility with login
const User = require('../../../models/User.ts');

const MONGO_URI = 'mongodb+srv://advicermano_db_jomo:yfTnNhbUuoornloG@cluster0.ksank4q.mongodb.net/?appName=Cluster0';

async function createSuperAdmin() {
  await mongoose.connect(MONGO_URI);

  const email = 'superadmin@arwapark.com';
  const password = 'SuperAdmin123';
  const existing = await User.findOne({ email, role: 'superadmin' });

  if (existing) {
    console.log('superadmin already exists:', email);
    process.exit();
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await User.create({
    name: 'Super Admin',
    email,
    password: passwordHash,
    role: 'superadmin',
    agencyId: new mongoose.Types.ObjectId(), // required by schema
    createdAt: new Date(),
  });

  console.log('superadmin created:', email, 'Password:', password);
  process.exit();
}

createSuperAdmin();
