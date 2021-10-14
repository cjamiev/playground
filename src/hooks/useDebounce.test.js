import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { TIME } from 'constants/time';
import useDebounce from './useDebounce';

const TWO = 2;

const TestComponent = () => {
  const [str, setStr] = useState('Test');
  const debouncedStr = useDebounce(str, TIME.A_SECOND*TWO);

  return (
    <>
      <button onClick={() => { setStr('Test123');}}> Update </button>
      <div>{debouncedStr}</div>
    </>
  );
};

describe('useDebounce', () => {
  it('Should update debouncedValue after delayed time', () => {
    jest.useFakeTimers();
    render(<TestComponent />);

    expect(screen.queryByText('Test')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Update'));
    jest.advanceTimersByTime(TIME.A_SECOND);
    expect(screen.queryByText('Test')).toBeInTheDocument();

    jest.advanceTimersByTime(TIME.A_SECOND);
    expect(screen.queryByText('Test123')).toBeInTheDocument();
  });
});
