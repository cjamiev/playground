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
      <div key={item.label} className='input-field'>
        <input className='input-field__item' type="checkbox" name={item.label} value={item.label} onChange={() => { handleChange(item.label, values); }} checked={item.selected} />
        <label className="input-field__label" onClick={() => { handleChange(item.label, values); }}>
          {item.label}
        </label>
      </div>
    );
  });

  return (
    <div className='input-field-group'>
      <label className='input-field-group__title'>{label}</label>
      {checkboxes}
    </div>
  );
};

export default Checkbox;
