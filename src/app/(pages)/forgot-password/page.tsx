'use client';

import React from 'react';
import { FormPage } from '@/core/FormPage';
import { Header } from './Header';
import { EmailFormGroup } from '@/view/components/EmailFormGroup';
import useForgotPasswordController from '@/view/controllers/useForgotPasswordController';
import { SuccessState } from '@/core/State';
import { Feedback } from './Feedback';

export default function ForgotPassword() {
  const { formController } = useForgotPasswordController();

  if (formController.state instanceof SuccessState) {
    return (
      <Feedback />
    );
  }

  return (
    <FormPage
      buttonText="Enviar"
      controller={formController}
      FormGroups={[EmailFormGroup]}
      Header={Header}
    />
  );
}
