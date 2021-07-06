import { screen } from '@testing-library/react';
import { testRenderContainer } from 'testHelper';
import Home from './Home';

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

describe('Home', () => {
  it('checks page renders', () => {
    testRenderContainer(Home);

    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});