'use client';

import React from 'react';
import { Header } from '@/app/(pages)/login/Header';
import { EmailFormGroup } from './EmailFormGroup';
import { PasswordFormGroup } from './PasswordFormGroup';
import useLoginController from '@/view/controllers/useLoginController';
import { FormPage } from '@/core/FormPage';

export default function Login() {
  return (
    <FormPage
      Header={Header}
      FormGroups={[
        EmailFormGroup,
        PasswordFormGroup,
      ]}
      controller={useLoginController}
    />
  );
}
