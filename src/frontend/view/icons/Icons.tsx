import React from 'react';
import { Home } from './Home';
import { Logoff } from './Logoff';

function _Icon({ children }: { children?: React.ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      {children}
    </svg>
  );
}

export const Icons = {
  Home: () => <_Icon><Home /></_Icon>,
  Logoff: () => <_Icon><Logoff /></_Icon>,
};
