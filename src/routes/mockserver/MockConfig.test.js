import { fireEvent, screen } from '@testing-library/react';
import { testRenderContainer } from 'testHelper';
import MockConfig from './MockConfig';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  return {
    __esModule: true,
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(() => mockDispatch)
  };
});

const mockConfigProps = {
  mockserver: {
    config: {
      delay: 1000,
      delayUrls: ['api/test', 'api/test2'],
      log: true,
      error: false,
      overrideUrls: ['api/test', 'api/test2'],
      overrideStatusCode: 200,
      overrideResponse: { testing: 123}
    }
  }
};

describe('MockConfig', () => {
  it('checks page renders', () => {
    testRenderContainer(MockConfig, {}, mockConfigProps );

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    const submitBtn = screen.getByText('Submit');
    fireEvent.click(submitBtn);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});