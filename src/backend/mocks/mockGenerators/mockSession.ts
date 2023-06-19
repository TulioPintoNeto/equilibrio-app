import { Session, SessionParams } from '@/backend/data/auth/Session';

export const mockSession = (optionalParams: Partial<SessionParams>): Session => new Session({
  isLogged: true,
  ...optionalParams,
});
