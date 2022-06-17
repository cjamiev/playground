/* eslint-disable max-lines */
/* eslint-disable complexity */
import React from 'react';

export const ImageSVG = ({ transform, conditions = {} }) => {

  return (
    <g transform={transform}>
      <g data-testid="component-image" aria-label="image" transform="matrix(0.57161394,0,0,0.57161394,-30.146933,-47.431445)" >
        <rect data-testid="rect1541" className="svg__45" width="89.58036" height="85.04464" x="55.184521" y="87.690468" rx="5.9511952" ry="6.6124387" />
        <ellipse data-testid="path1547" className="svg__46" cx="75.406258" cy="104.13245" rx="6.9346433" ry="6.5566669" />
        <path data-testid="path1549" className="svg__47" d="m 54.882141,154.21428 31.372024,-26.08035 21.166665,20.41071" />
        <path data-testid="path1551" className="svg__47" d="M 145.8937,142.11904 114.52163,116.03869 93.354896,136.4494" />
      </g>
    </g>
  );
};

