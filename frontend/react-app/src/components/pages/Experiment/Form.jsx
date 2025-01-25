import React, { useState } from 'react';
import DynamicForm, { updateData } from '../../atoms/Form/DynamicForm';
import TableRenderer from './TableRenderer';
import { formData } from './data';

const Form = () => {
  const [fields, setFields] = useState(formData);

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

export default Form;
