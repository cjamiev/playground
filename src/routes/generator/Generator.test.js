import { screen } from '@testing-library/react';
import { testRenderContainer } from 'testHelper';
import Generator from './Generator';

const mockHistory = {
  location: {
    pathname: '/generator'
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

describe('Generator', () => {
  it('checks page renders', () => {
    testRenderContainer(Generator);

    expect(screen.getByText('Generator')).toBeInTheDocument();
  });
});