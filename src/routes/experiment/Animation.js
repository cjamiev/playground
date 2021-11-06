import React, { useEffect, useState } from 'react';
import Radio from 'components/form/Radio';
import { ToggleButton } from 'components/button';

const OPTIONS = [
  { label: 'fade in', value: 'animate--fadeIn', selected: false },
  { label: 'slide right', value: 'animate--slideRight', selected: false }
];

const Animation = () => {
  const [animateClass, setAnimateClass] = useState('');
  const [animationOptions, setAnimationOptions] = useState(OPTIONS);

  return <div className="container--center">
    <Radio
      label="Select Animation"
      horizontal
      values={animationOptions}
      onChange={({ values }) => {
        const classes = values.filter(item => item.selected).map(item => item.value).join(' ');

        setAnimateClass(classes);
        setAnimationOptions(values);
      }}
    />
    <div className={`${animateClass} animate-box`}>
      animate
    </div>
  </div>;
};

export default Animation;
