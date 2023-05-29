import Image from 'next/image';
import React from 'react';
import EquilibrioLogo from '@/assets/equilibrio-academia-logo.png';
import { Title } from '@/view/components/Title';

export function Header() {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <Image
        className="mx-auto"
        src={EquilibrioLogo}
        alt="Your Company"
        width={140}
      />
      <Title text="Entre em sua conta" />
    </div>
  );
}
