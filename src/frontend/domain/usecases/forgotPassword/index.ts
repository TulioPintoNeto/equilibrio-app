import { server } from '@/frontend/core/server';

const path = 'api/forgot-password';

export const forgotPassword = async (email: string): Promise<void> => {
  await server.post(
    path,
    { email },
  );
};
