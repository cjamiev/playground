import React from 'react';
import Radio from 'components/form/Radio';
import Text from 'components/form/Text';
import Color from 'components/form/Color';

const BoxShadowForm = ({ style, onChange }) => {
  const firstBoxShadowColor = style.colorBoxShadow ? style.colorBoxShadow: '#ffffff';
  const secondBoxShadowColor = style.secondaryColorBoxShadow ? style.secondaryColorBoxShadow: '#ffffff';

  return (
    <div className="flex--horizontal">
      <div className="flex--vertical">
        <Radio
          label="Inset?"
          values={[{ label: 'Yes', selected: Boolean(style.insetBoxShadow) }, { label: 'No', selected: !Boolean(style.insetBoxShadow) }]}
          onChange={({ values }) => {
            const isInset = values.find(item => item.selected).label === 'Yes';

            onChange({ id: 'insetBoxShadow', selected: isInset ? 'inset' : ''});
          }}
        />
        <Text
          id="horizontalBoxShadow"
          label="Horizontal"
          selected={style.horizontalBoxShadow}
          onChange={onChange}
        />
        <Text
          id="verticalBoxShadow"
          label="Vertical"
          selected={style.verticalBoxShadow}
          onChange={onChange}
        />
        <Text
          id="blurRadiusBoxShadow"
          label="Blur Radius"
          selected={style.blurRadiusBoxShadow}
          onChange={onChange}
        />
        <Text
          id="spreadBoxShadow"
          label="Spread"
          selected={style.spreadBoxShadow}
          onChange={onChange}
        />
        <Color
          id="colorBoxShadow"
          label="Color"
          selected={firstBoxShadowColor}
          onChange={onChange}
        />
      </div>
      <div className="flex--vertical">
        <Radio
          label="Secondary Inset?"
          values={[{ label: 'Yes', selected: Boolean(style.secondaryInsetBoxShadow) }, { label: 'No', selected: !Boolean(style.secondaryInsetBoxShadow) }]}
          onChange={({ values }) => {
            const isInset = values.find(item => item.selected).label === 'Yes';

            onChange({ id: 'secondaryInsetBoxShadow', selected: isInset ? 'inset' : ''});
          }}
        />
        <Text
          id="secondaryHorizontalBoxShadow"
          label="Secondary Horizontal"
          selected={style.secondaryHorizontalBoxShadow}
          onChange={onChange}
        />
        <Text
          id="secondaryVerticalBoxShadow"
          label="Secondary Vertical"
          selected={style.secondaryVerticalBoxShadow}
          onChange={onChange}
        />
        <Text
          id="secondaryBlurRadiusBoxShadow"
          label="Secondary Blur Radius"
          selected={style.secondaryBlurRadiusBoxShadow}
          onChange={onChange}
        />
        <Text
          id="secondarySpreadBoxShadow"
          label="Secondary Spread"
          selected={style.secondarySpreadBoxShadow}
          onChange={onChange}
        />
        <Color
          id="secondaryColorBoxShadow"
          label="Secondary Color"
          selected={secondBoxShadowColor}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default BoxShadowForm;
