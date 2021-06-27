import { fireEvent, screen } from '@testing-library/react';
import { testRenderContainer } from 'testHelper/componentSetup';
import App from './index';

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

const ZERO = 0;
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

describe('App', () => {
  it('checks page renders', () => {
    testRenderContainer(App, defaultProps, defaultStoreProps);

    expect(screen.getAllByText('Home')[ZERO]).toBeInTheDocument();
  });
});