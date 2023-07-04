import { NextRequest } from 'next/server';
import { getParams } from '@/backend/data/helpers/getParams';
import { Credentials } from '@/domain/entities/Credentials';
import { AuthRepository } from '@/backend/data/auth/AuthRepository';

export const login = async (req: NextRequest): Promise<void> => {
  const authRepository = new AuthRepository();
  const credentials = await getParams<Credentials>(['email', 'password']).fromBody(req);

  await authRepository.login(credentials);
};
