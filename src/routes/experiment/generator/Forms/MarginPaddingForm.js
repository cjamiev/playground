import React, { useState } from 'react';
import Radio from 'components/form/Radio';
import Range from 'components/form/Range';

const PIXEL_MIN = 0;
const PIXEL_MAX = 100;

const MarginPaddingForm = ({ style, onChange }) => {
  const [isMarginSame, setIsMarginSame] = useState(true);
  const [isPaddingSame, setIsPaddingSame] = useState(true);

  return (<div className="flex--horizontal">
    <div>
      <Radio
        label="Is margin same on all sides?"
        values={[{ label: 'Yes', selected: isMarginSame }, { label: 'No', selected: !isMarginSame }]}
        onChange={({ values }) => {
          const isSameRadius = values.find(item => item.selected).label === 'Yes';
          setIsMarginSame(isSameRadius);
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
      { isMarginSame
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
    </div>
    <div>
      <>
        <Radio
          label="Is padding same on all sides?"
          values={[{ label: 'Yes', selected: isPaddingSame }, { label: 'No', selected: !isPaddingSame }]}
          onChange={({ values }) => {
            const isSameRadius = values.find(item => item.selected).label === 'Yes';
            setIsPaddingSame(isSameRadius);
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
        { isPaddingSame
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
      </>
    </div>
  </div>);
};

export default MarginPaddingForm;
