import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Import User model (adjust path if needed)
import User from '../../../../../models/User.js';

const MONGO_URI = 'mongodb+srv://advicermano_db_jomo:yfTnNhbUuoornloG@cluster0.ksank4q.mongodb.net/?appName=Cluster0';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    await mongoose.connect(MONGO_URI);
    const user = await User.findOne({ email });
    if (!user || !user.active) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    // Optionally: generate JWT here and return
    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      agencyId: user.agencyId,
      lastLogin: user.lastLogin
    });
  } catch (e) {
    return NextResponse.json({ error: 'Server error', details: e.message }, { status: 500 });
  }
}
