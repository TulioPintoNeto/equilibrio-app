import { FormEvent } from 'react';
import { useFormController } from '@/core/useFormController';
import { forgotPassword } from '@/domain/usecases/forgotPassword';

interface Target extends EventTarget {
  email: {
    value: string;
  };
}

export interface LoginEvent extends FormEvent {
  target: Target;
}

const useForgotPasswordController = () => {
  const formController = useFormController({
    entityBuilder: (event: LoginEvent) => event.target.email.value,
    functionUseCase: forgotPassword,
  });

  return {
    formController,
  };
};

export default useForgotPasswordController;
