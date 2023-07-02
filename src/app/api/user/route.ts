import { NextRequest, NextResponse } from 'next/server';
import { SessionManager } from '@/backend/data/auth/SessionManager';

export async function GET(req: NextRequest) {
  const res = new NextResponse();
  const sessionManager = new SessionManager(req, res);

  try {
    const session = await sessionManager.get();

    if (session.user) {
      return sessionManager.response(200, session.user);
    }

    return sessionManager.response(401, { message: 'Usuário não autenticado' });
  } catch {
    return sessionManager.response(
      400,
      { message: 'Um erro inesperado ocorreu' },
    );
  }
}
