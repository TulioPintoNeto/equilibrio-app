import React from 'react';
import { Routes } from '@/frontend/core/routes';
import { Icons } from '@/frontend/view/icons';
import { ListItem } from './ListItem';
import { useSideMenuController } from '../../controllers/useLogoffController';
import { LoadingState } from '@/frontend/core/State';

export function SideMenu() {
  const { state, handleLogoff } = useSideMenuController();

  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-indigo-600">
        <ul className="space-y-2 font-medium">
          <ListItem.Anchor href={Routes.Home} Icon={Icons.Home} text="Início" />
          <ListItem.Button
            handleClick={handleLogoff}
            Icon={Icons.Logoff}
            loading={state instanceof LoadingState}
            text="Sair"
          />
        </ul>
      </div>
    </aside>
  );
}
