import { NextRequest, NextResponse } from 'next/server';
import { SessionRepository } from '@/backend/data/auth/SessionRepository';

export async function POST(req: NextRequest) {
  const res = new NextResponse();
  const sessionRepository = new SessionRepository(req, res);

  try {
    const session = await sessionRepository.get();
    await session.destroy();

    return sessionRepository.response(200, { isLogged: false });
  } catch {
    return sessionRepository.response(
      400,
      { message: 'Um erro inesperado ocorreu' },
    );
  }
}
