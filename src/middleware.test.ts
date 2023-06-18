import { NextResponse } from 'next/server';
import { mockSession } from './backend/mock-generators/mockSession';
import { MockNextRequest } from './backend/mocks/NextRequest';
import { middleware } from './middleware';

jest.mock('iron-session', () => ({
  getIronSession: jest.fn(),
}));

describe('middleware', () => {
  const mockGetIronSession = jest.fn();

  const requestUrl = 'https://localhost:3000/';
  const req = new MockNextRequest(requestUrl);

  it('should redirect the response', async () => {
    mockGetIronSession.mockResolvedValue(mockSession({ isLogged: false }));
    const result = await middleware(req);

    expect(result).toEqual(
      NextResponse
        .redirect(new URL('/login', req.url)),
    );
  });
});
