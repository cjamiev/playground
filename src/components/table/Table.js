import React from 'react';

const Table = ({headers = [], body = null}) => {
  const renderHeaders = headers.map(item => {
    return (<th key={item}>{item}</th>);
  });

  return (
    <table>
      <thead>
        <tr>
          {renderHeaders}
        </tr>
      </thead>
      <tbody>{body}</tbody>
    </table>
  );
};

export default Table;