import React from 'react';
import Text from 'components/form/Text';

const BackdropFilterForm = ({ style, onChange }) => {
  return (
    <>
      <Text id="backdropBlur" label="blur" selected={style.backdropBlur} onChange={onChange} />
      <Text id="backdropBrightness" label="brightness" selected={style.backdropBrightness} onChange={onChange} />
      <Text id="backdropContrast" label="contrast" selected={style.backdropContrast} onChange={onChange} />
      <Text id="backdropGrayscale" label="grayscale" selected={style.backdropGrayscale} onChange={onChange} />
      <Text id="backdropHueRotate" label="hue rotate" selected={style.backdropHueRotate} onChange={onChange} />
      <Text id="backdropInvert" label="invert" selected={style.backdropInvert} onChange={onChange} />
      <Text id="backdropSaturate" label="saturate" selected={style.backdropSaturate} onChange={onChange} />
    </>
  );
};

export default BackdropFilterForm;
