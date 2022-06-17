import React from 'react';
import Button from 'components/atoms/Button';
import Radio from 'components/atoms/Form/Radio';
import Range from 'components/atoms/Form/Range';
import Color from 'components/atoms/Form/Color';

const PIXEL_MIN = 0;
const PIXEL_MAX = 50;

const BoxShadowForm = ({ style, onChange }) => {
  const firstBoxShadowColor = style.colorBoxShadow ? style.colorBoxShadow : '#ffffff';
  const secondBoxShadowColor = style.secondaryColorBoxShadow ? style.secondaryColorBoxShadow : '#ffffff';

  return (
    <div className="flex--horizontal">
      <div className="flex--vertical">
        <Radio
          label="Inset?"
          values={[
            { label: 'Yes', selected: Boolean(style.insetBoxShadow) },
            { label: 'No', selected: !Boolean(style.insetBoxShadow) }
          ]}
          onChange={({ values }) => {
            const isInset = values.find((item) => item.selected).label === 'Yes';

            onChange({ id: 'insetBoxShadow', selected: isInset ? 'inset' : '' });
          }}
        />
        <Range
          id="horizontalBoxShadow"
          label="Horizontal"
          min={PIXEL_MIN}
          max={PIXEL_MAX}
          selected={style.horizontalBoxShadow}
          onChange={onChange}
        />
        <Range
          id="verticalBoxShadow"
          label="Vertical"
          min={PIXEL_MIN}
          max={PIXEL_MAX}
          selected={style.verticalBoxShadow}
          onChange={onChange}
        />
        <Range
          id="blurRadiusBoxShadow"
          label="Blur Radius"
          min={PIXEL_MIN}
          max={PIXEL_MAX}
          selected={style.blurRadiusBoxShadow}
          onChange={onChange}
        />
        <Range
          id="spreadBoxShadow"
          label="Spread"
          min={PIXEL_MIN}
          max={PIXEL_MAX}
          selected={style.spreadBoxShadow}
          onChange={onChange}
        />
        <Color
          id="colorBoxShadow"
          label="Color"
          min={PIXEL_MIN}
          max={PIXEL_MAX}
          selected={firstBoxShadowColor}
          onChange={onChange}
        />
        <Button
          label="Remove Both Shadows"
          onClick={() => {
            onChange({ id: 'horizontalBoxShadow', selected: '' });
          }}
        />
      </div>
      <div className="flex--vertical">
        <Radio
          label="Secondary Inset?"
          values={[
            { label: 'Yes', selected: Boolean(style.secondaryInsetBoxShadow) },
            { label: 'No', selected: !Boolean(style.secondaryInsetBoxShadow) }
          ]}
          onChange={({ values }) => {
            const isInset = values.find((item) => item.selected).label === 'Yes';

            onChange({ id: 'secondaryInsetBoxShadow', selected: isInset ? 'inset' : '' });
          }}
        />
        <Range
          id="secondaryHorizontalBoxShadow"
          label="Secondary Horizontal"
          min={PIXEL_MIN}
          max={PIXEL_MAX}
          selected={style.secondaryHorizontalBoxShadow}
          onChange={onChange}
        />
        <Range
          id="secondaryVerticalBoxShadow"
          label="Secondary Vertical"
          min={PIXEL_MIN}
          max={PIXEL_MAX}
          selected={style.secondaryVerticalBoxShadow}
          onChange={onChange}
        />
        <Range
          id="secondaryBlurRadiusBoxShadow"
          label="Secondary Blur Radius"
          min={PIXEL_MIN}
          max={PIXEL_MAX}
          selected={style.secondaryBlurRadiusBoxShadow}
          onChange={onChange}
        />
        <Range
          id="secondarySpreadBoxShadow"
          label="Secondary Spread"
          min={PIXEL_MIN}
          max={PIXEL_MAX}
          selected={style.secondarySpreadBoxShadow}
          onChange={onChange}
        />
        <Color
          id="secondaryColorBoxShadow"
          label="Secondary Color"
          min={PIXEL_MIN}
          max={PIXEL_MAX}
          selected={secondBoxShadowColor}
          onChange={onChange}
        />
        <Button
          label="Remove Second Shadow"
          onClick={() => {
            onChange({ id: 'secondaryHorizontalBoxShadow', selected: '' });
          }}
        />
      </div>
    </div>
  );
};

export default BoxShadowForm;
