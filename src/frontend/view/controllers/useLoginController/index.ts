import { FormEvent } from 'react';
import { Credentials } from '@/domain/entities/Credentials';
import { login } from '@/frontend/domain/usecases/login';
import { useFormController } from '@/frontend/view/controllers/useFormController';
import { useAuthController } from '../useAuthController';

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
  const { mutate } = useAuthController();

  const formController = useFormController({
    entityBuilder: (event: LoginEvent) => new Credentials({
      email: event.target.email.value,
      password: event.target.password.value,
    }),
    functionUseCase: async (entity: Credentials) => {
      mutate(await login(entity));
    },
  });

  return {
    formController,
  };
};

export default useLoginController;
