const testHelper = ({ testMessage = '', expectedResult, recievedResult }) => {
  it(testMessage, () => expect(recievedResult).toEqual(expectedResult));
};

export {
  setupShallow
} from './componentSetup';

export {
  createEventWithOptions
} from './htmlEventSetup';

export {
  testHelper
};