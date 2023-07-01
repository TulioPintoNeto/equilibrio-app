import React from 'react';

interface Props {
 value: string;
}

export function Cell({
  value,
}: Props) {
  return (
    <td className="px-6 py-4">
      {value}
    </td>
  );
}
