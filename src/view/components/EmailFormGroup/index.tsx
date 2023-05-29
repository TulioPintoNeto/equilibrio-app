import React from 'react';
import { Input } from '@/view/components/Input';
import { Label } from '@/view/components/Label';

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
