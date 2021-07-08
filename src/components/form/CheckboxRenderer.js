import React from 'react';
import './checkbox.css';

const CheckboxRenderer = ({ id, label, values, onChange }) => {
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
      <div key={item.label} className='checkbox__subcontainer'>
        <input className='checkbox__box' type="checkbox" name={item.label} value={item.label} onChange={() => { handleChange(item.label, values); }} checked={item.selected} />
        <label className="checkbox__label" onClick={() => { handleChange(item.label, values); }}>
          {item.label}
        </label>
      </div>
    );
  });

  return (
    <div className='checkbox__container'>
      <label className='checkbox__title'>{label}</label>
      {checkboxes}
    </div>
  );
};

export default CheckboxRenderer;
