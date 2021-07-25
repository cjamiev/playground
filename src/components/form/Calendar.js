import React from 'react';

const Calendar = ({ id, label, selected, onChange }) => {
  const handleSelectedChange = ({ target: { value } }) => {
    onChange({ id, selected: value });
  };

  return (
    <div>
      <label>{label}</label>
      <input className="input-field__date" type="date" name={label} value={selected} aria-label="calendar-field" onChange={handleSelectedChange} />
    </div>
  );
};

export default Calendar;
