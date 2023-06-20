import { server } from '@/core/server';
import { Credentials } from '@/domain/entities/Credentials';

const path = 'api/login';

export const login = async (credentials: Credentials): Promise<void> => {
  await server.post(
    path,
    credentials,
  );
};
