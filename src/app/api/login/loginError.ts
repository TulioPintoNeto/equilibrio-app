import { SessionManager } from '@/backend/data/auth/SessionManager';
import { AuthError } from '@/backend/data/firebase/Firebase';
import { MissingParameters } from './paramsFromURL';

export const loginError = (e: unknown, sessionManager: SessionManager) => {
  if (e instanceof AuthError) {
    return sessionManager.response(
      401,
      { message: 'E-mail ou senha incorretos' },
    );
  }

  if (e instanceof MissingParameters) {
    return sessionManager.response(
      400,
      { message: 'Parâmetros obrigatórios não informados' },
    );
  }

  return sessionManager.response(
    400,
    { message: 'Um erro inesperado ocorreu' },
  );
};
