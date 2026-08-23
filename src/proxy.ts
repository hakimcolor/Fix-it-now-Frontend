import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { JwtPayload } from 'jsonwebtoken';
import { jwtUtils } from './utils/jwt';

const AUTH_ROUTES = ['/login', '/register'];
const PUBLIC_ROUTES = ['/', '/services', '/find-technicians'];

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
    if (result.success && result.data?.accessToken) {
      return result.data.accessToken;
    }
    return null;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      )
    : null;

  const response = NextResponse.next();

  // Access token expired but refresh token valid — silently refresh
  if (
    !decodedAccessToken?.success &&
    decodedRefreshToken?.success &&
    refreshToken
  ) {
    const newAccessToken = await refreshAccessToken(refreshToken);
    if (newAccessToken) {
      response.cookies.set('accessToken', newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        sameSite: 'lax',
      });
      accessToken = newAccessToken;
      decodedAccessToken = jwtUtils.verifyToken(
        newAccessToken,
        process.env.JWT_ACCESS_SECRET as string
      );
    }
  }

  let userRole: string | null = null;

  if (!decodedAccessToken?.success) {
    response.cookies.delete('accessToken');
    accessToken = undefined;
  }

  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role;
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );

  // Logged-in user trying to access login/register → redirect to dashboard
  if (accessToken && isAuthRoute) {
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

  // Unauthenticated user trying to access a protected page
  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Role-based access control
  if (pathname.startsWith('/dashboard') && userRole !== 'CUSTOMER') {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }
  if (pathname.startsWith('/admin-dashboard') && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }
  if (
    pathname.startsWith('/technician-dashboard') &&
    userRole !== 'TECHNICIAN'
  ) {
    return NextResponse.redirect(new URL('/not-found', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)'],
};
