import { NextApiRequest } from 'next';
import { Firebase } from '@/data/firebase/Firebase';
import { getCredentials } from './getCredentials';

export const login = async (req: NextApiRequest): Promise<boolean> => {
  const firebase = new Firebase();
  const credentials = getCredentials(req);
  return firebase.login(credentials);
};
