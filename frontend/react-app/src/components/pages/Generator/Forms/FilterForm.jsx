import React from 'react';
import Range from '../../../atoms/Form/Range';
import Dropdown from '../../../atoms/Form/Dropdown';

const PERCENT_MIN = 0;
const PERCENT_MAX = 100;

const FilterForm = ({ style, onChange }) => {
  const removeList = [
    { label: 'Blur', value: 'blur' },
    { label: 'Brightness', value: 'brightness' },
    { label: 'Contrast', value: 'contrast' },
    { label: 'Grayscale', value: 'grayscale' },
    { label: 'Hue Rotate', value: 'hueRotate' },
    { label: 'Invert', value: 'invert' },
    { label: 'Opacity', value: 'filterOpacity' },
    { label: 'Saturate', value: 'saturate' },
    { label: 'Sepia', value: 'sepia' }
  ];

  return (
    <>
      <Dropdown
        label="Remove Attribute"
        values={removeList}
        onChange={({ values }) => {
          const removeId = values.find((item) => item.selected).value;

          onChange({ id: removeId, selected: '' });
        }}
      />
      <div className="flex--horizontal">
        <Range id="blur" label="Blur" min={PERCENT_MIN} max={PERCENT_MAX} selected={style.blur} onChange={onChange} />
        <Range
          id="brightness"
          label="Brightness"
          min={PERCENT_MIN}
          max={PERCENT_MAX}
          selected={style.brightness}
          onChange={onChange}
        />
        <Range
          id="contrast"
          label="Contrast"
          min={PERCENT_MIN}
          max={PERCENT_MAX}
          selected={style.contrast}
          onChange={onChange}
        />
        <Range
          id="grayscale"
          label="Grayscale"
          min={PERCENT_MIN}
          max={PERCENT_MAX}
          selected={style.grayscale}
          onChange={onChange}
        />
        <Range
          id="hueRotate"
          label="Hue Rotate"
          min={PERCENT_MIN}
          max={PERCENT_MAX}
          selected={style.hueRotate}
          onChange={onChange}
        />
        <Range
          id="invert"
          label="Invert"
          min={PERCENT_MIN}
          max={PERCENT_MAX}
          selected={style.invert}
          onChange={onChange}
        />
        <Range
          id="filterOpacity"
          label="Opacity"
          min={PERCENT_MIN}
          max={PERCENT_MAX}
          selected={style.filterOpacity}
          onChange={onChange}
        />
        <Range
          id="saturate"
          label="Saturate"
          min={PERCENT_MIN}
          max={PERCENT_MAX}
          selected={style.saturate}
          onChange={onChange}
        />
        <Range
          id="sepia"
          label="Sepia"
          min={PERCENT_MIN}
          max={PERCENT_MAX}
          selected={style.sepia}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default FilterForm;
