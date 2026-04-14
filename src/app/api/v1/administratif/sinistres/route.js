import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { connectDb } from '@/lib/db';
import Sinistre from '../../../../../../models/Sinistre.js';


export async function GET(req) {
  try {
    const auth = await requireAuth(req);
    if (auth instanceof NextResponse) return auth;
    await connectDb();
    const sinistres = await Sinistre.find();
    return NextResponse.json({ sinistres, total: sinistres.length });
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
    const sinistre = new Sinistre(data);
    await sinistre.save();
    return NextResponse.json({ success: true, sinistre });
  } catch (e) {
    return NextResponse.json({ error: 'Server error', details: e.message }, { status: 500 });
  }
}
