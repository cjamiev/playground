import React from 'react';
import Text from 'components/form/Text';

const BorderRadiusForm = ({ style, onChange }) => {
  return (
    <>
      <Text id="topLeftRadius" label="Top Left" selected={style.topLeftRadius} onChange={onChange} />
      <Text id="topRightRadius" label="Top Right" selected={style.topRightRadius} onChange={onChange} />
      <Text
        id="bottomRightRadius"
        label="Bottom Right"
        selected={style.bottomRightRadius}
        onChange={onChange}
      />
      <Text id="bottomLeftRadius" label="Bottom Left" selected={style.bottomLeftRadius} onChange={onChange} />
    </>
  );
};

export default BorderRadiusForm;
