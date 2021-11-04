import React from 'react';
import Text from 'components/form/Text';

const BackdropFilterForm = ({ style, onChange }) => {
  return (
    <div className="flex--horizontal">
      <Text id="backdropBlur" label="Blur" selected={style.backdropBlur} onChange={onChange} />
      <Text id="backdropBrightness" label="Brightness" selected={style.backdropBrightness} onChange={onChange} />
      <Text id="backdropContrast" label="Contrast" selected={style.backdropContrast} onChange={onChange} />
      <Text id="backdropGrayscale" label="Grayscale" selected={style.backdropGrayscale} onChange={onChange} />
      <Text id="backdropHueRotate" label="Hue Rotate" selected={style.backdropHueRotate} onChange={onChange} />
      <Text id="backdropInvert" label="Invert" selected={style.backdropInvert} onChange={onChange} />
      <Text id="backdropOpacity" label="Opacity" selected={style.backdropOpacity} onChange={onChange} />
      <Text id="backdropSaturate" label="Saturate" selected={style.backdropSaturate} onChange={onChange} />
      <Text id="backdropSepia" label="Sepia" selected={style.backdropSepia} onChange={onChange} />
    </div>
  );
};

export default BackdropFilterForm;
