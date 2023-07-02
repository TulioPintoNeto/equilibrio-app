'use client';

import React from 'react';
import { SideMenu } from '@/frontend/view/components/SideMenu';
import { HomeList } from '@/frontend/view/components/HomeList';

export default function Home() {
  return (
    <>
      <SideMenu />
      <div className="p-4 sm:ml-64">
        <div className="grid grid-cols-2 gap-4">
          <HomeList dateHeader="Vencido em" title="Pendências" />
          <HomeList dateHeader="Vence em" title="Próximos do Vencimento" />
        </div>
      </div>
    </>
  );
}
