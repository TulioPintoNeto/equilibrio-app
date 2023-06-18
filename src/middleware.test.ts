import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { mockSession } from './backend/mockGenerators/mockSession';
import { MockNextRequest } from './backend/mocks/NextRequest';
import { middleware } from './middleware';
import { Logger } from './data/Logger';
import { EnvironmentMocking } from './core/testUtils/EnvironmentMocking';

jest.mock('iron-session', () => ({
  getIronSession: jest.fn(),
}));

describe('middleware', () => {
  const environmentMocking = new EnvironmentMocking();
  const mockGetIronSession = getIronSession as jest.Mock;
  const mockLog = jest.fn();

  const requestUrl = 'https://localhost:3000/';
  const req = new MockNextRequest(requestUrl);

  const setEnvVariables = () => {
    process.env.IRON_COOKIE = 'test';
    process.env.IRON_PASSWORD = 'test';
  };

  beforeEach(() => {
    environmentMocking.resetMock();
    Logger.log = mockLog;
  });

  afterAll(() => {
    environmentMocking.resetToInitial();
  });

  it('should redirect the response and log unauthorized message', async () => {
    mockGetIronSession.mockResolvedValue(mockSession({ isLogged: false }));
    setEnvVariables();
    const result = await middleware(req);

    expect(mockLog).toBeCalledWith('Unauthorized error occurred in middleware');
    expect(result).toEqual(
      NextResponse
        .redirect(new URL('/login', req.url)),
    );
  });

  it('should redirect the response and log missing env variable message', async () => {
    mockGetIronSession.mockRejectedValue(new Error(''));
    const result = await middleware(req);

    expect(mockLog).toBeCalledWith('Unauthorized error occurred in middleware');
    expect(mockLog).toBeCalledWith('Environment variable not found in middleware');
    expect(result).toEqual(
      NextResponse
        .redirect(new URL('/login', req.url)),
    );
  });

  it('should redirect the response and log too many retries message', async () => {
    mockGetIronSession.mockRejectedValue(
      new Error(''),
    );
    setEnvVariables();
    const result = await middleware(req);

    expect(mockLog).toBeCalledWith('Too many retries in middleware');
    expect(result).toEqual(
      NextResponse
        .redirect(new URL('/login', req.url)),
    );
  });
});
