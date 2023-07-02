import { NextRequest } from 'next/server';
import { getParams } from '@/backend/data/helpers/getParams';
import { AuthManager } from '@/backend/data/auth/AuthManager';

interface BodyParams {
  email: string;
}

export const forgotPassword = async (req: NextRequest) => {
  const authManager = new AuthManager();
  const { email } = await getParams<BodyParams>(['email']).fromBody(req);

  await authManager.forgotPassword(email);
};
