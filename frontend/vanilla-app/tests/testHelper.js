export const testFunctionHelper = ({ testMessage = '', args, expectedResult }, functionToTest) => {
  const recievedResult = functionToTest(...args);

  it(testMessage, () => expect(recievedResult).toEqual(expectedResult));
};

