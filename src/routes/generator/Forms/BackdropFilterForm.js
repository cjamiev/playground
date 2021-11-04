import React from 'react';
import Range from 'components/form/Range';
import Dropdown from 'components/form/Dropdown';

const PERCENT_MIN = 0;
const PERCENT_MAX = 100;

const BackdropFilterForm = ({ style, onChange }) => {
  const removeList = [
    { label: 'Blur', value: 'backdropBlur'},
    { label: 'Brightness', value: 'backdropBrightness'},
    { label: 'Contrast', value: 'backdropContrast'},
    { label: 'Grayscale', value: 'backdropGrayscale'},
    { label: 'Hue Rotate', value: 'backdropHueRotate'},
    { label: 'Invert', value: 'backdropInvert'},
    { label: 'Opacity', value: 'backdropOpacity'},
    { label: 'Saturate', value: 'backdropSaturate'},
    { label: 'Sepia', value: 'backdropSepia'}
  ];

  return (
    <>
      <Dropdown
        label="Remove Attribute"
        values={removeList}
        onChange={({ values }) => {
          const removeId = values.find(item => item.selected).value;

          onChange({ id: removeId, selected: ''});
        }} />
      <div className="flex--horizontal">
        <Range
          id="backdropBlur"
          label="Blur"
          min={PERCENT_MIN}
          max={PERCENT_MAX}
          selected={style.backdropBlur}
          onChange={onChange}
        />
        <Range
          id="backdropBrightness"
          label="Brightness"
          min={PERCENT_MIN}
          max={PERCENT_MAX}
          selected={style.backdropBrightness}
          onChange={onChange}
        />
        <Range
          id="backdropContrast"
          label="Contrast"
          min={PERCENT_MIN}
          max={PERCENT_MAX}
          selected={style.backdropContrast}
          onChange={onChange}
        />
        <Range
          id="backdropGrayscale"
          label="Grayscale"
          min={PERCENT_MIN}
          max={PERCENT_MAX}
          selected={style.backdropGrayscale}
          onChange={onChange}
        />
        <Range
          id="backdropHueRotate"
          label="Hue Rotate"
          min={PERCENT_MIN}
          max={PERCENT_MAX}
          selected={style.backdropHueRotate}
          onChange={onChange}
        />
        <Range
          id="backdropInvert"
          label="Invert"
          min={PERCENT_MIN}
          max={PERCENT_MAX}
          selected={style.backdropInvert}
          onChange={onChange}
        />
        <Range
          id="backdropOpacity"
          label="Opacity"
          min={PERCENT_MIN}
          max={PERCENT_MAX}
          selected={style.backdropOpacity}
          onChange={onChange}
        />
        <Range
          id="backdropSaturate"
          label="Saturate"
          min={PERCENT_MIN}
          max={PERCENT_MAX}
          selected={style.backdropSaturate}
          onChange={onChange}
        />
        <Range
          id="backdropSepia"
          label="Sepia"
          min={PERCENT_MIN}
          max={PERCENT_MAX}
          selected={style.backdropSepia}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default BackdropFilterForm;
