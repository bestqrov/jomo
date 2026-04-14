import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { connectDb } from '@/lib/db';
import User from '../../../../../models/User.js';
import Agency from '../../../../../models/Agency.js';
import Plan from '../../../../../models/Plan.js';

export async function GET(req) {
  try {
    const auth = await requireAuth(req);
    if (auth instanceof NextResponse) return auth;
    await connectDb();
    const users = await User.find();
    return NextResponse.json({ users, total: users.length });
  } catch (error) {
    return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const auth = await requireAuth(req);
    if (auth instanceof NextResponse) return auth;
    await connectDb();
    const body = await req.json();
    const { name, email, password, role, agencyId } = body;

    if (!name || !email || !password || !role || !agencyId) {
      return NextResponse.json({ error: 'Validation error: all fields are required' }, { status: 400 });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const agency = await Agency.findById(agencyId);
    if (!agency) {
      return NextResponse.json({ error: 'Agency not found' }, { status: 404 });
    }

    const plan = await Plan.findById(agency.planId);
    const maxUsers = plan?.userLimit ?? 5;

    const currentUsers = await User.countDocuments({ agencyId });
    if (currentUsers >= maxUsers) {
      return NextResponse.json({ error: `User limit reached for this agency (limit ${maxUsers}).` }, { status: 403 });
    }

    const user = new User({ name, email, password, role, agencyId });
    await user.save();

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ error: 'Server error', details: error.message }, { status: 500 });
  }
}
