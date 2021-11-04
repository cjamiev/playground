import React, { useState } from 'react';
import Radio from 'components/form/Radio';
import Range from 'components/form/Range';

const PIXEL_MIN = 0;
const PIXEL_MAX = 100;

const PaddingForm = ({ style, onChange }) => {
  const [isSame, setIsSame] = useState(true);

  return (<>
    <Radio
      label="Is same on all sides?"
      values={[{ label: 'Yes', selected: isSame }, { label: 'No', selected: !isSame }]}
      onChange={({ values }) => {
        const isSameRadius = values.find(item => item.selected).label === 'Yes';
        setIsSame(isSameRadius);
        if(!isSameRadius) {
          onChange({ id: 'paddingTop', selected: style.padding || ''});
          onChange({ id: 'paddingRight', selected: style.padding || ''});
          onChange({ id: 'paddingBottom', selected: style.padding || ''});
          onChange({ id: 'paddingLeft', selected: style.padding || ''});
          onChange({ id: 'padding', selected: ''});
        } else {
          onChange({ id: 'paddingTop', selected:  ''});
          onChange({ id: 'paddingRight', selected:  ''});
          onChange({ id: 'paddingBottom', selected:  ''});
          onChange({ id: 'paddingLeft', selected:  ''});
        }
      }}
    />
    { isSame
      ? (<Range
        id="padding"
        label="Padding"
        min={PIXEL_MIN}
        max={PIXEL_MAX}
        selected={style.padding}
        onChange={onChange}
      />)
      :
      (<>
        <Range
          id="paddingTop"
          label="Top"
          min={PIXEL_MIN}
          max={PIXEL_MAX}
          selected={style.paddingTop}
          onChange={onChange}
        />
        <Range
          id="paddingRight"
          label="Right"
          min={PIXEL_MIN}
          max={PIXEL_MAX}
          selected={style.paddingRight}
          onChange={onChange}
        />
        <Range
          id="paddingBottom"
          label="Bottom"
          min={PIXEL_MIN}
          max={PIXEL_MAX}
          selected={style.paddingBottom}
          onChange={onChange}
        />
        <Range
          id="paddingLeft"
          label="Left"
          min={PIXEL_MIN}
          max={PIXEL_MAX}
          selected={style.paddingLeft}
          onChange={onChange}
        />
      </>)}
  </>);
};

export default PaddingForm;
