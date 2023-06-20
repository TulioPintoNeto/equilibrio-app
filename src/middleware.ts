import { NextRequest, NextResponse } from 'next/server';
import { SessionManager } from './backend/data/auth/SessionManager';
import { UnauthorizedError, middlewareError } from './middlewareError';

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next();
    const session = await new SessionManager(req, res).get();

    if (session.isLogged) {
      return res;
    }

    throw new UnauthorizedError();
  } catch (err) {
    return middlewareError(req, err);
  }
}

export const config = {
  matcher: [
    '/((?!api/login|api/forgot-password|login|forgot-password|_next/static|_next/image|favicon.ico).*)',
  ],
};
