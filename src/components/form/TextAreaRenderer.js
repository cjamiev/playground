import React from 'react';
import { isJSONString } from 'type-check';

const TextAreaRenderer = ({ id, label, selected, jsonType, error, errorMessage, onChange }) => {
  const handleSelectedChange = ({ target: { value } }) => {
    const hasError = jsonType && !isJSONString(value);

    onChange({ id, selected: value, error: hasError });
  };

  return (
    <div className="textarea__container">
      <label>{label}</label>
      <textarea rows="20" cols="100" aria-label="text-area" value={selected} onChange={handleSelectedChange}></textarea>
      {error && <span>{errorMessage}</span>}
    </div>
  );
};

export default TextAreaRenderer;
