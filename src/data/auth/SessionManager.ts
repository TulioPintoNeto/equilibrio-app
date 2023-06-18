import { ServerResponse, IncomingMessage } from 'http';
import { getIronSession } from 'iron-session';
import { Environment } from '../Environment';
import { Session, SessionParams } from './Session';

export class TooManyRetries extends Error {}

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

  get #retry() {
    return this.#retryCount > 0;
  }

  async #getSession(): Promise<Session> {
    const password = Environment.getVariable('IRON_PASSWORD');
    const cookieName = Environment.getVariable('IRON_COOKIE');

    try {
      const sessionParams = await getIronSession<SessionParams>(
        this.#req,
        this.#res,
        {
          password,
          cookieName,
          cookieOptions: {
            secure: Environment.isProduction,
          },
        },
      );

      return new Session(sessionParams);
    } catch {
      this.#retryCount--;

      if (this.#retry) {
        return this.#getSession();
      }

      throw new TooManyRetries();
    }
  }

  get(): Promise<Session> {
    this.#retryCount = 5;

    return this.#getSession();
  }
}
