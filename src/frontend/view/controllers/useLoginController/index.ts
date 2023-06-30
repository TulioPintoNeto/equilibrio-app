import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Credentials } from '@/domain/entities/Credentials';
import { login } from '@/frontend/domain/usecases/login';
import { useFormController } from '@/frontend/view/controllers/useFormController';
import { Routes } from '@/frontend/core/routes';

interface Target extends EventTarget {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
}

export interface LoginEvent extends FormEvent {
  target: Target;
}

const useLoginController = () => {
  const router = useRouter();
  const formController = useFormController({
    entityBuilder: (event: LoginEvent) => new Credentials({
      email: event.target.email.value,
      password: event.target.password.value,
    }),
    functionUseCase: async (entity: Credentials) => {
      await login(entity);
      router.push(Routes.Home);
    },
  });

  return {
    formController,
  };
};

export default useLoginController;
