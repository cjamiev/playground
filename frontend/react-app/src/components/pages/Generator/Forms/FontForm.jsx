import React from 'react';
import Dropdown from '../../../atoms/Form/Dropdown';
import Color from '../../../atoms/Form/Color';
import Range from '../../../atoms/Form/Range';
import { FONT_SIZE_MAX, TEXT_ALIGN_TYPES } from '../../../../constants/css';

const FontForm = ({ style, onChange }) => {
  const textAlignValues = TEXT_ALIGN_TYPES.map((item) =>
    (item.label === style.textAlign ? { ...item, selected: true } : item)
  );
  const removeList = [
    { label: 'Color', value: 'fontColor' },
    { label: 'Size', value: 'fontSize' },
    { label: 'Alignment', value: 'textAlign' }
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
      <Dropdown id="textAlign" label="Alignment" values={textAlignValues} onChange={onChange} />
      <Range id="fontSize" label="Size" min="0" max={FONT_SIZE_MAX} selected={style.fontSize} onChange={onChange} />
      <Color id="fontColor" label="Color" selected={style.fontColor} onChange={onChange} />
    </>
  );
};

export default FontForm;
