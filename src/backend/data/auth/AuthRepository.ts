import { Credentials } from '@/domain/entities/Credentials';
import { Firebase } from '../firebase/Firebase';

export class AuthError extends Error {}
export class ForgotPasswordError extends Error {}

export class AuthRepository {
  #firebase: Firebase;
  static #ageOfFirebaseSession = 60 * 60;

  constructor() {
    this.#firebase = new Firebase();
  }

  static get ageOfSession() {
    return AuthRepository.#ageOfFirebaseSession;
  }

  async login(credentials: Credentials): Promise<void> {
    try {
      await this.#firebase.login(credentials);
    } catch (e) {
      throw new AuthError();
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      await this.#firebase.forgotPassword(email);
    } catch (e) {
      throw new ForgotPasswordError();
    }
  }
}
