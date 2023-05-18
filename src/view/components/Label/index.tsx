import React from 'react';

interface Props {
  htmlFor: string;
  children: React.ReactNode;
}

export function Label({ htmlFor, children }: Props) {
  return (
    <label
      htmlFor={htmlFor}
      className="
        block
        font-medium
        leading-6
        text-sm
      "
    >
      {children}
    </label>
  );
}
