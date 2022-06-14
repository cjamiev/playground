import React, { useRef } from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import useAnimation from './useAnimation';
import { TIME } from 'constants/time';
import { noop } from 'utils/noop';

const ZERO = 0;
const HALF_SECOND = 500;
window.requestAnimationFrame = noop;
window.cancelAnimationFrame = noop;

const TestComponent = () => {
  const elapsed = useAnimation('linear', TIME.A_SECOND, ZERO);

  return <div data-testid="elapsed">{elapsed}</div>;
};

describe('useAnimation', () => {
  it('Should elapse time', () => {
    jest.useFakeTimers();
    render(<TestComponent />);

    expect(screen.queryByText('0')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(HALF_SECOND);
    });

    expect(screen.queryByTestId('elapsed')).toHaveTextContent('0.');

    act(() => {
      jest.advanceTimersByTime(HALF_SECOND);
    });

    expect(screen.queryByText('1')).toBeInTheDocument();
  });
});
