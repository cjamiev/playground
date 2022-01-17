/* eslint-disable no-magic-numbers */
import React, { useEffect, useState } from 'react';
import Radio from 'components/form/Radio';
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
      <div className="experiment__ball" style={{ transform: `translate(0px,${animation1 * 200 - 200}px` }} />
      <div className="experiment__ball" style={{ transform: `translate(0px,${animation2 * 200 - 200}px` }} />
      <div className="experiment__ball" style={{ transform: `translate(0px,${animation3 * 200 - 200}px` }} />
    </div>
    <svg viewBox="0 0 5120 5120">
      <path
        className="animate__svg-line"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M416 128L192 384l-96-96"
      />
    </svg>
  </div>;
};

export default Animation;
