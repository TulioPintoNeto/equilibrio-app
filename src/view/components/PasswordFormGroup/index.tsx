import React from 'react';
import { Input } from '@/view/components/Input';
import { Label } from '@/view/components/Label';

interface Props {
  autoComplete?: boolean;
  forgotPasswordButton?: boolean;
}

function _PasswordFormGroup({ autoComplete = false, forgotPasswordButton = false }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label htmlFor="password">Senha</Label>
        {forgotPasswordButton && (
          <div className="text-sm">
            <a
              href="forgot-password"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Esqueceu a senha?
            </a>
          </div>
        )}
      </div>
      <div className="mt-2">
        <Input
          autoComplete={autoComplete ? 'current-password' : ''}
          name="password"
          type="password"
        />
      </div>
    </div>
  );
}

export function LoginPasswordFormGroup() {
  return <_PasswordFormGroup autoComplete forgotPasswordButton />;
}

export function RecoverPasswordFormGroup() {
  return <_PasswordFormGroup />;
}
