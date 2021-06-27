import { fireEvent, screen } from '@testing-library/react';
import { testRenderContainer } from 'testHelper/componentSetup';
import Navigation from './Navigation';

const defaultProps = {};
const defaultStoreProps = {
  globalModal: {
    modalQueue: [{
      title: 'test-title',
      message: 'test-message',
      action: jest.fn()
    }]
  }
};

const mockHistory = {
  location: {
    pathname: '/home'
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

describe('Navigation', () => {
  it('checks dropdown behavior', () => {
    testRenderContainer(Navigation, defaultProps, defaultStoreProps);

    const navLink = screen.getByText('Experiment');
    fireEvent.click(navLink);

    expect(mockHistory.push).toHaveBeenCalledWith('/experiment');
    expect(mockDispatch).toHaveBeenCalled();
  });
});