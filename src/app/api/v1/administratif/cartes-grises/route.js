import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { connectDb } from '@/lib/db';
import CarteGrise from '../../../../../../models/CarteGrise.js';


export async function GET(req) {
  try {
    const auth = await requireAuth(req);
    if (auth instanceof NextResponse) return auth;
    await connectDb();
    const cartes = await CarteGrise.find();
    return NextResponse.json({ cartes, total: cartes.length });
  } catch (e) {
    return NextResponse.json({ error: 'Server error', details: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const auth = await requireAuth(req);
    if (auth instanceof NextResponse) return auth;
    const rawData = await req.json();
    const vehicule = rawData.vehicule || rawData.vehicle;
    const numero = rawData.numero || rawData.num;
    const dateDelivrance = rawData.dateDelivrance || rawData.dateDebut;
    const dateExpiration = rawData.dateExpiration || rawData.dateFin || null;

    if (!vehicule || !numero || !dateDelivrance) {
      return NextResponse.json({ error: 'Champs requis manquants', details: 'vehicule, numero et dateDelivrance sont requis' }, { status: 400 });
    }

    const data = {
      vehicule,
      numero,
      dateDelivrance: new Date(dateDelivrance),
      dateExpiration: dateExpiration ? new Date(dateExpiration) : undefined,
      fournisseur: rawData.fournisseur || rawData.provider || '',
      commentaire: rawData.commentaire || '',
    };

    await connectDb();
    const carte = new CarteGrise(data);
    await carte.save();
    return NextResponse.json({ success: true, carte });
  } catch (e) {
    const status = e.name === 'ValidationError' ? 400 : 500;
    return NextResponse.json({ error: 'Server error', details: e.message }, { status });
  }
}

