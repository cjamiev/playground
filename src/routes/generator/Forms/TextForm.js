import React from 'react';
import Text from 'components/form/Text';
import Dropdown from 'components/form/Dropdown';
import Color from 'components/form/Color';
import Range from 'components/form/Range';
import { FONT_SIZE_MAX, TEXT_ALIGN_TYPES } from 'constants/css';

const TextForm = ({ style, onChange }) => {
  const textAlignValues = TEXT_ALIGN_TYPES.map((item) =>
    (item.label === style.textAlign ? { ...item, selected: true } : item)
  );

  return (
    <>
      <Color id="fontColor" label="Font Color" selected={style.fontColor} onChange={onChange} />
      <Range
        id="fontSize"
        label="Font Size"
        min="0"
        max={FONT_SIZE_MAX}
        selected={style.fontSize}
        onChange={onChange}
      />
      <Dropdown id="textAlign" label="Text Align" values={textAlignValues} onChange={onChange} />
      <Text
        id="horizontalTextShadow"
        label="Horizontal"
        selected={style.horizontalTextShadow}
        onChange={onChange}
      />
      <Text id="verticalTextShadow" label="Vertical" selected={style.verticalTextShadow} onChange={onChange} />
      <Text
        id="blurRadiusTextShadow"
        label="Blur Radius"
        selected={style.blurRadiusTextShadow}
        onChange={onChange}
      />
      <Color
        id="colorTextShadow"
        label="Text Shadow Color"
        selected={style.colorTextShadow}
        onChange={onChange}
      />
    </>
  );
};

export default TextForm;
