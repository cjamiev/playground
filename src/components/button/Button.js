import React from 'react';
import './btn.css';

const getColor = (classColor) => {
  if(classColor === 'primary') {
    return ' btn--primary';
  }
  else if (classColor === 'secondary') {
    return ' btn--secondary';
  }
  else if (classColor === 'inherit') {
    return ' btn--inherit';
  }
  return '';
};

const getSize = (isSmall) => {
  return isSmall ? ' btn--small': '';
};

const Button = ({ label, ariaLabel, className, classColor, isSmall = false, disabled = false, onClick}) => {
  const btnClass = className ? className : `btn ${getSize(isSmall)}${getColor(classColor)}`;

  return (
    <button aria-label={ariaLabel} className={btnClass} disabled={disabled} onClick={onClick}>{label}</button>
  );
};

export default Button;