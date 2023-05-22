import React, { JSX } from 'react';
import { FormButton } from '@/view/components/Button';
import { FormControllerOutput } from '../useFormController';

type Component = () => JSX.Element;

interface Props {
  Header: Component;
  FormGroups: Component[];
  controller: () => FormControllerOutput;
}

export function FormPage({ Header, FormGroups, controller }: Props) {
  const c = controller();

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Header />
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={c.onSubmit}>
          {FormGroups.map((FormGroup) => (
            <div key={FormGroup.name}>
              <FormGroup />
            </div>
          ))}
          <div>
            <FormButton type="submit" text="Entrar" />
          </div>
        </form>
      </div>
    </div>
  );
}
