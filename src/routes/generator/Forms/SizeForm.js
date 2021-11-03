import React from 'react';
import Text from 'components/form/Text';
import { WIDTH_MAX, HEIGHT_MAX } from 'constants/css';

const SizeForm = ({ style, onChange }) => {
  return (<>
    <Text id="width" label="Width" selected={style.width} onChange={onChange} />
    <Text id="height" label="Height" selected={style.height} onChange={onChange} />
  </>);
};

export default SizeForm;
