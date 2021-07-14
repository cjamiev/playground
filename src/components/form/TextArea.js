import React from 'react';
import { isJSONString } from 'type-check';

const TextArea = ({ id, label, selected, jsonType, error, errorMessage, onChange }) => {
  const handleSelectedChange = ({ target: { value } }) => {
    const hasError = jsonType && !isJSONString(value);
    const formattedValue = jsonType && !hasError ? JSON.stringify(JSON.parse(value), undefined, 2): value;

    onChange({ id, selected: formattedValue, error: hasError, errorMessage });
  };

  const formattedValue = jsonType && isJSONString(selected) ? JSON.stringify(JSON.parse(selected), undefined, 2): selected;

  return (
    <div className="textarea__container">
      <label>{label}</label>
      <textarea rows="20" cols="100" aria-label="text-area" value={formattedValue} onChange={handleSelectedChange}></textarea>
      {error && <span>{errorMessage}</span>}
    </div>
  );
};

export default TextArea;
