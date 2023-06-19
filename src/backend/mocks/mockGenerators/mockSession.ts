/* eslint-disable @typescript-eslint/no-empty-function */
import { SessionParams } from '@/backend/data/auth/SessionManager';

export const mockSession = (optionalParams: Partial<SessionParams>): SessionParams => ({
  isLogged: true,
  save: async () => {},
  destroy: async () => {},
  ...optionalParams,
});
