/* eslint-disable dot-notation */
import { IncomingMessage } from 'http';
import { createResponse, getIronSession } from 'iron-session';
import { Environment } from '@/data/Environment';
import { AuthManager } from './AuthManager';
import { User } from '@/domain/entities/User';

export interface SessionParams {
  user: User;
  destroy: () => Promise<void>;
  save: () => Promise<void>;
}

export class TooManyRetries extends Error {}
export class EnvVariableNotFound extends Error {}

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

  private static get env() {
    const cookieName = process.env.IRON_COOKIE;
    const password = process.env.IRON_PASSWORD;

    if (!cookieName || !password) {
      throw new EnvVariableNotFound();
    }

    return {
      cookieName,
      password,
    };
  }

  private static get options() {
    const securityTimeToExpireBefore = 60;

    return {
      ...this.env,
      cookieOptions: {
        secure: Environment.isProduction,
        maxAge: AuthManager.ageOfSession - securityTimeToExpireBefore,
      },
    };
  }

  async #getSession(): Promise<SessionParams> {
    const { options } = SessionManager;

    try {
      const sessionParams = await getIronSession<SessionParams>(
        this.#req,
        this.#res,
        options,
      );

      return sessionParams;
    } catch {
      this.#retryCount--;

      if (this.#retry) {
        const retry = await this.#getSession();
        return retry;
      }

      throw new TooManyRetries();
    }
  }

  get(): Promise<SessionParams> {
    this.#retryCount = 5;

    return this.#getSession();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response(status: number, body: any) {
    return createResponse(this.#res, JSON.stringify(body), { status });
  }
}
