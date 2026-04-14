import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { connectDb } from '@/lib/db';
import Equipement from '../../../../../../models/Equipement.js';


export async function GET(req) {
  try {
    const auth = await requireAuth(req);
    if (auth instanceof NextResponse) return auth;
    await connectDb();
    const equipements = await Equipement.find();
    return NextResponse.json({ equipements, total: equipements.length });
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
    const equipement = new Equipement(data);
    await equipement.save();
    return NextResponse.json({ success: true, equipement });
  } catch (e) {
    return NextResponse.json({ error: 'Server error', details: e.message }, { status: 500 });
  }
}
