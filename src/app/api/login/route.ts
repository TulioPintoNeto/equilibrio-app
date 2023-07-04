import { NextRequest, NextResponse } from 'next/server';
import { login } from './login';
import { SessionRepository } from '@/backend/data/auth/SessionRepository';
import { loginError } from './loginError';

export async function POST(req: NextRequest) {
  const res = new NextResponse();
  const sessionRepository = new SessionRepository(req, res);

  try {
    await login(req);

    const session = await sessionRepository.get();
    session.user = { isLogged: true };
    await session.save();

    return sessionRepository.response(200, { isLogged: true });
  } catch (e: unknown) {
    return loginError(e, sessionRepository);
  }
}
