import React, { useState } from 'react';

import DynamicForm from 'components/form/DynamicForm';
import TableRenderer from './TableRenderer';

const dataList = [
  {
    id: 1,
    type: 'select',
    label: 'Select1',
    values: ['value1', 'value2'],
    orderSeq: 1
  },
  {
    id: 7,
    type: 'multiselect',
    label: 'MSelect1',
    values: ['mvalue1', 'mvalue2'],
    orderSeq: 7
  },
  {
    id: 2,
    type: 'checkbox',
    label: 'checkbox1',
    values: ['ckvalue1', 'ckvalue2'],
    orderSeq: 2
  },
  {
    id: 3,
    type: 'radio',
    label: 'Radio1',
    values: ['value1', 'value2', 'value3'],
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
      <div style={divStyle}>{TableRenderer('Form Payload', fields)}</div>
    </>
  );
};

const divStyle = {
  margin: 'auto',
  width: '75%',
  padding: '10px'
};

export default TestDynamicForm;
