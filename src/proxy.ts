import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'arwapark_token';

function getSecret() {
  const secret = process.env.JWT_SECRET ?? 'change-this-secret-in-production';
  return new TextEncoder().encode(secret);
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(COOKIE_NAME)?.value;

  // No token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const { payload } = await jwtVerify(token, getSecret());
    const role = payload.role as string;

    // /superadmin/* — only SUPER_ADMIN
    if (pathname.startsWith('/superadmin') && role !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // /admin/* — ADMIN, SECRETARY, DRIVER
    if (
      pathname.startsWith('/admin') &&
      !['ADMIN', 'SECRETARY', 'DRIVER'].includes(role)
    ) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  } catch {
    // Token invalid or expired
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.set(COOKIE_NAME, '', { maxAge: 0, path: '/' });
    return response;
  }
}

export const config = {
  matcher: ['/admin/:path*', '/superadmin/:path*'],
};
