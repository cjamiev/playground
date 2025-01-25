import React from 'react';
import { defaultSize, defaultViewBox } from './data';
import { SCSVGIcon } from './styles';

const defaultAriaLabel = 'List';

export const ListSVG = ({
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
          data-testid="component-list"
          className="svg__101"
          aria-label="list"
          transform="matrix(1.0112397,0,0,1.0112397,-158.04058,-619.63416)"
        >
          <rect
            data-testid="rect2014-5"
            className="svg__103"
            width="52.323479"
            height="50.73452"
            x="156.82216"
            y="614.07971"
          />
          <path data-testid="path1368" className="stroke stroke--black" d="m 165.14396,623.52202 34.88255,-0.19934" />
          <path data-testid="path1368-1" className="stroke stroke--black" d="m 165.14396,632.21892 34.88255,-0.19934" />
          <path
            data-testid="path1368-1-8"
            className="stroke stroke--black"
            d="m 165.14396,639.87175 34.88255,-0.19934"
          />
          <path
            data-testid="path1368-1-8-1"
            className="stroke stroke--black"
            d="m 165.14396,648.54965 34.88255,-0.19934"
          />
          <path
            data-testid="path1368-1-8-0"
            className="stroke stroke--black"
            d="m 165.14396,657.01637 34.88255,-0.19934"
          />
        </g>
      </g>
    </SCSVGIcon>
  );
};
