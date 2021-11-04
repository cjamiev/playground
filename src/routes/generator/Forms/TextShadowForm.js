import React from 'react';
import Button from 'components/button';
import Dropdown from 'components/form/Dropdown';
import Color from 'components/form/Color';
import Range from 'components/form/Range';

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
        classColor="secondary"
        onClick={() => {
          onChange({ id: 'horizontalTextShadow', selected: '' });
        }}
      />
    </>
  );
};

export default TextShadowForm;
