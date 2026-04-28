import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';

  if (isAdminRoute && !isLoginPage) {
    // Supabase stores the session in a cookie named sb-<project-ref>-auth-token
    const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL
      ?.replace('https://', '')
      .replace('.supabase.co', '');
    const cookieName = `sb-${projectRef}-auth-token`;
    const hasSession =
      request.cookies.has(cookieName) ||
      request.cookies.has(`${cookieName}.0`); // chunked token

    if (!hasSession) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = '/admin/login';
      return NextResponse.redirect(loginUrl);
    }
  }

  if (isLoginPage) {
    const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL
      ?.replace('https://', '')
      .replace('.supabase.co', '');
    const cookieName = `sb-${projectRef}-auth-token`;
    const hasSession =
      request.cookies.has(cookieName) ||
      request.cookies.has(`${cookieName}.0`);

    if (hasSession) {
      const productsUrl = request.nextUrl.clone();
      productsUrl.pathname = '/admin/products';
      return NextResponse.redirect(productsUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
