const ZERO = 0;
const ONE = 1;

const lowerCaseFirstLetter = (string) => {
  return string.charAt(ZERO).toLowerCase() + string.slice(ONE);
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(ZERO).toUpperCase() + string.slice(ONE);
};

module.exports = {
  lowerCaseFirstLetter,
  capitalizeFirstLetter
};
