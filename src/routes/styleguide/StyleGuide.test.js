import { screen } from '@testing-library/react';
import { testRenderContainer } from 'testHelper';
import StyleGuide from './StyleGuide';

const mockHistory = {
  location: {
    pathname: '/styleguide'
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

const defaultProps = {};

describe('StyleGuide', () => {
  it('checks page renders', () => {
    testRenderContainer(StyleGuide);

    expect(screen.getByText('Style Guide')).toBeInTheDocument();
  });
});