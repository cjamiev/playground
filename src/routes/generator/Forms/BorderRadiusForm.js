import React, { useState } from 'react';
import Radio from 'components/form/Radio';
import Range from 'components/form/Range';

const PIXEL_MIN = 0;
const PIXEL_MAX = 100;

const BorderRadiusForm = ({ style, onChange }) => {
  const [isSame, setIsSame] = useState(true);

  return (
    <>
      <Radio
        label="Is same on all sides?"
        values={[{ label: 'Yes', selected: isSame }, { label: 'No', selected: !isSame }]}
        onChange={({ values }) => {
          const isSameRadius = values.find(item => item.selected).label === 'Yes';
          setIsSame(isSameRadius);
          if(!isSameRadius) {
            onChange({ id: 'topLeftRadius', selected: style.borderRadius || ''});
            onChange({ id: 'topRightRadius', selected: style.borderRadius || ''});
            onChange({ id: 'bottomRightRadius', selected: style.borderRadius || ''});
            onChange({ id: 'bottomLeftRadius', selected: style.borderRadius || ''});
            onChange({ id: 'borderRadius', selected: ''});
          } else {
            onChange({ id: 'topLeftRadius', selected: ''});
            onChange({ id: 'topRightRadius', selected: ''});
            onChange({ id: 'bottomRightRadius', selected: ''});
            onChange({ id: 'bottomLeftRadius', selected: ''});
          }
        }}
      />
      { isSame
        ? (<Range
          id="borderRadius"
          label="Radius"
          min={PIXEL_MIN}
          max={PIXEL_MAX}
          selected={style.borderRadius}
          onChange={onChange}
        />)
        : (<>
          <Range
            id="topLeftRadius"
            label="Top Left"
            min={PIXEL_MIN}
            max={PIXEL_MAX}
            selected={style.topLeftRadius}
            onChange={onChange}
          />
          <Range
            id="topRightRadius"
            label="Top Right"
            min={PIXEL_MIN}
            max={PIXEL_MAX}
            selected={style.topRightRadius}
            onChange={onChange}
          />
          <Range
            id="bottomRightRadius"
            label="Bottom Right"
            min={PIXEL_MIN}
            max={PIXEL_MAX}
            selected={style.bottomRightRadius}
            onChange={onChange}
          />
          <Range
            id="bottomLeftRadius"
            label="Bottom Left"
            min={PIXEL_MIN}
            max={PIXEL_MAX}
            selected={style.bottomLeftRadius}
            onChange={onChange}
          />
        </>)}
    </>
  );
};

export default BorderRadiusForm;
