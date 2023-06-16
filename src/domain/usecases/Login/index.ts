import { server } from '@/core/server';
import { Credentials } from '@/domain/entities/Credentials';

const path = 'api/login';

interface Response {
  result: true,
}

export const login = async (credentials: Credentials): Promise<void> => {
  await server.get<Response>(path, {
    params: credentials,
  });
};
