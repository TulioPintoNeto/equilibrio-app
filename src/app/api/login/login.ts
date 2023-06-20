import { NextRequest } from 'next/server';
import { Firebase } from '@/backend/data/firebase/Firebase';
import { getParams } from '@/backend/data/helpers/paramsFromAny';
import { Credentials } from '@/domain/entities/Credentials';

export const login = async (req: NextRequest): Promise<void> => {
  const firebase = new Firebase();
  const credentials = await getParams<Credentials>(['email', 'password']).fromBody(req);

  await firebase.login(credentials);
};
