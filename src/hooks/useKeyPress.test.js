import React, { useCallback, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import useKeyPress from './useKeyPress';

const TestComponent = () => {
  const [code, setCode] = useState('');

  useKeyPress('f', () => { setCode('f'); });

  return (
    <>
      <div> Test </div>
      <div> {code} </div>
    </>
  );
};

describe('useKeyPress', () => {
  it('Should handle key press', () => {
    render(<TestComponent />);

    fireEvent.keyDown(screen.getByText('Test'), {key: 'a', code: 'KeyA'});
    expect(screen.queryByText('a')).not.toBeInTheDocument();

    fireEvent.keyDown(screen.getByText('Test'), {key: 'f', code: 'KeyF'});
    expect(screen.getByText('f')).toBeInTheDocument();
  });
});
