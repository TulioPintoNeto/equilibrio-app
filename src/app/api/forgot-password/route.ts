import { NextRequest, NextResponse } from 'next/server';
import { forgotPassword } from './forgotPassword';

export async function POST(req: NextRequest) {
  try {
    await forgotPassword(req);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e: unknown) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
