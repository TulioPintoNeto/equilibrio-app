import { Credentials } from '@/domain/entities/Credentials';
import { User } from '@/domain/entities/User';
import { server } from '@/frontend/core/server';

const path = 'api/login';

export const login = async (credentials: Credentials): Promise<User> => {
  const response = await server.post<User>(
    path,
    credentials,
  );

  return response.data;
};
