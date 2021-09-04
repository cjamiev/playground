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

const CloseButton = ({ classColor, onClick }) => {
  const color = getColor(classColor);
  const className = `btn btn__close${color}`;

  return (
    <button className={className} aria-label="Close button" onClick={onClick}>X</button>
  );
};

export default CloseButton;