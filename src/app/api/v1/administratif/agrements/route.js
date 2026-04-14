import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { connectDb } from '@/lib/db';
import Agrement from '../../../../../../models/Agrement.js';


export async function GET(req) {
  try {
    const auth = await requireAuth(req);
    if (auth instanceof NextResponse) return auth;
    await connectDb();
    const agrements = await Agrement.find();
    return NextResponse.json({ agrements, total: agrements.length });
  } catch (e) {
    return NextResponse.json({ error: 'Server error', details: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const auth = await requireAuth(req);
    if (auth instanceof NextResponse) return auth;
    const data = await req.json();
    await connectDb();
    const agrement = new Agrement(data);
    await agrement.save();
    return NextResponse.json({ success: true, agrement });
  } catch (e) {
    return NextResponse.json({ error: 'Server error', details: e.message }, { status: 500 });
  }
}
