import { FormEvent } from 'react';
import { useFormController } from '@/core/useFormController';
import { forgotPassword } from '@/domain/usecases/forgotPassword';

interface Target extends EventTarget {
  email: {
    value: string;
  };
}

export interface ForgotPasswordEvent extends FormEvent {
  target: Target;
}

const useForgotPasswordController = () => useFormController({
  entityBuilder: (event: ForgotPasswordEvent) => event.target.email.value,
  functionUseCase: forgotPassword,
});

export default useForgotPasswordController;