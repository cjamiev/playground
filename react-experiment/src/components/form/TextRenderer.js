import React, { Fragment } from 'react';

const ZERO = 0;

const isValidText = (value, regex) => {
  if (!value) {
    return true;
  }

  const match = RegExp(regex).exec(value) || [];

  return match[ZERO] === value;
};

const TextRenderer = ({ id, label, regex, error, errorMessage, onChange }) => {
  const handleSelectedChange = ({ target: { value } }) => {
    const hasError = !isValidText(value, regex);

    onChange({ id, selected: value, error: hasError });
  };

  return (
    <Fragment>
      <label>{label}</label>
      <input className='textrenderer' type="text" name={label} aria-label="text-field" onChange={handleSelectedChange} />
      {error && <span>{errorMessage}</span>}
    </Fragment>
  );
};

export default TextRenderer;
