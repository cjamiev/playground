import React from 'react';
import Text from 'components/form/Text';

const TransformForm = ({ style, onChange }) => {
  return (
    <>
      <Text id="rotate" label="rotate" selected={style.rotate} onChange={onChange} />
      <Text id="translateX" label="translateX" selected={style.translateX} onChange={onChange} />
      <Text id="translateY" label="translateY" selected={style.translateY} onChange={onChange} />
      <Text id="scaleX" label="scaleX" selected={style.scaleX} onChange={onChange} />
      <Text id="scaleY" label="scaleY" selected={style.scaleY} onChange={onChange} />
      <Text id="skewX" label="skewX" selected={style.skewX} onChange={onChange} />
      <Text id="skewY" label="skewY" selected={style.skewY} onChange={onChange} />
    </>
  );
};

export default TransformForm;
