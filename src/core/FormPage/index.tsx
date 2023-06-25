import React, { JSX } from 'react';
import { FormButton } from '@/view/components/Button';
import { FormControllerOutput } from '../useFormController';
import { ErrorState, LoadingState } from '../State';

type Component = () => JSX.Element;

interface Props {
  buttonText: string;
  controller: FormControllerOutput;
  FormGroups: Component[];
  Header: Component;
}

export function FormPage({
  buttonText,
  controller,
  FormGroups,
  Header,
}: Props) {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Header />
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={controller.onSubmit}>
          {FormGroups.map((FormGroup) => (
            <div key={FormGroup.name}>
              <FormGroup />
            </div>
          ))}
          <div>
            <FormButton
              loading={controller.state instanceof LoadingState}
              type="submit"
              text={buttonText}
            />
          </div>
          {controller.state instanceof ErrorState && (
            <p className="text-red-500 text-xs italic absolute">
              {controller.state.error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
