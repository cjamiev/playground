import React from 'react';

const getEmptyObject = (keys) => keys.reduce((acc, item) => ({ ...acc, [item]: '' }), {});

const getUniqueHeaders = (source) => {
  const headers = source.reduce((acc, entry) => {
    return [...acc, ...Object.keys(entry)];
  }, []);

  return headers.filter((item, pos) => headers.indexOf(item) === pos);
};

const getTableData = (source) => {
  const headers = getUniqueHeaders(source);
  const emptySourceField = getEmptyObject(headers);

  const rows = source.map((entry) => {
    return {
      ...emptySourceField,
      ...entry
    };
  });

  return { headers, rows };
};

const renderHeaders = (headers) => headers.map((item) => <th key={item}>{item}</th>);

const renderRows = (values) =>
  values.map((entry) => {
    const rows = Object.values(entry).map((item, i) => <td key={item.toString() + i}>{item.toString()}</td>);

    return <tr key={JSON.stringify(entry)}>{rows}</tr>;
  });

const TableRenderer = (label, source) => {
  const { headers, rows } = getTableData(source);

  return (
    <div>
      <label>{label}</label>
      <table>
        <thead>
          <tr>{renderHeaders(headers)}</tr>
        </thead>
        <tbody>{renderRows(rows)}</tbody>
      </table>
    </div>
  );
};

export default TableRenderer;
