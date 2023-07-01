import React from 'react';
import CN from 'classnames';

interface Props {
  className: string;
  text: string;
}

export function Title({
  className,
  text,
}: Props) {
  return (
    <h1 className={CN(
      'text-2xl font-bold leading-9 tracking-tight',
      className,
    )}
    >
      {text}
    </h1>
  );
}
