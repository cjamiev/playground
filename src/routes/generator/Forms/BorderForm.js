import React from 'react';
import Dropdown from 'components/form/Dropdown';
import Color from 'components/form/Color';
import Range from 'components/form/Range';
import { THICKNESS_MAX, BORDER_TYPES } from 'constants/css';

const BorderForm = ({ style, onChange }) => {
  const borderValues = BORDER_TYPES.map((item) =>
    (item.label === style.borderStyle ? { ...item, selected: true } : item)
  );

  return (
    <>
      <Dropdown id="borderStyle" label="Border Type" values={borderValues} onChange={onChange} />
      <Range
        id="borderThickness"
        label="Thickness"
        min="0"
        max={THICKNESS_MAX}
        selected={style.borderThickness}
        onChange={onChange}
      />
      <Color id="borderColor" label="Color" selected={style.borderColor} onChange={onChange} />
    </>
  );
};

export default BorderForm;
