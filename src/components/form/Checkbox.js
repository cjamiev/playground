import React from 'react';

const Checkbox = ({ id, label, values, onChange }) => {
  const handleChange = (selectedLabel, currentValues) => {
    const updatedValues = currentValues.map(item => {
      if(item.label === selectedLabel) {
        return {
          ...item,
          selected: !item.selected
        };
      }

      return item;
    });

    onChange({ id, values: updatedValues });
  };

  const checkboxes = values.map(item => {
    return (
      <div key={item.label} className='input__flex'>
        <input className='input__item' type="checkbox" name={item.label} value={item.label} aria-label="checkbox" onChange={() => { handleChange(item.label, values); }} checked={item.selected} />
        <label className="input__label" onClick={() => { handleChange(item.label, values); }}>
          {item.label}
        </label>
      </div>
    );
  });

  return (
    <div className='input__flex'>
      <label className='input__group-title'>{label}</label>
      {checkboxes}
    </div>
  );
};

export default Checkbox;
