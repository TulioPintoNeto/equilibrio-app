import Image from 'next/image';
import React from 'react';
import EquilibrioLogo from '@/assets/equilibrio-academia-logo.png';

export function Header() {
  return (
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
  );
}
