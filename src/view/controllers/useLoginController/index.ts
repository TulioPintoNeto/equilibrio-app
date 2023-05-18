import { FormEvent } from 'react';
import { Login } from '@/domain/entities/Login';
import { login } from '@/domain/usecases/Login';
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
  target: Target
}

const useLoginController = () => {
  const {
    state,
    onSubmit,
  } = useFormController<void, LoginEvent, Login>({
    entityBuilder: (event: LoginEvent) => new Login({
      email: event.target.email.value,
      password: event.target.password.value,
    }),
    functionUseCase: login,
  });

  return {
    loginState: state,
    onSubmit,
  };
};

export default useLoginController;
