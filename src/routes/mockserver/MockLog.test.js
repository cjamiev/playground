import { fireEvent, screen } from '@testing-library/react';
import { testRenderContainer } from 'testHelper';
import MockLog from './MockLog';

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
    log: [{
      timestamp: '7/10/2021 13:48:20',
      url: '/api/test',
      value: {
        testing: 123
      }
    }],
    message: {
      error: false,
      message: 'Successfully did stuff'
    }
  }
};

describe('MockLog', () => {
  it('checks page renders', () => {
    testRenderContainer(MockLog, {}, mockConfigProps );

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    const clearBtn = screen.getByText('Clear Log');
    fireEvent.click(clearBtn);

    expect(mockDispatch).toHaveBeenCalledTimes(3);
    const loadBtn = screen.getByText('Load');
    fireEvent.click(loadBtn);

    expect(mockDispatch).toHaveBeenCalledTimes(4);
  });
});