import React from 'react';

const getColor = (classColor) => {
  if(classColor === 'primary') {
    return ' btn--primary';
  }
  else if (classColor === 'secondary') {
    return ' btn--secondary';
  }
  else if (classColor === 'error' || classColor === 'success') {
    return ' btn--inherit';
  }
  return '';
};

const getSize = (classSize) => {
  if(classSize === 'wide') {
    return ' btn--wide';
  }
  else if(classSize === 'small') {
    return ' btn--small';
  }
  return '';
};

const CloseButton = ({ classColor, classSize, onClick }) => {
  const color = getColor(classColor);
  const size = getSize(classSize);
  const className = `btn btn__close${color}${size}`;

  return (
    <button className={className} aria-label="Close" onClick={onClick}>X</button>
  );
};

export default CloseButton;