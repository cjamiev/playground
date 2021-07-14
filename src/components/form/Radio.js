import React from 'react';

const Radio = ({ id, label, values, onChange }) => {
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
      <div key={item.label} className='input-field'>
        <input className='input-field__item' type="radio" name={label} value={item.label} checked={item.selected} onChange={() => { handleChange(item.label, values);}} />
        <label className="input-field__label" onClick={() => { handleChange(item.label, values);}}>{item.label}</label>
      </div>
    );
  });

  return (
    <div className='input-field-group'>
      <label className='input-field-group__title'>{label}</label>
      {radios}
    </div>
  );
};

export default Radio;
