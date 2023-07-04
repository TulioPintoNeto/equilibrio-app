import { Timestamp } from 'firebase/firestore';
import { Student } from '@/domain/entities/Student';

export interface StudentFirebase {
  id: string;
  name: string;
  birthdate: Timestamp;
  cpf: number;
}

export const studentsFromFirebase = (
  studentsFirebase: StudentFirebase[],
): Student[] => studentsFirebase
  .map((studentFirebase) => ({
    ...studentFirebase,
    birthdate: studentFirebase.birthdate.toDate(),
  }));
