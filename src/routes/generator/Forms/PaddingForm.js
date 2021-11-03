import React from 'react';
import Text from 'components/form/Text';

const PaddingForm = ({ style, onChange }) => {
  return ( <>
    <Text id="paddingTop" label="Top" selected={style.paddingTop} onChange={onChange} />
    <Text id="paddingRight" label="Right" selected={style.paddingRight} onChange={onChange} />
    <Text id="paddingBottom" label="Bottom" selected={style.paddingBottom} onChange={onChange} />
    <Text id="paddingLeft" label="Left" selected={style.paddingLeft} onChange={onChange} />
  </>);

};

export default PaddingForm;
