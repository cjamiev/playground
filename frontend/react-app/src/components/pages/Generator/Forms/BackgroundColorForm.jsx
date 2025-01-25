import React from 'react';
import Button from '../../../atoms/Button';
import Color from '../../../atoms/Form/Color';
import Range from '../../../atoms/Form/Range';
import { OPACITY_MAX } from '../../../../constants/css';

const BackgroundColorForm = ({ style, onChange }) => {
  return (
    <>
      <Color id="backgroundColor" label="Background Color" selected={style.backgroundColor} onChange={onChange} />
      <Range
        id="backgroundColorOpacity"
        label="Opacity"
        min="0"
        max={OPACITY_MAX}
        selected={style.backgroundColorOpacity}
        onChange={onChange}
      />
      <Button
        label="Remove"
        onClick={() => {
          onChange({ id: 'backgroundColor', selected: '' });
        }}
      />
    </>
  );
};

export default BackgroundColorForm;
