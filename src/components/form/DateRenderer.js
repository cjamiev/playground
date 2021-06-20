import React from 'react';

const DateRenderer = ({ id, label, onChange }) => {
  const handleSelectedChange = ({ target: { value } }) => {
    onChange({ id, selected: value });
  };

  return (
    <div>
      <label>{label}</label>
      <input style={dateStyle} type="date" name={label} onChange={handleSelectedChange} />
    </div>
  );
};

DateRenderer.defaultProps = {
  id: '',
  label: '',
  onChange: (selected) => selected
};

const dateStyle = {
  margin: '10px 0px 10px 0px'
};

export default DateRenderer;
