import { usePathname, useRouter } from 'next/navigation';
import useSWR from 'swr';
import { renderHook } from '@testing-library/react';
import { Routes } from '@/frontend/core/routes';
import { useAuthController } from '.';

jest.mock('swr');
jest.mock('next/navigation');

describe('useAuthController', () => {
  const mockUseSWR = useSWR as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;
  const mockUsePathname = usePathname as jest.Mock;
  const mockPush = jest.fn();
  mockUseRouter.mockReturnValue({ push: mockPush });
  mockUseSWR.mockImplementation(() => ({}));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to login if unauthenticated', () => {
    mockUsePathname.mockReturnValue(Routes.Home);
    mockUseSWR.mockImplementation(() => ({
      data: null,
    }));

    renderHook(() => useAuthController());

    expect(mockPush).toBeCalledWith(Routes.Login);
  });

  describe('login-route', () => {
    it('should not redirect if not authenticated', () => {
      mockUsePathname.mockReturnValue(Routes.Login);

      renderHook(() => useAuthController());

      expect(mockPush).not.toBeCalled();
    });

    it('should redirect if authenticated', () => {
      mockUsePathname.mockReturnValue(Routes.Login);
      mockUseSWR.mockImplementation(() => ({
        data: { isLogged: true },
      }));

      renderHook(() => useAuthController());

      expect(mockPush).toBeCalledWith(Routes.Home);
    });
  });
});
