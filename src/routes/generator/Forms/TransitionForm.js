import React from 'react';
import Text from 'components/form/Text';
import Dropdown from 'components/form/Dropdown';
import Color from 'components/form/Color';
import Range from 'components/form/Range';
import { TRANSITION_TIMING_FUNCTION } from 'constants/css';

const TransitionForm = ({ style, onChange }) => {
  const transitionTimingFunctionValues = TRANSITION_TIMING_FUNCTION.map((item) =>
    (item.label === style.transitionTimingFunction ? { ...item, selected: true } : item)
  );

  return (
    <>
      <Text
        id="transitionProperty"
        label="Transition Property"
        selected={style.transitionProperty}
        onChange={onChange}
      />
      <Text
        id="transitionDuration"
        label="Transition Duration"
        selected={style.transitionDuration}
        onChange={onChange}
      />
      <Dropdown
        id="transitionTimingFunction"
        label="Transition Timing Function"
        values={transitionTimingFunctionValues}
        onChange={onChange}
      />
      <Text
        id="transitionDelay"
        label="Transition Delay"
        selected={style.transitionDelay}
        onChange={onChange}
      />
    </>
  );
};

export default TransitionForm;
