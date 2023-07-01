import React from 'react';

interface Props {
 value: Date;
}

export function DateCell({
  value,
}: Props) {
  return (
    <td className="px-6 py-4">
      {value.toLocaleDateString('pt-BR')}
    </td>
  );
}
