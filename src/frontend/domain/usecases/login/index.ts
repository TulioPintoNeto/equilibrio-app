import { Credentials } from '@/domain/entities/Credentials';
import { server } from '@/frontend/core/server';

const path = 'api/login';

export const login = async (credentials: Credentials): Promise<void> => {
  await server.post(
    path,
    credentials,
  );
};
