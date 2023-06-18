import { getIronSession } from 'iron-session';
import { SessionManager, TooManyRetries } from './SessionManager';
import { Session } from './Session';
import { EnvVariableNotFound } from '../Environment';

jest.mock('iron-session', () => ({
  getIronSession: jest.fn(),
}));
const mockGetIronSession = getIronSession as jest.Mock;

describe('SessionManager', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    mockGetIronSession.mockReset();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  const getSession = () => new SessionManager({} as Request, {} as Response).get();

  describe('success', () => {
    const testSession = new Session({
      isLogged: true,
    });

    it('should return session object', async () => {
      process.env.IRON_PASSWORD = 'password';
      process.env.IRON_COOKIE = 'cookie';
      mockGetIronSession.mockResolvedValue(testSession);

      const result = await getSession();

      expect(result).toStrictEqual(testSession);
    });
  });

  describe('failure', () => {
    it('should return null if no env variables', async () => {
      expect.assertions(1);

      await expect(() => getSession()).rejects.toThrow(EnvVariableNotFound);
    });

    it('should retry at least 5 times if getIronSession throw an error', async () => {
      mockGetIronSession.mockRejectedValue(new Error());
      process.env.IRON_PASSWORD = 'password';
      process.env.IRON_COOKIE = 'cookie';

      await expect(() => getSession()).rejects.toThrow(TooManyRetries);
      expect(mockGetIronSession).toHaveBeenCalledTimes(5);
    });
  });
});
