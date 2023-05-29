import React from 'react';

interface Props {
  text: string;
}

export function Title({
  text,
}: Props) {
  return (
    <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
      {text}
    </h1>
  );
}
