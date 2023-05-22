import { NextRequest, NextResponse } from 'next/server';
import { SessionManager } from './data/SessionManager';
import { middleware, unauthorizedUrl } from './middleware';

const requestUrl = 'https://localhost:3000/';
jest.mock('next/server', () => ({
  NextRequest: jest.fn(() => ({ url: requestUrl })),
  NextResponse: { next: jest.fn(), redirect: jest.fn() },
}));
jest.mock('./data/Session', () => ({
  Session: jest.fn(),
}));
const MockSession = SessionManager as jest.Mock;
const MockNextRequest = NextRequest as jest.Mock;
const mockNext = NextResponse.next as jest.Mock;
const mockRedirect = NextResponse.redirect as jest.Mock;

describe('middleware', () => {
  const req = MockNextRequest();

  it('if no user, should redirect the response', async () => {
    const emptySession = {};
    const res = {};
    const redirectRes = {};
    const mockGet = jest.fn(() => emptySession);
    const testUnauthorizedUrl = unauthorizedUrl(requestUrl);
    mockNext.mockReturnValue(res);
    MockSession.mockImplementation(() => ({
      get: mockGet,
    }));
    mockRedirect.mockReturnValue(redirectRes);

    const result = await middleware(req);

    expect(mockNext).toBeCalled();
    expect(MockSession).toBeCalledWith(req, res);
    expect(mockGet).toBeCalled();
    expect(mockRedirect).toBeCalledWith(testUnauthorizedUrl);
    expect(result).toBe(redirectRes);
  });
});
