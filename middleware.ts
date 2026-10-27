import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export function middleware(req: NextRequest) {
  const p = req.nextUrl.pathname;
  if (p.startsWith('/admin') || p.startsWith('/api/admin')) {
    if (!req.cookies.get('admin_session')) {
      return p.startsWith('/api/') ? NextResponse.json({ error: 'unauthorized' }, { status: 401 })
        : NextResponse.redirect(new URL('/login', req.url));
    }
  }
  return NextResponse.next();
}
export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] };
