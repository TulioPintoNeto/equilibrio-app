'use client';

import React from 'react';
import { FormPage } from '@/core/FormPage';
import useRecoverPasswordController from '@/view/controllers/useRecoverPasswordController';
import { Header } from './Header';
import { RecoverPasswordFormGroup } from '@/view/components/PasswordFormGroup';

export function RecoverPassword() {
  return (
    <FormPage
      buttonText="Redefinir"
      controller={useRecoverPasswordController}
      FormGroups={[
        RecoverPasswordFormGroup,
      ]}
      Header={Header}
    />
  );
}
