import { fireEvent, screen } from '@testing-library/react';
import { testRenderComponent } from 'testHelper';
import StyleGuide from './StyleGuide';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  return {
    __esModule: true,
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(() => mockDispatch)
  };
});

const defaultProps = {};

describe('StyleGuide', () => {
  it('checks page renders', () => {
    testRenderComponent(StyleGuide, defaultProps);

    expect(screen.getByText('CSS Style Guide')).toBeInTheDocument();
  });
});