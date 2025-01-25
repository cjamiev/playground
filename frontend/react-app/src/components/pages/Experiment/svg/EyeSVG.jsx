/* eslint-disable max-lines */
/* eslint-disable complexity */
import React from 'react';

export const EyeSVG = ({ transform, conditions = {} }) => {
  const { showCross } = conditions;

  return (
    <g transform={transform}>
      <g data-testid="component-eye" aria-label="eye" transform="matrix(1.0190416,0,0,1.0190416,-272.32625,-23.701615)" >
        <ellipse data-testid="path4580" className="svg__66" cx="293.74609" cy="52.364849" rx="10.56239" ry="10.562389" />
        <path data-testid="path4582" className="svg__67" d="m 268.71267,52.675955 c 0,0 23.6718,-41.042473 50.06841,-0.170303" />
        <path data-testid="path4584" className="svg__67" d="m 268.71267,51.26893 c 0,0 23.6718,41.042424 50.06841,0.170302" />
        { showCross && <rect data-testid="cross" className="svg__68" aria-label="condition cross" width="3.6276019" height="65.926086" x="181.0412" y="202.23616" transform="rotate(-42.522975)" /> }
      </g>
    </g>
  );
};

