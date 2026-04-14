// checkAdmin.js
// Script to check for admin user(s) in the database and print their details

const mongoose = require('mongoose');
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://advicermano_db_jomo:yfTnNhbUuoornloG@cluster0.ksank4q.mongodb.net/?appName=Cluster0';

async function checkAdmin() {
  await mongoose.connect(MONGO_URI);
  const admins = await User.find({ email: 'admin@arwapark.com' });
  if (admins.length === 0) {
    console.log('No admin user found with email admin@arwapark.com');
  } else {
    console.log(`Found ${admins.length} admin user(s):`);
    admins.forEach((admin, idx) => {
      console.log(`--- Admin #${idx + 1} ---`);
      console.log('ID:', admin._id);
      console.log('Email:', admin.email);
      console.log('Password Hash:', admin.password);
      console.log('Active:', admin.active);
      console.log('Role:', admin.role);
      console.log('Created At:', admin.createdAt);
    });
  }
  await mongoose.disconnect();
  process.exit();
}

checkAdmin().catch(e => { console.error(e); process.exit(1); });
