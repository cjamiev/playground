import React from 'react';
import { defaultSize, defaultViewBox } from './data';
import { SCSVGIcon } from './styles';

const defaultAriaLabel = 'Form';

export const FormSVG = ({
  ariaLabel = defaultAriaLabel,
  width = defaultSize,
  height = defaultSize,
  viewBox = defaultViewBox,
  transform,
  onClick
}) => {
  return (
    <SCSVGIcon aria-label={ariaLabel} width={width} height={height} viewBox={viewBox} onClick={onClick}>
      <g transform={transform}>
        <g
          data-testid="component-form"
          className="svg__101"
          aria-label="form"
          transform="matrix(0.71307204,0,0,0.71307204,-586.22464,-263.3957)"
        >
          <rect
            data-testid="rect2014-5-5-0"
            className="stroke stroke--white"
            width="73.035652"
            height="70.817711"
            x="823.45789"
            y="371.8371"
          />
          <rect
            data-testid="rect9562-9"
            className="fill--white"
            width="7.1758389"
            height="76.143623"
            x="933.32056"
            y="-253.38737"
            ry="5.0316367"
            rx="5.0316367"
            transform="rotate(38.065956)"
          />
          <rect
            data-testid="rect9562-6-7"
            className="fill--white"
            width="7.1758389"
            height="30.826008"
            x="144.62625"
            y="914.74878"
            ry="5.0316367"
            rx="5.0316367"
            transform="rotate(-53.912002)"
          />
        </g>
      </g>
    </SCSVGIcon>
  );
};
