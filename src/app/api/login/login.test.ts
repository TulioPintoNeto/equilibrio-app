import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { POST } from './route';
import { EnvironmentMocking } from '@/test/EnvironmentMocking';

jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock('iron-session', () => ({
  ...jest.requireActual('iron-session'),
  getIronSession: jest.fn(),
}));

describe('login', () => {
  const credentials = {
    email: 'email',
    password: 'password',
  };
  const req = {
    json: async () => credentials,
  };
  const environmentMocking = new EnvironmentMocking();
  const mockSignInWithEmailAndPassword = signInWithEmailAndPassword as jest.Mock;
  const mockGetIronSession = getIronSession as jest.Mock;

  beforeEach(() => {
    environmentMocking.resetMock();
  });

  afterAll(() => {
    environmentMocking.resetToInitial();
  });

  it('should export a function named POST', () => {
    expect(POST.name).toBe('POST');
  });

  it('should call signInWithEmailAndPassword with credentials', async () => {
    const auth = {};
    const mockGetAuth = getAuth as jest.Mock;
    mockGetAuth.mockReturnValue(auth);

    await POST(req as NextRequest);

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
      auth,
      credentials.email,
      credentials.password,
    );
  });

  it('should return 200, set isLogged to true and save the session', async () => {
    const status = 200;
    process.env.IRON_COOKIE = 'cookie';
    process.env.IRON_PASSWORD = 'password';
    const session = {
      user: {
        isLogged: false,
      },
      save: jest.fn(),
    };
    mockGetIronSession.mockResolvedValue(session);

    const response = await POST(req as NextRequest);

    expect(session.user.isLogged).toBe(true);
    expect(session.save).toHaveBeenCalled();
    expect(response.status).toBe(status);
  });

  it('should return 401 if credentials are invalid', async () => {
    mockSignInWithEmailAndPassword.mockRejectedValue(new Error());

    const response = await POST(req as NextRequest);

    expect(response.status).toBe(401);
  });

  it('should return 400 if there are missing parameters', async () => {
    const reqWithoutParams = {
      json: async () => ({}),
    };

    const response = await POST(reqWithoutParams as NextRequest);

    expect(response.status).toBe(400);
  });
});
