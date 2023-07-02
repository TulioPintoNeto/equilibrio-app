import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useSWR from 'swr';
import { Routes } from '@/frontend/core/routes';
import { User } from '@/domain/entities/User';

const noAuthRoutes = [
  Routes.ForgotPassword,
];

export const useAuthController = () => {
  const { data: user, mutate, isLoading } = useSWR<User>('/api/user');
  const pathname = usePathname();
  const router = useRouter();
  const noAuth = noAuthRoutes.some((route) => route === pathname);

  useEffect(() => {
    if (noAuth) return;

    if (pathname !== Routes.Login && !user?.isLogged) {
      router.push(Routes.Login);
    }

    if (user?.isLogged) {
      router.push(Routes.Home);
    }
  }, [noAuth, pathname, router, user]);

  return { isLoading, mutate };
};
