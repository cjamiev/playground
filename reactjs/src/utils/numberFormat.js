import { roundNumber } from './math';

export function isInt(n) {
  if (n === '' || n === null) {
    return false;
  }

  return n % 1 === 0;
}

export function scrubFormatting(value) {
  return value.toString().replace('$', '').replace(',', '').replace('.', '');
}

export function getFormattedNumber(value) {
  if (value === 0) {
    return 0;
  }

  if (!value) {
    return '';
  }

  if (!isInt(scrubFormatting(value))) {
    return '';
  }

  let roundedValue = roundNumber(value, 2);
  roundedValue = roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const roundedValueContainsDecimalPlace = (roundedValue.indexOf('.') !== -1);

  if (roundedValueContainsDecimalPlace) {
    const numbersToTheRightOfDecimal = roundedValue.split('.')[1];

    switch (numbersToTheRightOfDecimal.length) {
    case 0:
      return roundedValue.replace('.', '');
    case 1:
      return `${roundedValue}0`;
    default:
      return roundedValue;
    }
  }
  return roundedValue;
}

export function getCurrencyFormattedNumber(value) {
  if (value === null) {
    return '';
  }

  return '$' + getFormattedNumber(value);
}
