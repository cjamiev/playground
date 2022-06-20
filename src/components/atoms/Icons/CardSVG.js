import React from 'react';
import { defaultSize, defaultViewBox } from './data';
import { SCSVGIcon } from './styles';

const defaultAriaLabel = 'Card';

export const CardSVG = ({
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
          data-testid="component-card"
          className="svg__101"
          aria-label="card"
          transform="matrix(0.90287316,0,0,0.90287316,-152.30243,-624.95894)"
        >
          <path
            data-testid="path2237"
            className="stroke stroke--white fill--white"
            d="m 173.08264,692.75343 47.35812,8.31586 -0.0705,50.24753 -47.35813,-8.87963"
          />
          <path
            data-testid="path2352"
            className="stroke stroke--white"
            d="m 173.08265,743.07143 -0.56379,-50.17703 51.44558,0.70473 0.70473,51.58652"
          />
          <path data-testid="path2752" className="stroke stroke--white" d="m 224.81012,744.62187 h -4.79219" />
        </g>
      </g>
    </SCSVGIcon>
  );
};
