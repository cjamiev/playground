import React, { useCallback, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import useEvent from './useEvent';

const TestComponent = () => {
  const [code, setCode] = useState('');
  const handler = useCallback(
    ({ key }) => {
      setCode(key);
    },
    [setCode]
  );

  useEvent('keyup', handler);

  return (
    <>
      <div> Test </div>
      <div> {code} </div>
    </>
  );
};

describe('useEvent', () => {
  it('Should handle event', () => {
    render(<TestComponent />);

    fireEvent.keyUp(screen.getByText('Test'), {key: 'f', code: 'KeyF'});
    expect(screen.queryByText('f')).toBeInTheDocument();
  });
});
