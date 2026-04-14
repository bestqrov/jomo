import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { connectDb } from '@/lib/db';
import Vignette from '../../../../../../models/Vignette.js';


export async function GET(req) {
  try {
    const auth = await requireAuth(req);
    if (auth instanceof NextResponse) return auth;
    await connectDb();
    const vignettes = await Vignette.find();
    return NextResponse.json({ vignettes, total: vignettes.length });
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
    const dateEmission = rawData.dateEmission || rawData.dateDebut;
    const dateExpiration = rawData.dateExpiration || rawData.dateFin;
    const montant = Number(rawData.montant ?? rawData.montantTotal ?? rawData.montantPrincipal ?? 0);
    const numero = rawData.numero || `${vehicule || 'vignette'}-${Date.now()}`;

    if (!vehicule || !dateEmission || !dateExpiration) {
      return NextResponse.json({ error: 'Tous les champs requis manquent', details: 'vehicule, dateEmission et dateExpiration sont obligatoires' }, { status: 400 });
    }

    const data = {
      vehicule,
      numero,
      dateEmission: new Date(dateEmission),
      dateExpiration: new Date(dateExpiration),
      montant,
      fournisseur: rawData.fournisseur || rawData.provider || '',
      etat: rawData.etat || rawData.status || 'valide',
    };

    await connectDb();
    const vignette = new Vignette(data);
    await vignette.save();
    return NextResponse.json({ success: true, vignette });
  } catch (e) {
    const status = e.name === 'ValidationError' ? 400 : 500;
    return NextResponse.json({ error: 'Server error', details: e.message }, { status });
  }
}
