import React from 'react';
import Button from '../../../atoms/Button';
import Color from '../../../atoms/Form/Color';
import Range from '../../../atoms/Form/Range';

const PIXEL_MIN = 0;
const PIXEL_MAX = 30;

const TextShadowForm = ({ style, onChange }) => {
  return (
    <>
      <Range
        id="horizontalTextShadow"
        label="Horizontal"
        min={PIXEL_MIN}
        max={PIXEL_MAX}
        selected={style.horizontalTextShadow}
        onChange={onChange}
      />
      <Range
        id="verticalTextShadow"
        label="Vertical"
        min={PIXEL_MIN}
        max={PIXEL_MAX}
        selected={style.verticalTextShadow}
        onChange={onChange}
      />
      <Range
        id="blurRadiusTextShadow"
        label="Blur Radius"
        min={PIXEL_MIN}
        max={PIXEL_MAX}
        selected={style.blurRadiusTextShadow}
        onChange={onChange}
      />
      <Color
        id="colorTextShadow"
        label="Color"
        min={PIXEL_MIN}
        max={PIXEL_MAX}
        selected={style.colorTextShadow}
        onChange={onChange}
      />
      <Button
        label="Remove"
        onClick={() => {
          onChange({ id: 'horizontalTextShadow', selected: '' });
        }}
      />
    </>
  );
};

export default TextShadowForm;
