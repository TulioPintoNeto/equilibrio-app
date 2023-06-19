import { NextRequest, NextResponse } from 'next/server';
import { EnvVariableNotFound, TooManyRetries } from './backend/data/auth/SessionManager';
import { Logger } from './data/Logger';

export class UnauthorizedError extends Error {}

export const unauthorizedUrl = (url: string) => new URL('/login', url);

const redirect = (req: NextRequest) => NextResponse
  .redirect(unauthorizedUrl(req.url));

export const middlewareError = (
  req: NextRequest,
  err: unknown,
): NextResponse => {
  if (err instanceof UnauthorizedError) {
    Logger.log('Unauthorized error occurred in middleware');
  }

  if (err instanceof EnvVariableNotFound) {
    Logger.log('Environment variable not found in middleware');
  }

  if (err instanceof TooManyRetries) {
    Logger.log('Too many retries in middleware');
  }

  return redirect(req);
};
