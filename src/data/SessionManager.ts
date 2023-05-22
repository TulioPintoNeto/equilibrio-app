import { ServerResponse, IncomingMessage } from 'http';
import { getIronSession } from 'iron-session/edge';
import { Environment } from './Environment';
import { Session } from './Session';

export class SessionManager {
  #retryCount = 5;
  #req: IncomingMessage | Request;
  #res: ServerResponse<IncomingMessage> | Response;

  constructor(
    req: IncomingMessage | Request,
    res: ServerResponse<IncomingMessage> | Response,
  ) {
    this.#req = req;
    this.#res = res;
  }

  async #getSession(): Promise<Session | null> {
    const password = process.env.IRON_PASSWORD;
    const cookieName = process.env.IRON_COOKIE;

    if (!password || !cookieName) {
      return null;
    }

    const sessionParams = getIronSession(this.#req, this.#res, {
      password,
      cookieName,
      cookieOptions: {
        secure: Environment.isProduction(),
      },
    });

    return new Session(sessionParams);
  }

  get #retry() {
    return this.#retryCount > 0;
  }

  async #sessionRetrier(): Promise<Session | null> {
    try {
      const session = await this.#getSession();
      return session;
    } catch {
      this.#retryCount--;
      if (this.#retry) {
        return this.#sessionRetrier();
      }

      return {};
    }
  }

  get(): Promise<Session | null> {
    this.#retryCount = 5;

    return this.#sessionRetrier();
  }
}
