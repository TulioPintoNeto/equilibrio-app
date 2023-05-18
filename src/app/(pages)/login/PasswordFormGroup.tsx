import React from 'react';
import { Input } from '@/view/components/Input';
import { Label } from '@/view/components/Label';

export function PasswordFormGroup() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <Label htmlFor="password">Senha</Label>
        <div className="text-sm">
          {/* <a
        href="#"
        className="font-semibold text-indigo-600 hover:text-indigo-500"
      >
        Forgot password?
      </a> */}
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
