import React from 'react';

const CheckboxRenderer = ({ id = '', label = '', selected = false, onChangeCheckbox }) => {
  const handleCheckboxChange = () => {
    onChangeCheckbox({ id, selected: !selected });
  };

  return (
    <label>
      <input type="checkbox" name={label} value={label} checked={selected} onChange={handleCheckboxChange} />
      {label}
    </label>
  );
};

export default CheckboxRenderer;
