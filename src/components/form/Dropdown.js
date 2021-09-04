import React, { useState } from 'react';
import './dropdown.css';

const Dropdown = React.memo(({ id, label, values, onChange }) => {
  const [show, setShow] = useState(false);

  const handleChange = (selected) => {
    const updatedValues = values.map(item => {
      if(item.label === selected) {
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

  const renderContent = values.map(item => {
    const className = item.selected ? 'dropdown__item dropdown__item--active' : 'dropdown__item';
    const ariaLabel = item.selected ? `${item.label} dropdown option is selected`: `${item.label} dropdown option is not selected`;

    return (
      <span key={item.label} aria-label={ariaLabel} className={className} onClick={() => { handleChange(item.label);}}> {item.label} </span>
    );
  });

  const selectedValue = values.find(item => item.selected) || {};

  return (
    <div className="dropdown" onClick={() => { setShow(!show);}}>
      <label className="dropdown__label">{label} {selectedValue.label}</label>
      {show && (<div className='dropdown__content'>{renderContent}</div>)}
    </div>
  );
});

export default Dropdown;
