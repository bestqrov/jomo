import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { connectDb } from '@/lib/db';
import Consommation from '../../../../../models/Consommation.js';


export async function GET(req) {
  try {
    const auth = await requireAuth(req);
    if (auth instanceof NextResponse) return auth;
    await connectDb();
    const consommations = await Consommation.find();
    return NextResponse.json({ consommations, total: consommations.length });
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
    const consommation = new Consommation(data);
    await consommation.save();
    return NextResponse.json({ success: true, consommation });
  } catch (e) {
    return NextResponse.json({ error: 'Server error', details: e.message }, { status: 500 });
  }
}
