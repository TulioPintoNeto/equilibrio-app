import { NextRequest, NextResponse } from 'next/server';
import { SessionRepository } from '@/backend/data/auth/SessionRepository';

export async function GET(req: NextRequest) {
  const res = new NextResponse();
  const sessionRepository = new SessionRepository(req, res);

  try {
    const session = await sessionRepository.get();

    if (session.user) {
      return sessionRepository.response(200, session.user);
    }

    return sessionRepository.response(401, { message: 'Usuário não autenticado' });
  } catch {
    return sessionRepository.response(
      400,
      { message: 'Um erro inesperado ocorreu' },
    );
  }
}
