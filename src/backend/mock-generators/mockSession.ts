import { Session, SessionParams } from '@/data/auth/Session';

export const mockSession = (optionalParams: Partial<SessionParams>): Session => new Session({
  isLogged: true,
  ...optionalParams,
});
