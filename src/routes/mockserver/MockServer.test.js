import { screen } from '@testing-library/react';
import { testRenderContainer } from 'testHelper';
import MockServer from './MockServer';

const mockHistory = {
  location: {
    pathname: '/mockserver'
  },
  push: jest.fn()
};
jest.mock('react-router-dom', () => {
  return {
    __esModule: true,
    ...jest.requireActual('react-router-dom'),
    useHistory: jest.fn(() => mockHistory)
  };
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  return {
    __esModule: true,
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(() => mockDispatch)
  };
});

describe('MockServer', () => {
  it('checks page renders', () => {
    testRenderContainer(MockServer);

    expect(mockDispatch).toHaveBeenCalled();
    expect(screen.getByText('Mock Server')).toBeInTheDocument();
  });
});