import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDb } from '@/lib/db';
import { signToken, setAuthCookie } from '@/lib/auth';
import User from '../../../../../models/User.js';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 });
    }

    await connectDb();

    const user = await User.findOne({ email });
    if (!user || !user.active) {
      return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 });
    }

    // Update last login timestamp
    user.lastLogin = new Date();
    await user.save();

    // Sign JWT with user identity
    const token = await signToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      agencyId: user.agencyId?.toString() ?? null,
    });

    // Build response — still return user info for the frontend store
    const response = NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      agencyId: user.agencyId,
      lastLogin: user.lastLogin,
    });

    // Set secure httpOnly cookie
    setAuthCookie(response, token);

    return response;
  } catch (e) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
