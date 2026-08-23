import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_ROUTES = ['/login', '/register'];
const PUBLIC_ROUTES = ['/', '/services', '/find-technicians'];

function decodeToken(token: string): { role?: string } | null {
  try {
    const [, payload] = token.split('.');
    if (!payload) return null;
    return (
      JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) ?? null
    );
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get('accessToken')?.value;

  const decoded = accessToken ? decodeToken(accessToken) : null;
  const userRole = decoded?.role;
  const isAuthenticated = !!accessToken && !!decoded;

  console.log(
    '[proxy]',
    pathname,
    '| authenticated:',
    isAuthenticated,
    '| role:',
    userRole
  );

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  );

  // Authenticated user hitting login/register → redirect to their dashboard
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

  // Unauthenticated accessing a protected route
  if (!isAuthenticated && !isPublicRoute && !isAuthRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated but wrong role for the route
  if (isAuthenticated) {
    if (pathname.startsWith('/dashboard') && userRole !== 'CUSTOMER')
      return NextResponse.redirect(new URL('/login', request.url));
    if (pathname.startsWith('/admin-dashboard') && userRole !== 'ADMIN')
      return NextResponse.redirect(new URL('/login', request.url));
    if (
      pathname.startsWith('/technician-dashboard') &&
      userRole !== 'TECHNICIAN'
    )
      return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)'],
};
