const ONE = 1;

const reverseString = (str = '') =>
  str
    .split('')
    .reverse()
    .join('');

const toDashCaseFromCamelCase = text => {
  return text.split('').map(char => {
    if(char === char.toUpperCase() && /[a-zA-Z]/.test(char)) {
      return `-${char.toLowerCase()}`;
    }

    return char;
  }).join('');
};

const toCamelCaseFromDashCase = text => {
  const dashIndices = [];
  return text.split('')
    .map((char, index) => {
      if(char === '-') {
        dashIndices.push(index);
        return '';
      }

      return char;
    })
    .map((char, index) => {
      if(dashIndices.find(i => i === index - ONE)) {
        return char.toUpperCase();
      }

      return char;
    })
    .join('');
};

export {
  reverseString,
  toDashCaseFromCamelCase,
  toCamelCaseFromDashCase
};
