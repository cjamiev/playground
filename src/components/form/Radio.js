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
      <div key={item.label} className='input__flex'>
        <input className='input__item' type="radio" name={label} value={item.label} checked={item.selected} aria-label={`${item.label} radio`} onChange={() => { handleChange(item.label, values);}} />
        <label className="input__label" onClick={() => { handleChange(item.label, values);}}>{item.label}</label>
      </div>
    );
  });

  return (
    <div className='input__flex'>
      <label className='input__group-title'>{label}</label>
      {radios}
    </div>
  );
};

export default Radio;
