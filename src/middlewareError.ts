import { NextRequest, NextResponse } from 'next/server';
import { EnvVariableNotFound } from './data/Environment';
import { TooManyRetries } from './data/auth/SessionManager';

export class UnauthorizedError extends Error {}

const redirectReqWithStatus = (req: NextRequest) => (status: number) => NextResponse
  .redirect(new URL('/login', req.url), { status });

export const middlewareError = (
  req: NextRequest,
  err: unknown,
): NextResponse => {
  const redirectWithStatus = redirectReqWithStatus(req);

  if (err instanceof UnauthorizedError) {
    return redirectWithStatus(401);
  }

  if (err instanceof EnvVariableNotFound) {
    return redirectWithStatus(400);
  }

  if (err instanceof TooManyRetries) {
    return redirectWithStatus(500);
  }

  return redirectWithStatus(502);
};
