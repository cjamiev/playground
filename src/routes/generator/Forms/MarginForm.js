import React, { useState } from 'react';
import Radio from 'components/form/Radio';
import Range from 'components/form/Range';

const PIXEL_MIN = 0;
const PIXEL_MAX = 100;

const MarginForm = ({ style, onChange }) => {
  const [isSame, setIsSame] = useState(true);

  return (<>
    <Radio
      label="Is same on all sides?"
      values={[{ label: 'Yes', selected: isSame }, { label: 'No', selected: !isSame }]}
      onChange={({ values }) => {
        const isSameRadius = values.find(item => item.selected).label === 'Yes';
        setIsSame(isSameRadius);
        if(!isSameRadius) {
          onChange({ id: 'marginTop', selected: style.margin || ''});
          onChange({ id: 'marginRight', selected: style.margin || ''});
          onChange({ id: 'marginBottom', selected: style.margin || ''});
          onChange({ id: 'marginLeft', selected: style.margin || ''});
          onChange({ id: 'margin', selected: ''});
        } else {
          onChange({ id: 'marginTop', selected:  ''});
          onChange({ id: 'marginRight', selected:  ''});
          onChange({ id: 'marginBottom', selected:  ''});
          onChange({ id: 'marginLeft', selected:  ''});
        }
      }}
    />
    { isSame
      ? (<Range
        id="margin"
        label="Margin"
        min={PIXEL_MIN}
        max={PIXEL_MAX}
        selected={style.margin}
        onChange={onChange}
      />)
      :
      (<>
        <Range
          id="marginTop"
          label="Top"
          min={PIXEL_MIN}
          max={PIXEL_MAX}
          selected={style.marginTop}
          onChange={onChange}
        />
        <Range
          id="marginRight"
          label="Right"
          min={PIXEL_MIN}
          max={PIXEL_MAX}
          selected={style.marginRight}
          onChange={onChange}
        />
        <Range
          id="marginBottom"
          label="Bottom"
          min={PIXEL_MIN}
          max={PIXEL_MAX}
          selected={style.marginBottom}
          onChange={onChange}
        />
        <Range
          id="marginLeft"
          label="Left"
          min={PIXEL_MIN}
          max={PIXEL_MAX}
          selected={style.marginLeft}
          onChange={onChange}
        />
      </>)}
  </>);
};

export default MarginForm;
