import { NextRequest } from 'next/server';
import { Credentials } from '@/domain/entities/Credentials';

export class MissingReqBody extends Error {}

export const getCredentials = async (req: NextRequest): Promise<Credentials> => {
  const body = await req.json();

  console.log(body);
  if (!body.email || !body.password) {
    throw new MissingReqBody();
  }

  return body;
};
