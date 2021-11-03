import React from 'react';
import Color from 'components/form/Color';
import Range from 'components/form/Range';
import { OPACITY_MAX } from 'constants/css';

const ColorForm = ({ style, onChange }) => {
  return (
    <>
      <Color id="backgroundColor" label="BG Color" selected={style.backgroundColor} onChange={onChange} />
      <Range
        id="opacity"
        label="Opacity"
        min="0"
        max={OPACITY_MAX}
        selected={style.opacity}
        onChange={onChange}
      />
    </>
  );
};

export default ColorForm;
