import React, { Fragment, useState } from 'react';
import CheckboxGrid from './CheckboxGrid';

const testRow = [
  {
    id: 1,
    label: 'section1',
    selectAllLabel: 'Section1 All',
    selectAll: false,
    values: [
      {
        id: 1,
        columnId: 1,
        label: 'item1',
        selected: false
      },
      {
        id: 2,
        columnId: 2,
        label: 'item2',
        selected: false
      },
      {
        id: 3,
        columnId: 3,
        label: 'item3',
        selected: false
      }
    ]
  },
  {
    id: 2,
    label: 'section2',
    selectAllLabel: 'Section2 All',
    selectAll: false,
    values: [
      {
        id: 1,
        columnId: 1,
        label: 'item21',
        selected: false
      },
      {
        id: 2,
        columnId: 2,
        label: 'item22',
        selected: false
      },
      {
        id: 3,
        columnId: 3,
        label: 'item23',
        selected: false
      }
    ]
  }
];

const testHeader = {
  label: 'Title 1',
  selectAllLabel: 'Select All',
  selectAll: false,
  values: [
    {
      id: 1,
      columnId: 1,
      label: 'item1',
      selected: false
    },
    {
      id: 2,
      columnId: 2,
      label: 'item2',
      selected: false
    },
    {
      id: 3,
      columnId: 3,
      label: 'item3',
      selected: false
    }
  ]
};

const TestComponent = () => {
  const [rowData, setRowData] = useState(testRow);
  const [headerData, setHeaderData] = useState(testHeader);

  const handleChangeCheckboxGrid = ({ header, rows }) => {
    setRowData(rows);
    setHeaderData(header);
  };

  return (
    <Fragment>
      <CheckboxGrid rows={rowData} header={headerData} onChangeCheckboxGrid={handleChangeCheckboxGrid} />
    </Fragment>
  );
};

export default TestComponent;
