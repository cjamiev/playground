import React from 'react';
import { render, screen } from '@testing-library/react';
import useMediaQuery from './useMediaQuery';

const SIZE_1600 = 1600;
const SIZE_1200 = 1200;
const SIZE_800 = 800;
const ZERO = 0;

const matchMedia = (value) => ({ media: value, matches: true, onchange: null, addListener: jest.fn(), removeListener: jest.fn() });

window.matchMedia = matchMedia;

const TestComponent = () => {
  const result = useMediaQuery(
    ['(min-width: 1600px)','(min-width: 1200px)', '(min-width: 800px)'],
    [SIZE_1600, SIZE_1200, SIZE_800],
    ZERO);

  return (<div>{result}</div>);
};

describe('useSize', () => {
  it('Should display size params', () => {
    render(<TestComponent />);

    expect(screen.getByText(SIZE_1600)).toBeInTheDocument();
  });
});
