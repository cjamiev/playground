import React from 'react';

export const CloseSVG = ({ transform, conditions = {}, isBlack }) => {
  return (
    <g transform={transform}>
      <g
        className={isBlack ? 'icon--black' : 'icon--white'}
        data-testid="component-close"
        aria-label="close"
        transform="matrix(0.83542203,0.81328173,-0.81328173,0.83542203,26.414205,-16.621954)"
      >
        <rect
          data-testid="rect1103-0"
          className="svg__36"
          width="51.328522"
          height="15.165249"
          x="0.79407263"
          y="18.87571"
          ry="3.9005067"
          rx="3.9005067"
        />
        <rect
          data-testid="rect117-0"
          className="svg__36"
          width="51.328522"
          height="15.165249"
          x="0.79407263"
          y="-34.040958"
          ry="3.9005067"
          rx="3.9005067"
          transform="rotate(90)"
        />
      </g>
    </g>
  );
};
