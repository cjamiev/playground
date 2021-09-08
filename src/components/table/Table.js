import React from 'react';

const Table = ({headers, body, isFlex = true}) => {
  const renderHeaders = headers.map(item => {
    return (<th key={item.label} className={item.className}>{item.label}</th>);
  });

  return (
    <table>
      <thead>
        <tr className={isFlex ? 'flex--horizontal' : ''}>
          {renderHeaders}
        </tr>
      </thead>
      <tbody>{body}</tbody>
    </table>
  );
};

export default Table;