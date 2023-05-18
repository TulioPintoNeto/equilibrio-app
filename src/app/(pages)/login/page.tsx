'use client';

import React from 'react';
import { FormButton } from '@/view/components/Button';
import { Header } from '@/app/(pages)/login/Header';
import { EmailFormGroup } from './EmailFormGroup';
import { PasswordFormGroup } from './PasswordFormGroup';
import useLoginController from '@/view/controllers/useLoginController';

export default function Login() {
  const c = useLoginController();

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Header />
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={c.onSubmit}>
          <EmailFormGroup />
          <PasswordFormGroup />
          <div>
            <FormButton
              type="submit"
              text="Entrar"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
