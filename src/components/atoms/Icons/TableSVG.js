import React from 'react';
import { defaultSize, defaultViewBox } from './data';
import { SCSVGIcon } from './styles';

const defaultAriaLabel = 'Table';

export const TableSVG = ({
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
          data-testid="component-table"
          className="svg__101"
          aria-label="table"
          transform="translate(-89.158833,-611.77821)"
        >
          <rect
            data-testid="rect2014"
            className="svg__103"
            width="52.323479"
            height="50.73452"
            x="89.997093"
            y="613.41095"
          />
          <rect
            data-testid="rect2220"
            className="svg__74"
            aria-label="rect2220"
            width="52.323708"
            height="10.488367"
            x="89.997093"
            y="613.41095"
          />
          <path data-testid="path2379-6-3-6" className="stroke stroke--black" d="M 142.396,651.96994 H 89.976" />
          <path data-testid="path2379-6" className="stroke stroke--black" d="m 127.46729,624.23629 v 40.26442" />
          <path data-testid="path2379-6-3" className="stroke stroke--black" d="m 142.64917,637.15881 h -53.02" />
          <path data-testid="path2379" className="stroke stroke--black" d="m 107.55274,623.89932 v 40.42279" />
        </g>
      </g>
    </SCSVGIcon>
  );
};
