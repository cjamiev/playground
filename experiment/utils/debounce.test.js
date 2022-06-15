import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen } from '@testing-library/react';
import { TIME } from 'constants/time';
import debounce from './debounce';

const TWO = 2;

const TestComponent = () => {
  const [str, setStr] = useState('Test');
  const handleClick = debounce(() => {
    setStr('Test123');
  }, TIME.A_SECOND);

  return (
    <>
      <button onClick={handleClick()}>Update</button>
      <div>{str}</div>
    </>
  );
};

describe('debounce', () => {
  it('Should update debouncedValue after delayed time', () => {
    jest.useFakeTimers();

    render(<TestComponent />);

    expect(screen.queryByText('Test')).toBeInTheDocument();

    act(() => {
      fireEvent.click(screen.getByText('Update'));
      expect(screen.queryByText('Test')).toBeInTheDocument();

      jest.advanceTimersByTime(TIME.A_SECOND);
    });

    expect(screen.getByText('Test123')).toBeInTheDocument();
  });
});
