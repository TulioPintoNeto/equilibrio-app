'use client';

import React from 'react';
import { Header } from '@/app/(pages)/login/Header';
import { FormPage } from '@/frontend/view/components/FormPage';
import { EmailFormGroup } from '@/frontend/view/components/EmailFormGroup';
import { LoginPasswordFormGroup } from '@/frontend/view/components/PasswordFormGroup';
import useLoginController from '@/frontend/view/controllers/useLoginController';

export default function Login() {
  const { formController } = useLoginController();

  return (
    <FormPage
      buttonText="Entrar"
      controller={formController}
      FormGroups={[
        EmailFormGroup,
        LoginPasswordFormGroup,
      ]}
      Header={Header}
    />
  );
}
