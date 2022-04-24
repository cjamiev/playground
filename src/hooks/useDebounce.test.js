import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen } from '@testing-library/react';
import { TIME } from 'constants/time';
import useDebounce from './useDebounce';

const TWO = 2;

const TestComponent = () => {
  const [str, setStr] = useState('Test');
  const debouncedStr = useDebounce(str, TIME.A_SECOND);

  return (
    <>
      <button onClick={() => { setStr('Test123');}}> Update </button>
      <div>{debouncedStr}</div>
    </>
  );
};

describe('useDebounce', () => {
  it.skip('Should update debouncedValue after delayed time', () => {
    jest.useFakeTimers();
    act(() => {
      render(<TestComponent />);

      expect(screen.queryByText('Test')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Update'));
      expect(screen.queryByText('Test')).toBeInTheDocument();

      jest.advanceTimersByTime(TIME.A_SECOND);
    });

    expect(screen.getByText('Test123')).toBeInTheDocument();
  });
});
