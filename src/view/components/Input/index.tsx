import React from 'react';

interface Props {
  name: string;
  type: string;
  autoComplete: string;
}

export function Input({ name, type, autoComplete }: Props) {
  return (
    <input
      autoComplete={autoComplete}
      id={name}
      name={name}
      required
      type={type}
      className="
        block
        border-0
        focus:ring-indigo-600
        focus:ring-inset
        focus:ring-2
        placeholder:text-gray-400
        py-1.5
        ring-gray-300
        ring-inset
        ring-1
        rounded-md
        shadow-sm
        sm:leading-6
        sm:text-sm
        w-full
      "
    />
  );
}
