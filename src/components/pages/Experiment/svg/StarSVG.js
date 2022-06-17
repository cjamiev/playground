import React from 'react';

export const StarSVG = ({ transform, conditions = {} }) => {

  return (
    <g transform={transform}>
      <path
        data-testid="component-star"
        className="svg__81"
        aria-label="star"
        transform="matrix(0.06998757,0,0,0.06998757,-27.543758,-77.182693)"
        d="M 1006.5008,1850.2741 774.46997,1723.7767 538.7226,1843.2049 587.32729,1583.4406 400.8944,1396.1368 l 262.07021,-34.0458 120.52551,-235.1882 113.36361,238.7229 260.92177,41.9494 -192.00767,181.5846 z"
      />
    </g>
  );
};

