import { NextRequest } from 'next/server';
import { getParams } from '@/backend/data/helpers/getParams';
import { AuthRepository } from '@/backend/data/auth/AuthRepository';

interface BodyParams {
  email: string;
}

export const forgotPassword = async (req: NextRequest) => {
  const authRepository = new AuthRepository();
  const { email } = await getParams<BodyParams>(['email']).fromBody(req);

  await authRepository.forgotPassword(email);
};
