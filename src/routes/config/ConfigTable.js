import React from 'react';
import { SCTable, SCTableHeaderCell } from './styles';

export const Table = ({ headers, body }) => {
  const renderHeaders = headers.map((item) => {
    return (
      <SCTableHeaderCell key={item.label}>
        {item.label}
      </SCTableHeaderCell>
    );
  });

  return (
    <SCTable>
      <thead>
        <tr>{renderHeaders}</tr>
      </thead>
      <tbody>{body}</tbody>
    </SCTable>
  );
};