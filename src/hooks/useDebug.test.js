import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen } from '@testing-library/react';
import useDebug from './useDebug';

const ZERO = 0;
const ONE = 1;

const TestComponent = () => {
  const [toggle, setToggle] = useState(false);
  const [count, setCount] = useState(ZERO);
  const { renderCount, changedProps } = useDebug('TestComponent', { toggle, count }, false);

  const displayCount = `Render Count ${renderCount}`;
  const displayUpdatedProps = `Changed Props ${JSON.stringify(changedProps)}`;

  return (
    <>
      <button
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        Toggle
      </button>
      <button onClick={() => setCount((prevCount) => prevCount + ONE)}>Increment</button>
      <div>{displayCount}</div>
      <div>{displayUpdatedProps}</div>
    </>
  );
};

describe('useDebug', () => {
  it('Should render debug info', () => {
    render(<TestComponent />);

    expect(screen.queryByText('Render Count 1')).toBeInTheDocument();
    expect(screen.queryByText('Changed Props {}')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.queryByText('Render Count 2')).toBeInTheDocument();
    expect(screen.getByText('Changed Props {"toggle":{"previous":false,"current":true}}')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Increment'));
    expect(screen.queryByText('Render Count 3')).toBeInTheDocument();
    expect(screen.queryByText('Changed Props {"count":{"previous":0,"current":1}}')).toBeInTheDocument();
  });
});
