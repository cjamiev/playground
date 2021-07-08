import React from 'react';

const RadioRenderer = ({ id, label, values, onChange }) => {
  const handleChange = (selectedLabel, currentValues) => {
    const updatedValues = currentValues.map(item => {
      if(item.label === selectedLabel) {
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

  const radios = values.map(item => {
    return (
      <div key={item.label}>
        <input style={radioStyle} type="radio" name={label} value={item.label} checked={item.selected} onChange={() => { handleChange(item.label, values);}} />
        <label onClick={() => { handleChange(item.label, values);}}>{item.label}</label>
      </div>
    );
  });

  return (
    <>
      <label>{label}</label>
      {radios}
    </>
  );
};

const radioStyle = {
  margin: '0px 5px 0px 0px'
};

export default RadioRenderer;
