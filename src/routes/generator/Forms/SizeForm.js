import React from 'react';
import Button from 'components/button';
import Range from 'components/form/Range';
import { WIDTH_MAX, HEIGHT_MAX } from 'constants/css';

const PIXEL_MIN = 50;

const SizeForm = ({ style, onChange }) => {
  return (<>
    <Range
      id="width"
      label="Width"
      min={PIXEL_MIN}
      max={WIDTH_MAX}
      selected={style.width}
      onChange={onChange}
    />
    <Range
      id="height"
      label="Height"
      min={PIXEL_MIN}
      max={HEIGHT_MAX}
      selected={style.height}
      onChange={onChange}
    />
    <Button
      label="Remove Width"
      classColor="secondary"
      onClick={() => {
        onChange({ id: 'width', selected: '' });
      }}
    />
    <Button
      label="Remove Height"
      classColor="secondary"
      onClick={() => {
        onChange({ id: 'height', selected: '' });
      }}
    />
  </>);
};

export default SizeForm;
