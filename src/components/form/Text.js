import React from 'react';

const ZERO = 0;

const isValidText = (value, regex) => {
  if (!value || !regex) {
    return true;
  }

  const match = RegExp(regex).exec(value) || [];

  return match[ZERO] === value;
};

const Text = ({ id, label, selected, regex, error, errorMessage, onChange }) => {
  const handleSelectedChange = ({ target: { value } }) => {
    const hasError = !isValidText(value, regex);

    onChange({ id, selected: value, error: hasError });
  };

  return (
    <div>
      <div className='input__flex'>
        <label className='input__label'>{label}</label>
        <input className='input__field' type="text" name={label} aria-label="text-field" value={selected} onChange={handleSelectedChange} />
      </div>
      {error && <span>{errorMessage}</span>}
    </div>
  );
};

export default Text;
