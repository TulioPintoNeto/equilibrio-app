import React from 'react';
import { Input } from '@/view/components/Input';
import { Label } from '@/view/components/Label';

export function PasswordFormGroup() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label htmlFor="password">Senha</Label>
        <div className="text-sm">
          <a
            href="forgot-password"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Esqueceu a senha?
          </a>
        </div>
      </div>
      <div className="mt-2">
        <Input
          autoComplete="current-password"
          name="password"
          type="password"
        />
      </div>
    </div>
  );
}
