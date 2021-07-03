import { screen } from '@testing-library/react';
import { testRenderContainer } from 'testHelper';
import App from './index';

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