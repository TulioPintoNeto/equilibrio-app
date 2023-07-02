import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useSWR from 'swr';
import { Routes } from '@/frontend/core/routes';
import { User } from '@/domain/entities/User';

const noAuthRoutes = [
  Routes.ForgotPassword, Routes.Login,
];

export const useAuthController = () => {
  const { data: user, mutate, isLoading } = useSWR<User>('/api/user');
  const pathname = usePathname();
  const router = useRouter();
  const isNoAuthRoute = noAuthRoutes.some((route) => route === pathname);
  const requiresAuth = !isNoAuthRoute;

  useEffect(() => {
    if (requiresAuth && !user?.isLogged) {
      router.push(Routes.Login);
    }

    if (user?.isLogged) {
      router.push(Routes.Home);
    }
  }, [requiresAuth, pathname, router, user]);

  return { isLoading, mutate };
};
