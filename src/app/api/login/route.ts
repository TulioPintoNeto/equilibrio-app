import { NextRequest, NextResponse } from 'next/server';
import { login } from './login';
import { SessionManager } from '@/backend/data/auth/SessionManager';
import { loginError } from './loginError';

export async function POST(req: NextRequest) {
  const res = new NextResponse();
  const sessionManager = new SessionManager(req, res);

  try {
    await login(req);

    const session = await sessionManager.get();
    session.isLogged = true;
    await session.save();

    return sessionManager.response(200, { isLogged: true });
  } catch (e: unknown) {
    return loginError(e, sessionManager);
  }
}
