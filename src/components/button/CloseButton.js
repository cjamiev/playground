import React from 'react';
import { getColor } from './helper';

const CloseButton = ({ classColor, onClick }) => {
  const color = getColor(classColor);
  const className = `btn btn__close${color}`;

  return (
    <button className={className} aria-label="Close button" onClick={onClick}>
      X
    </button>
  );
};

export default CloseButton;
