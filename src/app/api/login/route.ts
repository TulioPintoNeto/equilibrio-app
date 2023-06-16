import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { login } from './login';
import { MissingParameters } from './paramsFromURL';
import { AuthError } from '@/data/firebase/Firebase';

export async function GET(req: NextApiRequest) {
  try {
    const result = await login(req);
    return NextResponse.json({ success: result }, { status: 200 });
  } catch (e: unknown) {
    if (e instanceof AuthError) {
      return NextResponse.json(
        { message: 'E-mail ou senha incorretos' },
        { status: 401 },
      );
    }

    if (e instanceof MissingParameters) {
      return NextResponse.json(
        { message: 'Parâmetros obrigatórios não informados' },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: 'Um erro inesperado ocorreu' },
      { status: 400 },
    );
  }
}
