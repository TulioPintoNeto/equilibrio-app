import { NextRequest, NextResponse } from 'next/server';
import { SessionManager } from '@/backend/data/auth/SessionManager';

export async function POST(req: NextRequest) {
  const res = new NextResponse();
  const sessionManager = new SessionManager(req, res);

  try {
    const session = await sessionManager.get();
    await session.destroy();

    return sessionManager.response(200, { isLogged: false });
  } catch {
    return sessionManager.response(
      400,
      { message: 'Um erro inesperado ocorreu' },
    );
  }
}
