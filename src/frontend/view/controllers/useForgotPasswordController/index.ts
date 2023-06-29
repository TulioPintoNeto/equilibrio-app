import { FormEvent } from 'react';
import { useFormController } from '@/frontend/view/controllers/useFormController';
import { forgotPassword } from '@/frontend/domain/usecases/forgotPassword';

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
