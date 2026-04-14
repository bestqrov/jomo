import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { connectDb } from '@/lib/db';
import Vignette from '../../../../../../../models/Vignette.js';


export async function DELETE(req, context) {
  try {
    const auth = await requireAuth(req);
    if (auth instanceof NextResponse) return auth;
    let id = context?.params?.id;
    if (!id) {
      try {
        const parsedUrl = new URL(req.url);
        const segments = parsedUrl.pathname.split("/").filter(Boolean);
        id = segments[segments.length - 1];
      } catch {
        id = undefined;
      }
    }

    if (!id) {
      return NextResponse.json({ error: 'ID missing' }, { status: 400 });
    }

    await connectDb();
    const vignette = await Vignette.findById(id);
    if (!vignette) {
      return NextResponse.json({ error: 'Vignette non trouvée' }, { status: 404 });
    }

    await Vignette.deleteOne({ _id: id });
    return NextResponse.json({ success: true, id });
  } catch (e) {
    return NextResponse.json({ error: 'Server error', details: e.message }, { status: 500 });
  }
}
