'use client';

import React from 'react';
import { FormPage } from '@/core/FormPage';
import { Header } from './Header';
import { EmailFormGroup } from '@/view/components/EmailFormGroup';
import useForgotPasswordController from '@/view/controllers/useForgotPasswordController';

export default function ForgotPassword() {
  const { formController } = useForgotPasswordController();

  return (
    <FormPage
      buttonText="Enviar"
      controller={formController}
      FormGroups={[EmailFormGroup]}
      Header={Header}
    />
  );
}
