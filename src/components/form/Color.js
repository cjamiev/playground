import React from 'react';
import {
  INDEX_ONE,
  INDEX_TWO,
  INDEX_THREE,
  INDEX_FOUR,
  INDEX_FIVE,
  INDEX_SIX
} from 'constants/array';

const HEX_CODE = '0x';

export const hexToRGB = (hex) => {
  const red = Number(`${HEX_CODE}${hex[INDEX_ONE]}${hex[INDEX_TWO]}`);
  const green = Number(`${HEX_CODE}${hex[INDEX_THREE]}${hex[INDEX_FOUR]}`);
  const blue = Number(`${HEX_CODE}${hex[INDEX_FIVE]}${hex[INDEX_SIX]}`);

  return { red, green, blue };
};


const Color = ({ id, label, horizontal = false, selected, onChange }) => {
  const handleSelectedChange = ({ target: { value } }) => {

    onChange({ id, selected: value });
  };

  const ariaLabel = selected ? `${label} color field has value ${selected}` : `${label} color field`;
  const className = horizontal ? 'input__flex': '';


  return (
    <div>
      <div className={className}>
        <label className='input__label'>{label}</label>
        <input className='input__item-field' type="color" name={label} aria-label={ariaLabel} value={selected} onChange={handleSelectedChange} />
      </div>
    </div>
  );
};

export default Color;
