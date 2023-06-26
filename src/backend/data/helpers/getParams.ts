import { NextRequest } from 'next/server';

export class MissingParametersError extends Error {}

type Assessor = (key: string) => string | null;

export const paramsFromAny = <T>(keys: string[], assessor: Assessor): T => {
  const values = keys.map((key) => [key, assessor(key)]);

  if (values.some((array) => !array[1])) {
    throw new MissingParametersError();
  }

  return Object.fromEntries(values);
};

const paramsFromBody = <T>(keys: string[]) => async (req: NextRequest): Promise<T> => {
  const body = await req.json();
  const assessor = (key: string) => body[key];
  return paramsFromAny<T>(keys, assessor);
};

const paramsFromURL = <T>(keys: string[]) => (urlString: string): T => {
  const url = new URL(urlString);
  return paramsFromAny<T>(keys, url.searchParams.get);
};

export const getParams = <T>(keys: string[]) => ({
  fromBody: paramsFromBody<T>(keys),
  fromURL: paramsFromURL<T>(keys),
});
