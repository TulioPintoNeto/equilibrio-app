import { NextRequest } from 'next/server';
import { Firebase } from '@/backend/data/firebase/Firebase';
import { getParams } from '@/backend/data/helpers/getParams';

interface BodyParams {
  email: string;
}

export const forgotPassword = async (req: NextRequest) => {
  const firebase = new Firebase();
  const { email } = await getParams<BodyParams>(['email']).fromBody(req);

  await firebase.forgotPassword(email);
};
