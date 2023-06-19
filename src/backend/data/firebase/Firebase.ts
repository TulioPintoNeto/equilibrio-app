import { FirebaseOptions, initializeApp } from 'firebase/app';
import {
  Auth, getAuth, signInWithEmailAndPassword,
} from 'firebase/auth';
import { Credentials } from '@/domain/entities/Credentials';

export class AuthError extends Error {}

export class Firebase {
  #options: FirebaseOptions;
  #auth: Auth;

  constructor() {
    this.#options = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    };
    const app = initializeApp(this.#options);
    this.#auth = getAuth(app);
  }

  async login(credentials: Credentials): Promise<void> {
    try {
      await signInWithEmailAndPassword(
        this.#auth,
        credentials.email,
        credentials.password,
      );
    } catch (e) {
      throw new AuthError();
    }
  }
}
