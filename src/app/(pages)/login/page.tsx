import React from 'react';
import Image from 'next/image';
import { Input } from '@/view/components/Input';
import { Label } from '@/view/components/Label';
import EquilibrioLogo from '@/assets/equilibrio-academia-logo.png';
import { FormButton } from '@/view/components/Button';

export default function Login() {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto"
          src={EquilibrioLogo}
          alt="Your Company"
          width={140}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Entre em sua conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <Label htmlFor="email">Endereço de E-mail</Label>
            <div className="mt-2">
              <Input autoComplete="email" name="email" type="email" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <div className="text-sm">
                {/* <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a> */}
              </div>
            </div>
            <div className="mt-2">
              <Input
                autoComplete="current-password"
                name="password"
                type="password"
              />
            </div>
          </div>

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
