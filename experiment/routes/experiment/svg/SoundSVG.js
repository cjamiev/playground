/* eslint-disable max-lines */
/* eslint-disable complexity */
import React from 'react';

export const SoundSVG = ({ transform, conditions = {} }) => {
  const { showNotMute, showMute } = conditions;

  return (
    <g transform={transform}>
      <g data-testid="component-sound" aria-label="sound" transform="matrix(0.17479846,0,0,0.17479846,-140.68443,-125.57938)" >
        <circle data-testid="circle8162" className="svg__39" cx="959.30151" cy="872.88745" r="147.58707" />
        <path data-testid="path1131" className="svg__40" d="m 998.49599,779.55041 -48.99275,48.84865 h -83.25015 v 76.85758 h 83.55618 l 48.68672,48.83065 z" />
        <path data-testid="path8164" className="svg__41" aria-label="path8164" d="m 1022.4703,811.88007 c 0,0 44.5091,53.97962 -2.3678,121.69039" />
        { showNotMute && <path data-testid="not-mute" className="svg__42" aria-label="condition not mute" d="m 1042.8476,793.78582 c 0,0 57.7607,70.04963 -3.0721,157.91939" /> }
        { showMute && <rect data-testid="mute" className="svg__43" aria-label="condition mute" width="6.2805285" height="289.95001" x="7.4805708" y="1152.5884" transform="matrix(0.67953949,-0.73363893,0.73374773,0.67942201,0,0)" /> }
      </g>
    </g>
  );
};

