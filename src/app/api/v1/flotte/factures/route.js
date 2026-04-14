import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { connectDb } from '@/lib/db';
import Facture from '../../../../../../models/Facture.js';


export async function GET(req) {
  try {
    const auth = await requireAuth(req);
    if (auth instanceof NextResponse) return auth;
    await connectDb();
    const factures = await Facture.find();
    return NextResponse.json({ factures, total: factures.length });
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
    const facture = new Facture(data);
    await facture.save();
    return NextResponse.json({ success: true, facture });
  } catch (e) {
    return NextResponse.json({ error: 'Server error', details: e.message }, { status: 500 });
  }
}
