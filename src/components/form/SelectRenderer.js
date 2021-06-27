import React from 'react';

const SelectRenderer = ({ id, label, values, onChange }) => {
  const handleSelectedChange = ({ target: { value } }) => {
    onChange({ id, selected: value });
  };

  const getOptions = values.map((value) => (
    <option key={value} value={value}>
      {value}
    </option>
  ));

  return (
    <>
      <label>{label}</label>
      <select data-testid={'select-' + label} style={selectStyle} name="SelectRenderer" onChange={handleSelectedChange}>
        {getOptions}
      </select>
    </>
  );
};

SelectRenderer.defaultProps = {
  id: '',
  label: '',
  values: '',
  onChange: (selected) => selected
};

const selectStyle = {
  margin: '10px 0px 10px 0px'
};

export default SelectRenderer;
