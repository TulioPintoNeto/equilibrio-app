import { useRouter } from 'next/navigation';
import { logoff } from '@/frontend/domain/usecases/logoff';
import { Routes } from '@/frontend/core/routes';
import { useStateController } from '../useStateController';

export const useSideMenuController = () => {
  const router = useRouter();
  const { state, executeWithState } = useStateController();

  const handleLogoff = async () => {
    await executeWithState(
      async () => {
        await logoff();
        router.push(Routes.Login);
      },
    );
  };

  return { state, handleLogoff };
};
