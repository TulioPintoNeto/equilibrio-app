import { FormEvent } from 'react';
import { useFormController } from '@/core/useFormController';
import { recoverPassword } from '@/domain/usecases/recoverPassword';

interface Target extends EventTarget {
  password: {
    value: string;
  };
}

export interface RecoverPasswordEvent extends FormEvent {
  target: Target;
}

const useRecoverPasswordController = () => useFormController({
  entityBuilder: (event: RecoverPasswordEvent) => event.target.password.value,
  functionUseCase: recoverPassword,
});

export default useRecoverPasswordController;
