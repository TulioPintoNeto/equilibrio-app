import { AuthError } from '@/backend/data/auth/AuthRepository';
import { SessionRepository } from '@/backend/data/auth/SessionRepository';
import { MissingParametersError } from '@/backend/data/helpers/getParams';

export const loginError = (e: unknown, sessionRepository: SessionRepository) => {
  if (e instanceof AuthError) {
    return sessionRepository.response(
      401,
      { message: 'E-mail ou senha incorretos' },
    );
  }

  if (e instanceof MissingParametersError) {
    return sessionRepository.response(
      400,
      { message: 'Parâmetros obrigatórios não informados' },
    );
  }

  return sessionRepository.response(
    400,
    { message: 'Um erro inesperado ocorreu' },
  );
};
