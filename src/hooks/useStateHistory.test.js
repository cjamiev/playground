import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen } from '@testing-library/react';
import useStateHistory from './useStateHistory';

const ZERO = 0;
const ONE = 1;

const TestComponent = () => {
  const [count, setCount] = useState(ZERO);
  const { set, back, forward } = useStateHistory((value) => { setCount(value);});

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => {
        setCount(count + ONE);
        set(count + ONE);
      }}>
        Increment
      </button>
      <button onClick={back}>Back</button>
      <button onClick={forward}>Forward</button>
    </div>
  );
};

describe('useDebug', () => {
  it('Should render debug info', () => {
    render(<TestComponent />);

    const incrementBtn = screen.getByText('Increment');
    const backBtn = screen.getByText('Back');
    const forwardBtn = screen.getByText('Forward');

    expect(screen.queryByText('0')).toBeInTheDocument();
    fireEvent.click(incrementBtn);
    expect(screen.queryByText('1')).toBeInTheDocument();
    fireEvent.click(incrementBtn);
    expect(screen.queryByText('2')).toBeInTheDocument();
    fireEvent.click(incrementBtn);
    expect(screen.queryByText('3')).toBeInTheDocument();

    fireEvent.click(backBtn);
    expect(screen.queryByText('2')).toBeInTheDocument();
    fireEvent.click(backBtn);
    expect(screen.getByText('1')).toBeInTheDocument();

    fireEvent.click(forwardBtn);
    expect(screen.queryByText('2')).toBeInTheDocument();
    fireEvent.click(forwardBtn);
    expect(screen.queryByText('3')).toBeInTheDocument();
  });
});
