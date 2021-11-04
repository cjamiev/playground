import React from 'react';
import Button from 'components/button';
import Dropdown from 'components/form/Dropdown';
import Color from 'components/form/Color';
import Range from 'components/form/Range';
import { THICKNESS_MAX, BORDER_TYPES } from 'constants/css';

const BorderForm = ({ style, onChange }) => {
  const borderValues = BORDER_TYPES.map((item) =>
    (item.label === style.borderStyle ? { ...item, selected: true } : item)
  );
  const borderColor = style.borderColor ? style.borderColor : '#000000';

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
      <Color id="borderColor" label="Color" selected={borderColor} onChange={onChange} />
      <Button
        label="Remove"
        classColor="secondary"
        onClick={() => {
          onChange({ id: 'borderStyle', selected: '' });
          onChange({ id: 'borderThickness', selected: '' });
          onChange({ id: 'borderColor', selected: '' });
        }}
      />
    </>
  );
};

export default BorderForm;
