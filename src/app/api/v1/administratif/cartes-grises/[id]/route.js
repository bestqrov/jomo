import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { connectDb } from '@/lib/db';
import CarteGrise from '../../../../../../../models/CarteGrise.js';


export async function DELETE(req, context) {
  try {
    const auth = await requireAuth(req);
    if (auth instanceof NextResponse) return auth;
    let id = context?.params?.id;
    if (!id) {
      try {
        const parsedUrl = new URL(req.url);
        const segments = parsedUrl.pathname.split('/').filter(Boolean);
        id = segments[segments.length - 1];
      } catch {
        id = undefined;
      }
    }

    if (!id) {
      return NextResponse.json({ error: 'ID missing' }, { status: 400 });
    }

    await connectDb();
    const carte = await CarteGrise.findById(id);
    if (!carte) {
      return NextResponse.json({ error: 'Carte grise non trouvée' }, { status: 404 });
    }

    await CarteGrise.deleteOne({ _id: id });
    return NextResponse.json({ success: true, id });
  } catch (e) {
    return NextResponse.json({ error: 'Server error', details: e.message }, { status: 500 });
  }
}

export async function PATCH(req, context) {
  try {
    const auth = await requireAuth(req);
    if (auth instanceof NextResponse) return auth;
    let id = context?.params?.id;
    if (!id) {
      try {
        const parsedUrl = new URL(req.url);
        const segments = parsedUrl.pathname.split('/').filter(Boolean);
        id = segments[segments.length - 1];
      } catch {
        id = undefined;
      }
    }

    if (!id) {
      return NextResponse.json({ error: 'ID missing' }, { status: 400 });
    }

    const rawData = await req.json();
    const updates = {
      vehicule: rawData.vehicule || rawData.vehicle,
      numero: rawData.numero,
      dateDelivrance: rawData.dateDelivrance || rawData.dateDebut,
      dateExpiration: rawData.dateExpiration || rawData.dateFin,
      fournisseur: rawData.fournisseur,
      commentaire: rawData.commentaire,
    };

    // Remove undefined keys
    Object.keys(updates).forEach((key) => updates[key] === undefined && delete updates[key]);

    await connectDb();
    const updated = await CarteGrise.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!updated) {
      return NextResponse.json({ error: 'Carte grise non trouvée' }, { status: 404 });
    }

    return NextResponse.json({ success: true, carte: updated });
  } catch (e) {
    const status = e.name === 'ValidationError' ? 400 : 500;
    return NextResponse.json({ error: 'Server error', details: e.message }, { status });
  }
}
