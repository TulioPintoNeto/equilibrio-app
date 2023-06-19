import { NextRequest, NextResponse } from 'next/server';
import { login } from './login';
import { SessionManager } from '@/backend/data/auth/SessionManager';
import { loginError } from './loginError';

export async function GET(req: NextRequest) {
  const res = new NextResponse();
  const sessionManager = new SessionManager(req, res);
  const session = await sessionManager.get();

  try {
    const result = await login(req);

    session.isLogged = true;
    session.save();

    return sessionManager.response(200, { success: result });
  } catch (e: unknown) {
    session.isLogged = false;
    return loginError(e, sessionManager);
  }
}
