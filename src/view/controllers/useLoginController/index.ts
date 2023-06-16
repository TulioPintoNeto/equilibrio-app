import { FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Credentials } from '@/domain/entities/Credentials';
import { login } from '@/domain/usecases/login';
import { useFormController } from '@/core/useFormController';
import { SuccessState } from '@/core/State';

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
  const formController = useFormController({
    entityBuilder: (event: LoginEvent) => new Credentials({
      email: event.target.email.value,
      password: event.target.password.value,
    }),
    functionUseCase: login,
  });

  return {
    formController,
  };
};

export default useLoginController;
