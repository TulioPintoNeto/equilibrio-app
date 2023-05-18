import { FormEvent } from 'react';
import { Login } from '@/domain/entities/Login';

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
  const onSubmit = (event: unknown) => {
    const loginEvent = event as LoginEvent;
    loginEvent.preventDefault();
    const login = new Login({
      email: loginEvent.target.email.value,
      password: loginEvent.target.password.value,
    });
    console.log(login);
  };

  return {
    onSubmit,
  };
};

export default useLoginController;
