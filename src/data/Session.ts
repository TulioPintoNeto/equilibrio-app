import { ServerResponse, IncomingMessage } from 'http';
import { getIronSession } from 'iron-session/edge';
import { Environment } from './Environment';

export class Session {
  #retryCount: number = 5;
  #req: IncomingMessage | Request;
  #res: ServerResponse<IncomingMessage> | Response;

  constructor(
    req: IncomingMessage | Request,
    res: ServerResponse<IncomingMessage> | Response,
  ) {
    this.#req = req;
    this.#res = res;
  }

  async #getSession(): Promise<any> {
    const password = process.env.IRON_PASSWORD;
    const cookieName = process.env.IRON_COOKIE;

    if (!password || !cookieName) {
      return null;
    }

    return getIronSession(this.#req, this.#res, {
      password,
      cookieName,
      cookieOptions: {
        secure: Environment.isProduction(),
      },
    });
  }

  get #retry() {
    return this.#retryCount > 0;
  }

  async #sessionRetrier(): Promise<any> {
    try {
      const session = await this.#getSession();
      return session;
    } catch {
      this.#retryCount--;
      if (this.#retry) {
        return this.#sessionRetrier();
      }

      return null;
    }
  }

  get(): Promise<any> {
    this.#retryCount = 5;

    return this.#sessionRetrier();
  }
}
