import React from 'react';
import Dropdown from '../../../atoms/Form/Dropdown';
import Color from '../../../atoms/Form/Color';
import Range from '../../../atoms/Form/Range';
import { BORDER_TYPES, THICKNESS_MAX } from '../../../../constants/css';

const PIXEL_MIN = 0;
const PIXEL_MAX = 50;

const OutlineForm = ({ style, onChange }) => {
  const outlineValues = BORDER_TYPES.map((item) =>
    (item.label === style.outlineStyle ? { ...item, selected: true } : item)
  );
  const removeList = [
    { label: 'Outline', value: 'outlineStyle' },
    { label: 'Offset', value: 'outlineOffset' }
  ];

  return (
    <>
      <Dropdown
        label="Remove Attribute"
        values={removeList}
        onChange={({ values }) => {
          const removeId = values.find((item) => item.selected).value;

          onChange({ id: removeId, selected: '' });
        }}
      />
      <Dropdown id="outlineStyle" label="Outline Type" values={outlineValues} onChange={onChange} />
      <Range
        id="outlineThickness"
        label="Thickness"
        min="0"
        max={THICKNESS_MAX}
        selected={style.outlineThickness}
        onChange={onChange}
      />
      <Range
        id="outlineOffset"
        label="Offset"
        min={PIXEL_MIN}
        max={PIXEL_MAX}
        selected={style.outlineOffset}
        onChange={onChange}
      />
      <Color id="outlineColor" label="Color" selected={style.outlineColor} onChange={onChange} />
    </>
  );
};

export default OutlineForm;
