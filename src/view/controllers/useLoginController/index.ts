import { FormEvent, useState } from 'react';
import { Login } from '@/domain/entities/Login';
import { login } from '@/domain/usecases/Login';
import {
  ErrorState, LoadingState, State, SuccessState,
} from '@/core/State';

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
  const [loginState, setLoginState] = useState<State<void>>();

  const executeLogin = async (entity: Login) => {
    setLoginState(new LoadingState());
    try {
      await login(entity);
      setLoginState(new SuccessState());
    } catch (error) {
      if (error instanceof Error) {
        setLoginState(new ErrorState(error.message));
      } else {
        setLoginState(ErrorState.Unnexpected());
      }
    }
  };

  const onSubmit = (event: unknown) => {
    const loginEvent = event as LoginEvent;
    loginEvent.preventDefault();
    const entity = new Login({
      email: loginEvent.target.email.value,
      password: loginEvent.target.password.value,
    });
    executeLogin(entity);
  };

  return {
    loginState,
    onSubmit,
  };
};

export default useLoginController;
