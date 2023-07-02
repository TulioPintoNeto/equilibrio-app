import { Credentials } from '@/domain/entities/Credentials';
import { Firebase } from '../firebase/Firebase';

export class AuthManager {
  #firebase: Firebase;
  static #ageOfFirebaseSession = 60 * 60;

  constructor() {
    this.#firebase = new Firebase();
  }

  static get ageOfSession() {
    return AuthManager.#ageOfFirebaseSession;
  }

  async login(credentials: Credentials): Promise<void> {
    await this.#firebase.login(credentials);
  }

  async forgotPassword(email: string): Promise<void> {
    await this.#firebase.forgotPassword(email);
  }
}
