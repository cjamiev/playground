import React, { useState } from 'react';
import Radio from 'components/form/Radio';
import Text from 'components/form/Text';

const MarginForm = ({ style, onChange }) => {
  const [isSame, setIsSame] = useState(true);

  return (<>
    <Radio
      label="Is Same on All Sides?"
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
      ? (<Text
        id="margin"
        label="Margin"
        selected={style.margin}
        onChange={onChange}
      />)
      :
      (<>
        <Text id="marginTop" label="Top" selected={style.marginTop} onChange={onChange} />
        <Text id="marginRight" label="Right" selected={style.marginRight} onChange={onChange} />
        <Text id="marginBottom" label="Bottom" selected={style.marginBottom} onChange={onChange} />
        <Text id="marginLeft" label="Left" selected={style.marginLeft} onChange={onChange} />
      </>)}
  </>);
};

export default MarginForm;
