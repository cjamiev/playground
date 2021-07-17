import React from 'react';
import './btn.css';

const getColor = (classColor) => {
  if(classColor === 'primary') {
    return ' btn--primary';
  }
  else if (classColor === 'secondary') {
    return ' btn--secondary';
  }
  return '';
};

const getType = (classType) => {
  if(classType === 'close') {
    return ' btn--close';
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

const Button = ({ label, classColor, classType, classSize, disabled = false, onClick}) => {
  const color = getColor(classColor);
  const type = getType(classType);
  const size = getSize(classSize);
  const className = `btn${color}${type}${size}`;

  return (
    <button className={className} disabled={disabled} onClick={onClick}>{label}</button>
  );
};

export default Button;