import React, { useState } from 'react';
import Radio from 'components/form/Radio';
import Text from 'components/form/Text';

const BorderRadiusForm = ({ style, onChange }) => {
  const [isSame, setIsSame] = useState(true);

  return (
    <>
      <Radio
        label="Is Same on All Sides?"
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
        ? (<Text
          id="borderRadius"
          label="Radius"
          selected={style.borderRadius}
          onChange={onChange}
        />)
        : (<>
          <Text
            id="topLeftRadius"
            label="Top Left"
            selected={style.topLeftRadius}
            onChange={onChange}
          />
          <Text
            id="topRightRadius"
            label="Top Right"
            selected={style.topRightRadius}
            onChange={onChange}
          />
          <Text
            id="bottomRightRadius"
            label="Bottom Right"
            selected={style.bottomRightRadius}
            onChange={onChange}
          />
          <Text
            id="bottomLeftRadius"
            label="Bottom Left"
            selected={style.bottomLeftRadius}
            onChange={onChange}
          />
        </>)}
    </>
  );
};

export default BorderRadiusForm;
