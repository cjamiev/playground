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
      <input
        style={textStyle}
        type="text"
        aria-label="text-field"
        name={label}
        onChange={handleSelectedChange}
      />
      {error && <span>{errorMessage}</span>}
    </Fragment>
  );
};

TextRenderer.defaultProps = {
  id: '',
  label: '',
  error: '',
  errorMessage: '',
  onChange: selected => selected
};

const textStyle = {
  margin: '10px 0px 10px 0px'
};

export default TextRenderer;