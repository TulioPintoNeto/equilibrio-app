import React from 'react';
import { Cell } from './Cell';
import { DateCell } from './DateCell';

export interface Row {
  cells: [string, Date];
}

interface Props {
  headers: string[];
  rows: Row[];
}

export function Table({
  headers,
  rows,
}: Props) {
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          {headers.map((header) => (
            <th scope="col" className="px-6 py-3" key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr className="bg-white border-b">
            {
              row.cells.map(
                (cell) => (
                  cell instanceof Date
                    ? (<DateCell value={cell} />)
                    : (<Cell value={cell} />)
                ),
              )
            }
            {/* <Cell>
              <a href="/" className="font-medium text-blue-600 hover:underline">
                Edit
              </a>
            </Cell> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
