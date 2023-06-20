export class MissingParameters extends Error {}

export const paramsFromURL = <T>(urlString: string, keys: string[]): T => {
  const url = new URL(urlString);
  const values = keys.map((key) => [key, url.searchParams.get(key)]);

  if (values.some((array) => !array[1])) {
    throw new MissingParameters();
  }

  return Object.fromEntries(values);
};
