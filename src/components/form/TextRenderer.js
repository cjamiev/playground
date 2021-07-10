import React from 'react';

const ZERO = 0;

const isValidText = (value, regex) => {
  if (!value) {
    return true;
  }

  const match = RegExp(regex).exec(value) || [];

  return match[ZERO] === value;
};

const TextRenderer = ({ id, label, selected, regex, error, errorMessage, onChange }) => {
  const handleSelectedChange = ({ target: { value } }) => {
    const hasError = !isValidText(value, regex);

    onChange({ id, selected: value, error: hasError });
  };

  return (
    <div>
      <label>{label}</label>
      <input className='textrenderer' type="text" name={label} aria-label="text-field" value={selected} onChange={handleSelectedChange} />
      {error && <span>{errorMessage}</span>}
    </div>
  );
};

export default TextRenderer;
