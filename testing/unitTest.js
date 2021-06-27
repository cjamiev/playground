const isNotEmpty = targetObject => {
  if (!targetObject || !Object.keys(targetObject).length) {
    return false;
  }

  const entries = Object.keys(targetObject);
  const atLeastOneNotNull = entries.some(key => !isNil(targetObject[key]));

  return atLeastOneNotNull;
};
const isEmpty = targetObject => !isNotEmpty(targetObject);
const xOr = (a, b) => (!a && b) || (a && !b);
const isObjectLike = value => value !== null && typeof value === 'object';
const isEqual = (entry1, entry2) => {
  if (!(isObjectLike(entry1) && isObjectLike(entry1))) {
    return entry1 === entry2;
  }
  if (xOr(isEmpty(entry1), isEmpty(entry2))) {
    return false;
  }

  const keys1 = Object.keys(entry1);
  const keys2 = Object.keys(entry2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  const checkEquality = keys1.reduce((accumulator, key) => {
    const child1 = entry1[key];
    const child2 = entry2[key];

    return isObjectLike(child1) && isObjectLike(child2)
      ? accumulator && isEqual(child1, child2)
      : accumulator && child1 === child2;
  }, true);

  return checkEquality;
};

const getFormatedMessage = (testMessage, args, expectedResult, receivedResult) => {
  const failMessage = `\nfail: ${testMessage} \n`;
  const argumentsMessage = args.length > 1 ?
    `${args.map((item, index) => 'input' + (index + 1) + ':' + JSON.stringify(item)).join(',\n')} \n` :
    `input: ${args.map(item => JSON.stringify(item))} \n`;
  const expectedResultMessage = `Expected: ${JSON.stringify(expectedResult)} \n`;
  const receivedResultMessage = `Received: ${JSON.stringify(receivedResult)} \n`;

  return failMessage + argumentsMessage + expectedResultMessage + receivedResultMessage;
};

const executeTests = ({ testMessage = '', args, expectedResult }, functionToTest) => {
  const receivedResult = functionToTest(...args);

  if (isEqual(receivedResult, expectedResult)) {
    return { passed: true, message: `pass: ${testMessage}` };
  } else {
    return {
      passed: false,
      message: getFormatedMessage(testMessage, args, expectedResult, receivedResult)
    };
  }
};

const unitTest = (testData, functionToTest, failOnly = false) => {
  const results = testData.map(testItem => executeTests(testItem, functionToTest));
  const passedCount = results.filter(entry => entry.passed).length;

  results.forEach(entry => {
    if (failOnly && entry.passed) {
      return;
    } else {
      console.log(entry.message);
    }
  });

  console.log(`Total Tests: ${testData.length}, Passed: ${passedCount}, Failed: ${testData.length - passedCount}`);
};

module.exports = { unitTest };
