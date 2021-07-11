import { fireEvent, screen } from '@testing-library/react';
import { testRenderContainer } from 'testHelper';
import MockViewEndpoint from './MockViewEndpoint';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  return {
    __esModule: true,
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(() => mockDispatch)
  };
});

const mockViewEndpointProps = {
  mockserver: {
    mocks: [{ method: 'GET', url: '/test', responsePath: 'filename' }],
    message: {
      error: false,
      message: 'Successfully did stuff'
    }
  }
};

describe('MockViewEndpoint', () => {
  it('checks page renders', () => {
    testRenderContainer(MockViewEndpoint, {}, mockViewEndpointProps );

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    const loadBtn = screen.getByText('Load');
    fireEvent.click(loadBtn);

    expect(mockDispatch).toHaveBeenCalledTimes(3);
  });
});