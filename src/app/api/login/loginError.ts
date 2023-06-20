import { SessionManager } from '@/backend/data/auth/SessionManager';
import { AuthError } from '@/backend/data/firebase/Firebase';
import { MissingParametersError } from '@/backend/data/helpers/paramsFromAny';

export const loginError = (e: unknown, sessionManager: SessionManager) => {
  if (e instanceof AuthError) {
    return sessionManager.response(
      401,
      { message: 'E-mail ou senha incorretos' },
    );
  }

  if (e instanceof MissingParametersError) {
    return sessionManager.response(
      400,
      { message: 'Parâmetros obrigatórios não informados' },
    );
  }

  console.log(e);

  return sessionManager.response(
    400,
    { message: 'Um erro inesperado ocorreu' },
  );
};
