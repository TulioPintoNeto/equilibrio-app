import { NextRequest } from 'next/server';
import { Firebase } from '@/backend/data/firebase/Firebase';
import { getCredentials } from './getCredentials';

export const login = async (req: NextRequest): Promise<void> => {
  const firebase = new Firebase();
  const credentials = getCredentials(req);

  await firebase.login(credentials);
};
