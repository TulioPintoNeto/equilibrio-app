import { NextRequest, NextResponse } from 'next/server';
import { SessionManager } from './data/SessionManager';

export const unauthorizedUrl = (reqUrl: string) => new URL('/login', reqUrl);

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await new SessionManager(req, res).get();

  if (!session.user) {
    return NextResponse.redirect(unauthorizedUrl(req.url));
  }

  return res;
}

export const config = {
  matcher: ['/((?!login|forgot-password|_next/static|_next/image|favicon.ico).*)'],
};
