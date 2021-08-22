import React from 'react';

const Range = ({ id, label, min, max, selected, onChange }) => {
  const handleSelectedChange = ({ target: { value } }) => {

    onChange({ id, selected: value });
  };

  return (
    <div>
      <div className='input__flex'>
        <label className='input__label'>{label}</label>
        <input className='input__field' type="range" name={label} aria-label={`${label} range field`} min={min} max={max} value={selected} onChange={handleSelectedChange} />
      </div>
    </div>
  );
};

export default Range;
