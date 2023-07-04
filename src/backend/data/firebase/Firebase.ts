import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import {
  getAuth, sendPasswordResetEmail, signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  collection, getDocs, getFirestore, query,
} from 'firebase/firestore';
import { Credentials } from '@/domain/entities/Credentials';

export enum Databases {
  Students = '/students',
  Payments = '/payments',
}

export class Firebase {
  #options: FirebaseOptions;
  #app: FirebaseApp;

  constructor() {
    this.#options = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    };
    this.#app = initializeApp(this.#options);
  }

  get #auth() {
    return getAuth(this.#app);
  }

  get #firestore() {
    return getFirestore(this.#app);
  }

  async login(credentials: Credentials): Promise<void> {
    await signInWithEmailAndPassword(
      this.#auth,
      credentials.email,
      credentials.password,
    );
  }

  async forgotPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(this.#auth, email);
  }

  async readAll<T>(database: Databases): Promise<T[]> {
    const docRef = collection(this.#firestore, database);
    const q = query(docRef);
    const querySnapshot = await getDocs(q);
    const result: T[] = [];
    querySnapshot.forEach((doc) => result.push({ ...doc.data(), id: doc.id } as T));
    return result;
  }
}
