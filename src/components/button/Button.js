import React from 'react';
import './btn.css';

const getColor = (classColor) => {
  if(classColor === 'primary') {
    return ' btn--primary';
  }
  else if (classColor === 'secondary') {
    return ' btn--secondary';
  }
  else if (classColor === 'error') {
    return ' btn--error';
  }
  else if (classColor === 'inherit') {
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

const Button = ({ label, classColor, classSize, disabled = false, onClick}) => {
  const color = getColor(classColor);
  const size = getSize(classSize);
  const className = `btn${color}${size}`;

  return (
    <button className={className} disabled={disabled} onClick={onClick}>{label}</button>
  );
};

export default Button;