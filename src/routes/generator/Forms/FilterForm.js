import React from 'react';
import Text from 'components/form/Text';

const FilterForm = ({ style, onChange }) => {
  return (
    <>
      <Text id="blur" label="blur" selected={style.blur} onChange={onChange} />
      <Text id="brightness" label="brightness" selected={style.brightness} onChange={onChange} />
      <Text id="contrast" label="contrast" selected={style.contrast} onChange={onChange} />
      <Text id="grayscale" label="grayscale" selected={style.grayscale} onChange={onChange} />
      <Text id="hueRotate" label="hue rotate" selected={style.hueRotate} onChange={onChange} />
      <Text id="invert" label="invert" selected={style.invert} onChange={onChange} />
      <Text id="saturate" label="saturate" selected={style.saturate} onChange={onChange} />
    </>
  );
};

export default FilterForm;
