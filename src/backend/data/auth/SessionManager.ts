import { IncomingMessage } from 'http';
import { createResponse, getIronSession } from 'iron-session';
import { Environment } from '../../../data/Environment';
import { Session, SessionParams } from './Session';

export class TooManyRetries extends Error {}

export class SessionManager {
  #retryCount = 5;
  #req: IncomingMessage | Request;
  #res: Response;

  constructor(
    req: IncomingMessage | Request,
    res: Response,
  ) {
    this.#req = req;
    this.#res = res;
  }

  get #retry() {
    return this.#retryCount > 0;
  }

  private static get options() {
    const cookieName = Environment.getVariable('IRON_COOKIE');
    const password = Environment.getVariable('IRON_PASSWORD');

    return {
      cookieName,
      password,
      cookieOptions: {
        secure: Environment.isProduction,
      },
    };
  }

  async #getSession(): Promise<Session> {
    const { options } = SessionManager;

    try {
      const sessionParams = await getIronSession<SessionParams>(
        this.#req,
        this.#res,
        options,
      );

      return new Session(sessionParams);
    } catch {
      this.#retryCount--;

      if (this.#retry) {
        const retry = await this.#getSession();
        return retry;
      }

      throw new TooManyRetries();
    }
  }

  get(): Promise<Session> {
    this.#retryCount = 5;

    return this.#getSession();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response(status: number, body: any) {
    createResponse(this.#res, JSON.stringify(body), { status });
  }
}
