import React, { useEffect, useState } from 'react';

import FormRenderer from './FormRenderer';

const hasError = (fields) => {
  return fields.find((entry) => entry.error || (entry.required && !entry.values.find(item => item.selected)));
};

const handleChange = (currentEntry, setEntry) => {
  return ({ id, selected, values, error = false }) => {
    const updatedEntry = currentEntry.map((item) => {
      return item.id === id ? { ...item, selected, values, error } : item;
    });

    setEntry(updatedEntry);
  };
};

const handleSubmit = (entry, onSubmit) => {
  return () => {
    onSubmit(entry);
  };
};

const DynamicForm = ({ fieldsList, onSubmit }) => {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    setFields(fieldsList);
  }, [fieldsList]);

  return (
    <>
      <div style={divStyle}>
        {FormRenderer(fields, handleChange(fields, setFields))}
        <button style={buttonStyle} disabled={hasError(fields)} onClick={handleSubmit(fields, onSubmit)}>
          Submit
        </button>
      </div>
    </ >
  );
};

const divStyle = {
  margin: 'auto',
  width: '75%',
  padding: '10px'
};

const buttonStyle = {
  margin: '10px 0px 10px 0px'
};

export default DynamicForm;
