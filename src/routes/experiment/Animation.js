/* eslint-disable no-magic-numbers */
import React, { useEffect, useState } from 'react';
import Radio from 'components/form/Radio';
import { ToggleButton } from 'components/button';
import useAnimation from 'hooks/useAnimation';

const OPTIONS = [
  { label: 'fade in', value: 'animate--fadeIn', selected: false },
  { label: 'slide', value: 'animate--slide', selected: false },
  { label: 'bounce', value: 'animate--bounce', selected: false },
  { label: 'shake', value: 'animate--shake', selected: false },
  { label: 'rotate', value: 'animate--rotate', selected: false },
  { label: 'zoom', value: 'animate--zoom', selected: false }
];

const Animation = () => {
  const [animateClass, setAnimateClass] = useState('');
  const [animationOptions, setAnimationOptions] = useState(OPTIONS);
  const animation1 = useAnimation('elastic', 600, 0);
  const animation2 = useAnimation('elastic', 600, 150);
  const animation3 = useAnimation('elastic', 600, 300);

  return <div className="flex--horizontal container--center">
    <div className="flex--one">
      <Radio
        label="Select Animation"
        values={animationOptions}
        onChange={({ values }) => {
          const classes = values.filter(item => item.selected).map(item => item.value).join(' ');

          setAnimateClass(classes);
          setAnimationOptions(values);
        }}
      />
    </div>
    <div className="flex--two flex--center">
      <div className={`${animateClass} animate-box`}>
      animate
      </div>
    </div>
    <div className="flex--two flex--horizontal flex--center">
      <div className="experiment__ball" style={{ marginTop: animation1 * 200 - 100 }} />
      <div className="experiment__ball" style={{ marginTop: animation2 * 200 - 100 }} />
      <div className="experiment__ball" style={{ marginTop: animation3 * 200 - 100 }} />
    </div>
  </div>;
};

export default Animation;
