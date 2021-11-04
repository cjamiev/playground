import React from 'react';
import Text from 'components/form/Text';

const FilterForm = ({ style, onChange }) => {
  return (
    <div className="flex--horizontal">
      <Text id="blur" label="Blur" selected={style.blur} onChange={onChange} />
      <Text id="brightness" label="Brightness" selected={style.brightness} onChange={onChange} />
      <Text id="contrast" label="Contrast" selected={style.contrast} onChange={onChange} />
      <Text id="grayscale" label="Grayscale" selected={style.grayscale} onChange={onChange} />
      <Text id="hueRotate" label="Hue Rotate" selected={style.hueRotate} onChange={onChange} />
      <Text id="invert" label="Invert" selected={style.invert} onChange={onChange} />
      <Text id="filterOpacity" label="Opacity" selected={style.filterOpacity} onChange={onChange} />
      <Text id="saturate" label="Saturate" selected={style.saturate} onChange={onChange} />
      <Text id="sepia" label="Sepia" selected={style.sepia} onChange={onChange} />
    </div>
  );
};

export default FilterForm;
