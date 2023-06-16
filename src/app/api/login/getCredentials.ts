import { NextApiRequest } from 'next';
import { Credentials } from '@/domain/entities/Credentials';
import { paramsFromURL } from './paramsFromURL';

export class MissingURL extends Error {}

export const getCredentials = (req: NextApiRequest) => {
  if (!req.url) {
    throw new MissingURL();
  }

  const params = ['email', 'password'];
  return paramsFromURL<Credentials>(req.url, params);
};
