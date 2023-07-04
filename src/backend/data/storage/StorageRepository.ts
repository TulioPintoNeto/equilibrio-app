import { Databases, Firebase } from '../firebase/Firebase';
import { StudentFirebase, studentsFromFirebase } from '../firebase/studentsFromFirebase';

export class StorageError extends Error {}

export class StorageRepository {
  #firebase: Firebase;

  constructor() {
    this.#firebase = new Firebase();
  }

  async readAllStudents() {
    try {
      const studentsFirebase = await this.#firebase.readAll<StudentFirebase>(Databases.Students);
      return studentsFromFirebase(studentsFirebase);
    } catch {
      throw new StorageError();
    }
  }
}
