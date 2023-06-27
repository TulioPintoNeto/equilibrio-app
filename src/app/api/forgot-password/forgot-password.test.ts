import { NextRequest, NextResponse } from 'next/server';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { POST } from './route';

jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  getAuth: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
}));

describe('forgot-password', () => {
  const email = 'email@email.com';
  const body = { email };
  const req = {
    json: async () => body,
  };
  const mockSendPasswordResetEmail = sendPasswordResetEmail as jest.Mock;

  it('should export a function named POST', () => {
    expect(POST.name).toBe('POST');
  });

  it('should call sendPasswordResetEmail with email', async () => {
    const auth = {};
    const mockGetAuth = getAuth as jest.Mock;
    mockGetAuth.mockReturnValue(auth);

    await POST(req as NextRequest);

    expect(mockSendPasswordResetEmail).toHaveBeenCalledWith(
      auth,
      email,
    );
  });

  it('should return success', async () => {
    const success = NextResponse.json({ success: true }, { status: 200 });

    const response = await POST(req as NextRequest);

    expect(response.status).toEqual(success.status);
  });

  it('should return failure', async () => {
    mockSendPasswordResetEmail.mockRejectedValue(new Error('error'));
    const failure = NextResponse.json({ success: false }, { status: 500 });

    const response = await POST(req as NextRequest);

    expect(response.status).toEqual(failure.status);
  });
});
