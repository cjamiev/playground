export const getColor = (classColor) => {
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

export const getSize = (isSmall) => {
  return isSmall ? ' btn--small': '';
};