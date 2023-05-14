import { NextRequest, NextResponse } from 'next/server';
import { Session } from './data/Session';

export const unauthorizedUrl = (reqUrl: string) => new URL('/login', reqUrl);

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await new Session(req, res).get();

  if (!session.user) {
    return NextResponse.redirect(unauthorizedUrl(req.url));
  }

  return res;
}

export const config = {
  matcher: ['/((?!login|_next/static|_next/image|favicon.ico).*)'],
};
