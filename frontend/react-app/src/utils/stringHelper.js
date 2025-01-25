const toDashCaseFromCamelCase = text => {
  return text.split('').map(char => {
    if(char === char.toUpperCase() && /[a-zA-Z]/.test(char)) {
      return `-${char.toLowerCase()}`;
    }

    return char;
  }).join('');
};

export {
  toDashCaseFromCamelCase,
};