import React from 'react';
import Text from 'components/form/Text';

const MarginForm = ({ style, onChange }) => {
  return (<>
    <Text id="marginTop" label="Top" selected={style.marginTop} onChange={onChange} />
    <Text id="marginRight" label="Right" selected={style.marginRight} onChange={onChange} />
    <Text id="marginBottom" label="Bottom" selected={style.marginBottom} onChange={onChange} />
    <Text id="marginLeft" label="Left" selected={style.marginLeft} onChange={onChange} />
  </>);
};

export default MarginForm;
