import React from 'react';

export const TextSVG = ({ transform, conditions = {}, text }) => {

  return (
    <g transform={transform} className="icon--white">
      <text data-testid="component-text" className="svg__85" aria-label="text" x="4.1267548" y="53.761513" >
        <tspan data-testid="tspan15498" className="svg__85" x="4.1267548" y="53.761513" >{text}
        </tspan>
      </text>
    </g>
  );
};

