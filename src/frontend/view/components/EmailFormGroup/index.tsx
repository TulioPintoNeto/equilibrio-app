import React from 'react';
import { Label } from '../Label';
import { Input } from '../Input';

export function EmailFormGroup() {
  return (
    <div>
      <Label htmlFor="email">Endereço de E-mail</Label>
      <div className="mt-2">
        <Input autoComplete="email" name="email" type="email" />
      </div>
    </div>
  );
}
