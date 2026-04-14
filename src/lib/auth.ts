import { SignJWT, jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'arwapark_token';

function getSecret() {
  const secret = process.env.JWT_SECRET ?? 'change-this-secret-in-production';
  return new TextEncoder().encode(secret);
}

// ─── Token helpers ────────────────────────────────────────────────────────────

export async function signToken(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(getSecret());
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret());
  return payload;
}

// ─── Cookie helpers ───────────────────────────────────────────────────────────

export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
  });
}

export function clearAuthCookie(response: NextResponse) {
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}

// ─── API route guard ──────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  agencyId: string | null;
  name: string;
}

/**
 * Call at the top of every protected API route handler.
 * Returns the authenticated user payload, or a 401 NextResponse if not authenticated.
 *
 * Usage:
 *   const auth = await requireAuth(req);
 *   if (auth instanceof NextResponse) return auth;
 *   // auth.id, auth.role, auth.agencyId are now available
 */
export async function requireAuth(req: NextRequest): Promise<AuthUser | NextResponse> {
  const token = req.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const payload = await verifyToken(token);
    return {
      id: payload.id as string,
      email: payload.email as string,
      role: payload.role as string,
      agencyId: (payload.agencyId as string) ?? null,
      name: payload.name as string,
    };
  } catch {
    return NextResponse.json({ error: 'Session expirée, veuillez vous reconnecter' }, { status: 401 });
  }
}
