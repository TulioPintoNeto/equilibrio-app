import { NextRequest } from 'next/server';
import { getParams } from '@/backend/data/helpers/getParams';
import { Credentials } from '@/domain/entities/Credentials';
import { AuthManager } from '@/backend/data/auth/AuthManager';

export const login = async (req: NextRequest): Promise<void> => {
  const authManager = new AuthManager();
  const credentials = await getParams<Credentials>(['email', 'password']).fromBody(req);

  await authManager.login(credentials);
};
