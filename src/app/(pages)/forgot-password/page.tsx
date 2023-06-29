'use client';

import React from 'react';
import { FormPage } from '@/frontend/view/components/FormPage';
import { Header } from './Header';
import { SuccessState } from '@/frontend/core/State';
import { Feedback } from './Feedback';
import useForgotPasswordController from '@/frontend/view/controllers/useForgotPasswordController';
import { EmailFormGroup } from '@/frontend/view/components/EmailFormGroup';

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
