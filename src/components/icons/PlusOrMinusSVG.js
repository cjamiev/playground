import React from 'react';

export const PlusOrMinusSVG = ({ transform, conditions = {} }) => {
  const isPlus = conditions.isPlus || false;

  return (
    <g transform={transform}>
      <g
        data-testid="component-plus"
        aria-label="plus"
        transform="matrix(1.0170865,0,0,1.0170865,0.08958619,0.08958619)"
      >
        <rect
          data-testid="rect1103"
          className="svg__36"
          width="51.328522"
          height="15.165249"
          x="0.79407263"
          y="18.87571"
          ry="4.4712605"
          rx="4.4712605"
        />
        {isPlus && (
          <rect
            data-testid="rect117"
            className="svg__36"
            width="51.328522"
            height="15.165249"
            x="0.79407263"
            y="-34.040958"
            ry="4.4712605"
            rx="4.4712605"
            transform="rotate(90)"
          />
        )}
      </g>
    </g>
  );
};
