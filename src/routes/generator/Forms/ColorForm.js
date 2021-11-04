import React from 'react';
import Button from 'components/button';
import Color from 'components/form/Color';
import Range from 'components/form/Range';
import { OPACITY_MAX } from 'constants/css';

const ColorForm = ({ style, onChange }) => {
  const backgroundColor = style.backgroundColor ? style.backgroundColor : '#ffffff';

  return (
    <>
      <Color id="backgroundColor" label="BG Color" selected={backgroundColor} onChange={onChange} />
      <Range
        id="opacity"
        label="Opacity"
        min="0"
        max={OPACITY_MAX}
        selected={style.opacity}
        onChange={onChange}
      />
      <Button
        label="Remove"
        classColor="secondary"
        onClick={() => {
          onChange({ id: 'backgroundColor', selected: '' });
        }}
      />
    </>
  );
};

export default ColorForm;
