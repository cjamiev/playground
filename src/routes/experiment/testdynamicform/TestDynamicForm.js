import React, { useState } from 'react';
import Button from 'components/button';
import DynamicForm, { hasError, updateData } from 'components/form/DynamicForm';
import TableRenderer from '../TableRenderer';
import { testData } from './data';

const TestDynamicForm = () => {
  const [fields, setFields] = useState(testData);

  const handleChange = (changedData) => {
    const updatedFields = updateData(fields, changedData);

    setFields(updatedFields);
  };

  return (
    <>
      <DynamicForm data={fields} onChange={handleChange} />
      <div className="container--center">{<TableRenderer label={'Payload'} source={fields} />}</div>
    </>
  );
};

export default TestDynamicForm;
