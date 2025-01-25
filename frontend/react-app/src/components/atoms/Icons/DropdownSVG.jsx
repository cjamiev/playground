import React from 'react';
import { defaultSize, defaultViewBox } from './data';
import { SCSVGIcon } from './styles';

const defaultAriaLabel = 'Dropdown';

export const DropdownSVG = ({
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
          data-testid="component-dropdown"
          className="svg__101"
          aria-label="dropdown"
          transform="matrix(0.9782331,0,0,0.9782331,-74.246693,-592.01666)"
        >
          <rect
            data-testid="rect2220-9"
            className="svg__107"
            width="54.079468"
            height="10.840312"
            x="76.459511"
            y="608.56793"
          />
          <rect
            data-testid="rect2220-9-2"
            className="svg__108"
            width="54.079468"
            height="10.840312"
            x="76.460136"
            y="622.89526"
          />
          <rect
            data-testid="rect2220-9-2-2"
            className="svg__108"
            width="54.079468"
            height="10.840312"
            x="76.459778"
            y="634.44171"
          />
          <rect
            data-testid="rect2220-9-2-2-7"
            className="svg__108"
            width="54.079468"
            height="10.840312"
            x="76.459778"
            y="646.17285"
          />
        </g>
      </g>
    </SCSVGIcon>
  );
};
