'use client';

import React from 'react';
import { Header } from '@/app/(pages)/login/Header';
import { PasswordFormGroup } from './PasswordFormGroup';
import useLoginController from '@/view/controllers/useLoginController';
import { FormPage } from '@/core/FormPage';
import { EmailFormGroup } from '@/view/components/EmailFormGroup';

export default function Login() {
  return (
    <FormPage
      buttonText="Entrar"
      controller={useLoginController}
      FormGroups={[
        EmailFormGroup,
        PasswordFormGroup,
      ]}
      Header={Header}
    />
  );
}
