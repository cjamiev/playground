import React from 'react';
import Text from 'components/form/Text';
import Color from 'components/form/Color';

const BoxShadowForm = ({ style, onChange }) => {
  return (
    <>
      <Text
        id="horizontalBoxShadow"
        label="Horizontal"
        selected={style.horizontalBoxShadow}
        onChange={onChange}
      />
      <Text id="verticalBoxShadow" label="Vertical" selected={style.verticalBoxShadow} onChange={onChange} />
      <Text
        id="blurRadiusBoxShadow"
        label="Blur Radius"
        selected={style.blurRadiusBoxShadow}
        onChange={onChange}
      />
      <Text id="spreadBoxShadow" label="Spread" selected={style.spreadBoxShadow} onChange={onChange} />
      <Color id="colorBoxShadow" label="Color" selected={style.colorBoxShadow} onChange={onChange} />
    </>
  );
};

export default BoxShadowForm;
