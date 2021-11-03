import React from 'react';
import Text from 'components/form/Text';
import Dropdown from 'components/form/Dropdown';
import Color from 'components/form/Color';
import Range from 'components/form/Range';
import { BORDER_TYPES, THICKNESS_MAX } from 'constants/css';

const OutlineForm = ({ style, onChange }) => {
  const outlineValues = BORDER_TYPES.map((item) =>
    (item.label === style.outlineStyle ? { ...item, selected: true } : item)
  );

  return (
    <>
      <Range
        id="outlineThickness"
        label="Outline Thickness"
        min="0"
        max={THICKNESS_MAX}
        selected={style.outlineThickness}
        onChange={onChange}
      />
      <Dropdown id="outlineStyle" label="Outline Type" values={outlineValues} onChange={onChange} />
      <Color id="outlineColor" label="Outline Color" selected={style.outlineColor} onChange={onChange} />
      <Text
        id="outlineOffset"
        label="Offset"
        selected={style.outlineOffset}
        onChange={onChange}
      />
    </>
  );
};

export default OutlineForm;
