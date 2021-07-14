import React, { useState } from 'react';

import DynamicForm from 'components/form/DynamicForm';
import TableRenderer from './TableRenderer';

const dataList = [
  {
    id: 1,
    type: 'select',
    label: 'Select1',
    values: [
      {
        label: 'svalue1',
        selected: false
      },
      {
        label: 'svalue2',
        selected: true
      }
    ],
    orderSeq: 1
  },
  {
    id: 6,
    type: 'multiselect',
    label: 'MSelect1',
    values: [
      {
        label: 'msvalue1',
        selected: false
      },
      {
        label: 'msvalue2',
        selected: true
      }
    ],
    orderSeq: 6
  },
  {
    id: 7,
    type: 'dropdown',
    label: 'Dropdown1',
    values: [
      {
        label: 'd1',
        selected: false
      },
      {
        label: 'd2',
        selected: false
      }
    ],
    orderSeq: 7
  },
  {
    id: 2,
    type: 'checkbox',
    label: 'checkbox1',
    values: [
      {
        label: 'ckvalue1',
        selected: false
      },
      {
        label: 'ckvalue2',
        selected: false
      }
    ],
    orderSeq: 2
  },
  {
    id: 3,
    type: 'radio',
    label: 'Radio1',
    values: [
      {
        label: 'rvalue1',
        selected: false
      },
      {
        label: 'rvalue2',
        selected: true
      }
    ],
    required: true,
    orderSeq: 3
  },
  {
    id: 4,
    type: 'text',
    label: 'Text1',
    regex: '[0-9]+',
    errorMessage: 'Please enter a valid number',
    orderSeq: 4
  },
  {
    id: 5,
    type: 'date',
    label: 'Date1',
    orderSeq: 5
  }
];

const TestDynamicForm = () => {
  const [fields, setFields] = useState(dataList);

  const onSubmit = (updatedFields) => {
    setFields(updatedFields);
  };

  return (
    <>
      <DynamicForm fieldsList={fields} onSubmit={onSubmit} />
      <div className="container--center">{TableRenderer('Form Payload', fields)}</div>
    </>
  );
};

export default TestDynamicForm;
