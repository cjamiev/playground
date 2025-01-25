/* eslint-disable max-lines */
/* eslint-disable complexity */
import React from 'react';

export const DiceSVG = ({ transform, conditions = {} }) => {
  const { showFour, showOne, showSix } = conditions;

  return (
    <g transform={transform}>
      <g data-testid="component-dice" aria-label="dice" transform="matrix(1.0509931,0,0,1.0509931,-0.88164127,-0.98889969)" >
        <rect data-testid="rect2750" className="svg__51" width="50.434021" height="50.434021" x="1.3118423" y="1.4138967" rx="7.5523839" ry="7.5523839" />
        { showFour && <circle data-testid="four" className="svg__52" aria-label="condition four" cx="9.9968348" cy="42.959305" r="4.316462" /> }
        { showOne && <circle data-testid="one" className="svg__52" aria-label="condition one" cx="26.528852" cy="26.630907" r="4.316462" /> }
        <circle data-testid="circle14816" className="svg__52" cx="42.471973" cy="9.7223959" r="4.316462" />
        <circle data-testid="circle14818" className="svg__52" cx="10.4378" cy="9.7223959" r="4.316462" />
        <circle data-testid="circle2009" className="svg__52" cx="42.744469" cy="43.244984" r="4.316462" />
        { showSix && <circle data-testid="six" className="svg__52" aria-label="condition six" cx="10.072995" cy="26.340843" r="4.316462" /> }
        <circle data-testid="circle14812" className="svg__52" cx="42.972923" cy="26.483675" r="4.316462" />
      </g>
    </g>
  );
};

