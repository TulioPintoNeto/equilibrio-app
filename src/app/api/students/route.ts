import { NextResponse } from 'next/server';
import { StorageRepository } from '@/backend/data/storage/StorageRepository';

export async function GET() {
  const storageRepository = new StorageRepository();

  try {
    const students = await storageRepository.readAllStudents();

    return NextResponse.json(students, { status: 200 });
  } catch (e) {
    return NextResponse.json(null, { status: 500 });
  }
}
