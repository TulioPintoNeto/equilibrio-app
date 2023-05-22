import { FormEvent } from 'react';
import { Credentials } from '@/domain/entities/Credentials';
import { login } from '@/domain/usecases/login';
import { useFormController } from '@/core/useFormController';

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

const useLoginController = () => useFormController({
  entityBuilder: (event: LoginEvent) => new Credentials({
    email: event.target.email.value,
    password: event.target.password.value,
  }),
  functionUseCase: login,
});

export default useLoginController;
