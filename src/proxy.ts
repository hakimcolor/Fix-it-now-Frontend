import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_ROUTES = ['/login', '/register'];
const PUBLIC_ROUTES = ['/', '/services', '/find-technicians'];

// Decode JWT without signature verification.
// Verification is the backend's responsibility.
// We only need the role claim for routing decisions.
function decodeToken(token: string): { role?: string } | null {
  try {
    const [, payload] = token.split('.');
    if (!payload) return null;
    const decoded = JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf8')
    );
    return decoded ?? null;
  } catch {
    return null;
  }
}

function isTokenExpired(token: string): boolean {
  try {
    const decoded = decodeToken(token);
    if (!decoded || typeof (decoded as { exp?: number }).exp !== 'number')
      return false;
    return Date.now() >= (decoded as { exp: number }).exp * 1000;
  } catch {
    return false;
  }
}

async function refreshAccessToken(
  refreshToken: string
): Promise<string | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`,
      {
        method: 'POST',
        headers: { Cookie: `refreshToken=${refreshToken}` },
        cache: 'no-store',
      }
    );
    if (!res.ok) return null;
    const result = await res.json();
    return result.success && result.data?.accessToken
      ? result.data.accessToken
      : null;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const response = NextResponse.next();

  // If access token is expired but refresh token exists, silently refresh
  if (accessToken && isTokenExpired(accessToken) && refreshToken) {
    const newToken = await refreshAccessToken(refreshToken);
    if (newToken) {
      response.cookies.set('accessToken', newToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: 'lax',
      });
      accessToken = newToken;
    } else {
      // Refresh failed — clear tokens
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      accessToken = undefined;
    }
  }

  // If no access token at all, check if refresh token can get one
  if (!accessToken && refreshToken) {
    const newToken = await refreshAccessToken(refreshToken);
    if (newToken) {
      response.cookies.set('accessToken', newToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: 'lax',
      });
      accessToken = newToken;
    }
  }

  const decoded = accessToken ? decodeToken(accessToken) : null;
  const userRole: string | undefined = (decoded as { role?: string } | null)
    ?.role;
  const isAuthenticated = !!accessToken && !!decoded;

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );

  // Logged-in user hitting login/register → go to their dashboard
  if (isAuthenticated && isAuthRoute) {
    if (userRole === 'CUSTOMER')
      return NextResponse.redirect(new URL('/dashboard', request.url));
    if (userRole === 'ADMIN')
      return NextResponse.redirect(new URL('/admin-dashboard', request.url));
    if (userRole === 'TECHNICIAN')
      return NextResponse.redirect(
        new URL('/technician-dashboard', request.url)
      );
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Unauthenticated trying to access protected route
  if (!isAuthenticated && !isPublicRoute && !isAuthRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based route protection
  if (pathname.startsWith('/dashboard') && userRole !== 'CUSTOMER') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (pathname.startsWith('/admin-dashboard') && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  if (
    pathname.startsWith('/technician-dashboard') &&
    userRole !== 'TECHNICIAN'
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)'],
};
