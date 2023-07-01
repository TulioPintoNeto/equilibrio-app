import React from 'react';
import { Table } from '../Table';
import { Title } from '../Title';

interface Props {
  title: string;
}

export function HomeList({
  title,
}: Props) {
  return (
    <div>
      <Title className="text-left" text={title} />
      <div className="overflow-x-auto sm:rounded-lg mt-2">
        <Table
          headers={[
            'Nome',
            'Vence em',
          ]}
          rows={[
            { cells: ['Luiza Isnardi Cardoso Ricardo', new Date('2023-07-02')] },
            { cells: ['Tulio Pinto Neto', new Date('2023-07-04')] },
            { cells: ['Gedson Bohrer Ibanez', new Date('2023-07-05')] },
            { cells: ['Gregory Feijo', new Date('2023-07-05')] },
            { cells: ['Heloisa Oro de Lírio', new Date('2023-07-07')] },
          ]}
        />
      </div>
    </div>
  );
}
