import { NextRequest } from 'next/server';

export class MockNextRequest extends NextRequest {
  constructor(url: string) {
    super(new URL(url));
  }
}
