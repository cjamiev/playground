import React, { useState } from 'react';
import Radio from 'components/form/Radio';
import Text from 'components/form/Text';

const PaddingForm = ({ style, onChange }) => {
  const [isSame, setIsSame] = useState(true);

  return (<>
    <Radio
      label="Is Same on All Sides?"
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
      ? (<Text
        id="padding"
        label="Padding"
        selected={style.padding}
        onChange={onChange}
      />)
      :
      (<>
        <Text id="paddingTop" label="Top" selected={style.paddingTop} onChange={onChange} />
        <Text id="paddingRight" label="Right" selected={style.paddingRight} onChange={onChange} />
        <Text id="paddingBottom" label="Bottom" selected={style.paddingBottom} onChange={onChange} />
        <Text id="paddingLeft" label="Left" selected={style.paddingLeft} onChange={onChange} />
      </>)}
  </>);
};

export default PaddingForm;
