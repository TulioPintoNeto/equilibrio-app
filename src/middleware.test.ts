import { NextRequest, NextResponse } from 'next/server';
import { middleware, unauthorizedUrl } from './middleware';

const requestUrl = 'https://localhost:3000/';
jest.mock('next/server', () => ({
  NextRequest: jest.fn(() => ({ url: requestUrl })),
  NextResponse: { next: jest.fn(), redirect: jest.fn() },
}));
jest.mock('./data/Session', () => ({
  Session: jest.fn(),
}));
jest.mock('iron-session/edge', () => ({
  getIronSession: jest.fn(),
}));
const MockNextRequest = NextRequest as jest.Mock;
const mockNext = NextResponse.next as jest.Mock;
const mockRedirect = NextResponse.redirect as jest.Mock;

describe('middleware', () => {
  const req = MockNextRequest();

  it('if no user, should redirect the response', async () => {
    const res = {};
    const redirectRes = {};
    const testUnauthorizedUrl = unauthorizedUrl(requestUrl);
    mockNext.mockReturnValue(res);
    mockRedirect.mockReturnValue(redirectRes);

    const result = await middleware(req);

    expect(mockNext).toBeCalled();
    expect(mockRedirect).toBeCalledWith(testUnauthorizedUrl);
    expect(result).toBe(redirectRes);
  });
});
