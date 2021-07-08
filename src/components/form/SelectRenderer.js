import React from 'react';

const SelectRenderer = ({ id, label, values, onChange }) => {
  const handleChange = (event) => {
    const updatedValues = values.map(item => {
      if(item.label === event.target.value) {
        return {
          ...item,
          selected: true
        };
      }

      return {
        ...item,
        selected: false
      };
    });

    onChange({ id, values: updatedValues });
  };

  const getOptions = values.map((item) => (
    <option key={item.label} value={item.label} >
      {item.label}
    </option>
  ));
  const selected = values.find(item => item.selected);

  return (
    <>
      <label>{label}</label>
      <select data-testid={'select-' + label} style={selectStyle} name={label} defaultValue={selected?.label} onChange={handleChange}>
        {getOptions}
      </select>
    </>
  );
};

const selectStyle = {
  margin: '10px 0px 10px 0px'
};

export default SelectRenderer;
