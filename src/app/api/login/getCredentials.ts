import { NextRequest } from 'next/server';
import { Credentials } from '@/domain/entities/Credentials';
import { paramsFromURL } from './paramsFromURL';

export class MissingURL extends Error {}

export const getCredentials = (req: NextRequest) => {
  if (!req.url) {
    throw new MissingURL();
  }

  const params = ['email', 'password'];
  return paramsFromURL<Credentials>(req.url, params);
};
