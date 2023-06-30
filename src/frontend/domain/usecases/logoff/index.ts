import { server } from '@/frontend/core/server';

const path = 'api/logoff';

export const logoff = (): Promise<void> => server.post(path);
