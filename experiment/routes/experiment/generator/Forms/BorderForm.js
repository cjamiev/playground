import React, { useState } from 'react';
import Button from 'components/atoms/Button';
import Dropdown from 'components/atoms/Form/Dropdown';
import Radio from 'components/atoms/Form/Radio';
import Color from 'components/atoms/Form/Color';
import Range from 'components/atoms/Form/Range';
import { THICKNESS_MAX, BORDER_TYPES } from 'constants/css';

const PIXEL_MIN = 0;
const PIXEL_MAX = 100;

const BorderForm = ({ style, onChange }) => {
  const [isSame, setIsSame] = useState(true);

  const borderValues = BORDER_TYPES.map((item) =>
    (item.label === style.borderStyle ? { ...item, selected: true } : item)
  );

  return (
    <div className="flex--horizontal">
      <div>
        <Dropdown id="borderStyle" label="Border Type" values={borderValues} onChange={onChange} />
        <Range
          id="borderThickness"
          label="Thickness"
          min="0"
          max={THICKNESS_MAX}
          selected={style.borderThickness}
          onChange={onChange}
        />
        <Color id="borderColor" label="Color" selected={style.borderColor} onChange={onChange} />
        <Button
          label="Remove"
          onClick={() => {
            onChange({ id: 'borderStyle', selected: '' });
            onChange({ id: 'borderThickness', selected: '' });
            onChange({ id: 'borderColor', selected: '' });
          }}
        />
      </div>
      <div>
        <Radio
          label="Is radius same on all sides?"
          values={[
            { label: 'Yes', selected: isSame },
            { label: 'No', selected: !isSame }
          ]}
          onChange={({ values }) => {
            const isSameRadius = values.find((item) => item.selected).label === 'Yes';
            setIsSame(isSameRadius);
            if (!isSameRadius) {
              onChange({ id: 'topLeftRadius', selected: style.borderRadius || '' });
              onChange({ id: 'topRightRadius', selected: style.borderRadius || '' });
              onChange({ id: 'bottomRightRadius', selected: style.borderRadius || '' });
              onChange({ id: 'bottomLeftRadius', selected: style.borderRadius || '' });
              onChange({ id: 'borderRadius', selected: '' });
            } else {
              onChange({ id: 'topLeftRadius', selected: '' });
              onChange({ id: 'topRightRadius', selected: '' });
              onChange({ id: 'bottomRightRadius', selected: '' });
              onChange({ id: 'bottomLeftRadius', selected: '' });
            }
          }}
        />
        {isSame ? (
          <Range
            id="borderRadius"
            label="Radius"
            min={PIXEL_MIN}
            max={PIXEL_MAX}
            selected={style.borderRadius}
            onChange={onChange}
          />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default BorderForm;
