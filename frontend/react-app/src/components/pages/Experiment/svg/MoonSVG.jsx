/* eslint-disable max-lines */
/* eslint-disable complexity */
import React from 'react';

export const MoonSVG = ({ transform, conditions = {} }) => {

  return (
    <g transform={transform}>
      <path data-testid="component-moon" className="svg__44" aria-label="moon" d="M 23.980032,2.6177154 A 25.04221,25.04221 0 0 0 3.6720621,27.208205 a 25.04221,25.04221 0 0 0 25.0422099,25.04218 25.04221,25.04221 0 0 0 18.87421,-8.58356 24.695414,24.695414 0 0 1 -5.71943,0.67144 24.695414,24.695414 0 0 1 -24.69553,-24.69553 24.695414,24.695414 0 0 1 6.80651,-17.0250196 z" />
    </g>
  );
};

