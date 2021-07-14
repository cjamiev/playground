import React from 'react';

const Date = ({ id, label, onChange }) => {
  const handleSelectedChange = ({ target: { value } }) => {
    onChange({ id, selected: value });
  };

  return (
    <div>
      <label>{label}</label>
      <input className="input-field__date" type="date" name={label} onChange={handleSelectedChange} />
    </div>
  );
};

export default Date;
