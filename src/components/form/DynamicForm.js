import React, { useEffect, useState } from 'react';

import Checkbox from './Checkbox';
import Radio from './Radio';
import Multiselect from './Multiselect';
import Select from './Select';
import Dropdown from './Dropdown';
import Text from './Text';
import TextArea from './TextArea';
import Date from './Date';
import './form.css';

const handleInputType = {
  checkbox: Checkbox,
  radio: Radio,
  multiselect: Multiselect,
  select: Select,
  dropdown: Dropdown,
  text: Text,
  textarea: TextArea,
  date: Date
};

const renderFields = (fieldsData, onChange) => {
  return fieldsData
    .sort((item1, item2) => item1.orderSeq - item2.orderSeq)
    .map((entry) => {
      if (handleInputType.hasOwnProperty(entry.type)) {
        const InputComponent = handleInputType[entry.type];

        return <InputComponent key={entry.label} {...entry} onChange={onChange} />;
      }

      return null;
    });
};

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
    <div className="container--center">
      {renderFields(fields, handleChange(fields, setFields))}
      <button disabled={hasError(fields)} onClick={handleSubmit(fields, onSubmit)}>
          Submit
      </button>
    </div>
  );
};

export default DynamicForm;
