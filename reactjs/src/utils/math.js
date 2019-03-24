export function roundNumber(numberToRound, numberOfDecimalPlaces) {
  if (numberToRound === 0) {
    return 0;
  }

  if (!numberToRound) {
    return '';
  }

  const scrubbedNumber = numberToRound.toString().replace('$', '').replace(',', '');
  return Math.round(scrubbedNumber * Math.pow(10, numberOfDecimalPlaces)) / Math.pow(10, numberOfDecimalPlaces);
}

export function convertToPennies(value) {
  if (value === 0) {
    return 0;
  }

  let dollarValue = parseFloat(value);
  dollarValue = roundNumber(dollarValue, 2);
  const dollarValueContainsDecimal = (dollarValue.toString().indexOf('.') !== -1);
  return (dollarValueContainsDecimal) ? parseInt(dollarValue.toString().replace('.', ''), 10) : parseInt(dollarValue, 10) * 100;
}


// adds array of values passed.
export function addArray(values) {
  const total = values.reduce((previousValue, currentValue) => {
    return previousValue + parseInt(convertToPennies(currentValue), 10);
  }, 0);

  return total / 100;
}