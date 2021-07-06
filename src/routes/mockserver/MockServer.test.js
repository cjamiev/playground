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

describe('MockServer', () => {
  it('checks page renders', () => {
    testRenderContainer(MockServer);

    expect(screen.getByText('Mock Server')).toBeInTheDocument();
  });
});