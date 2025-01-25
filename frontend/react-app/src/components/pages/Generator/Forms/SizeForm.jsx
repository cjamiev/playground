import React from 'react';
import Button from '../../../atoms/Button';
import Range from '../../../atoms/Form/Range';
import { WIDTH_MAX, HEIGHT_MAX } from '../../../../constants/css';

const PIXEL_MIN = 50;

const SizeForm = ({ style, onChange }) => {
  return (
    <>
      <Range id="width" label="Width" min={PIXEL_MIN} max={WIDTH_MAX} selected={style.width} onChange={onChange} />
      <Range id="height" label="Height" min={PIXEL_MIN} max={HEIGHT_MAX} selected={style.height} onChange={onChange} />
      <Button
        label="Remove Width"
        onClick={() => {
          onChange({ id: 'width', selected: '' });
        }}
      />
      <Button
        label="Remove Height"
        onClick={() => {
          onChange({ id: 'height', selected: '' });
        }}
      />
    </>
  );
};

export default SizeForm;
