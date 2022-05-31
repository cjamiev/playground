import React from 'react';
import Text from 'components/form/Text';
import Range from 'components/form/Range';
import Dropdown from 'components/form/Dropdown';

const DEGREE_MIN = 0;
const DEGREE_MAX = 360;
const TRANSLATION_MIN = -100;
const TRANSLATION_MAX = 100;
const SCALE_MIN = 0;
const SCALE_MAX = 300;
const SKEW_MIN = 0;
const SKEW_MAX = 180;
const PERSPECTIVE_MIN = -100;
const PERSPECTIVE_MAX = 100;

const TransformForm = ({ style, onChange }) => {
  const removeList = [
    { label: 'Rotate X', value: 'rotateX'},
    { label: 'Rotate Y', value: 'rotateY'},
    { label: 'Rotate Z', value: 'rotateZ'},
    { label: 'Translate X', value: 'translateX'},
    { label: 'Translate Y', value: 'translateY'},
    { label: 'Scale X', value: 'scaleX'},
    { label: 'Scale Y', value: 'scaleY'},
    { label: 'Skew X', value: 'skewX'},
    { label: 'Skew Y', value: 'skewY'}
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
          id="rotateX"
          label="Rotate X"
          min={DEGREE_MIN}
          max={DEGREE_MAX}
          selected={style.rotateX}
          onChange={onChange}
        />
        <Range
          id="rotateY"
          label="Rotate Y"
          min={DEGREE_MIN}
          max={DEGREE_MAX}
          selected={style.rotateY}
          onChange={onChange}
        />
        <Range
          id="rotateZ"
          label="Rotate Z"
          min={DEGREE_MIN}
          max={DEGREE_MAX}
          selected={style.rotateZ}
          onChange={onChange}
        />
      </div>
      <div className="flex--horizontal">
        <Range
          id="translateX"
          label="Translate X"
          min={TRANSLATION_MIN}
          max={TRANSLATION_MAX}
          selected={style.translateX}
          onChange={onChange}
        />
        <Range
          id="translateY"
          label="Translate Y"
          min={TRANSLATION_MIN}
          max={TRANSLATION_MAX}
          selected={style.translateY}
          onChange={onChange}
        />
      </div>
      <div className="flex--horizontal">
        <Range
          id="scaleX"
          label="Scale X"
          min={SCALE_MIN}
          max={SCALE_MAX}
          selected={style.scaleX}
          onChange={onChange}
        />
        <Range
          id="scaleY"
          label="Scale Y"
          min={SCALE_MIN}
          max={SCALE_MAX}
          selected={style.scaleY}
          onChange={onChange}
        />
      </div>
      <div className="flex--horizontal">
        <Range
          id="skewX"
          label="Skew X"
          min={SKEW_MIN}
          max={SKEW_MAX}
          selected={style.skewX}
          onChange={onChange}
        />
        <Range
          id="skewY"
          label="Skew Y"
          min={SKEW_MIN}
          max={SKEW_MAX}
          selected={style.skewY}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default TransformForm;
