import { fireEvent, screen } from '@testing-library/react';
import { testRenderContainer } from 'testHelper';
import MockCreateEndpoint from './MockCreateEndpoint';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  return {
    __esModule: true,
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(() => mockDispatch)
  };
});

const mockCreateEndpointProps = {
  mockserver: {
    message: {
      error: false,
      message: 'Successfully did stuff'
    }
  }
};

describe('MockCreateEndpoint', () => {
  it('checks page renders', () => {
    testRenderContainer(MockCreateEndpoint, {}, mockCreateEndpointProps );

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    const submitBtn = screen.getByText('Submit');
    fireEvent.click(submitBtn);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});