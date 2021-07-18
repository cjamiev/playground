import React from 'react';
import { isJSONString } from 'type-check';

const TWO = 2;

const TextArea = ({ id, label, selected, jsonType, error, errorMessage, onChange }) => {
  const handleSelectedChange = ({ target: { value } }) => {
    const hasError = jsonType && !isJSONString(value);
    const formattedValue = jsonType && !hasError ? JSON.stringify(JSON.parse(value), undefined, TWO): value;

    onChange({ id, selected: formattedValue, error: hasError, errorMessage });
  };

  const formattedValue = jsonType && isJSONString(selected) ? JSON.stringify(JSON.parse(selected), undefined, TWO): selected;

  return (
    <div className="textarea__container">
      <label>{label}</label>
      <textarea rows="20" cols="100" aria-label="text-area" value={formattedValue} onChange={handleSelectedChange}></textarea>
      {error && <span>{errorMessage}</span>}
    </div>
  );
};

export default TextArea;
