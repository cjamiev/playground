import React, { useRef } from 'react';
import { render, screen } from '@testing-library/react';
import useSize from './useSize';

const contentRect = {
  x:1,
  y:2,
  width:100,
  height:200,
  top:3,
  right:102,
  bottom:202,
  left:4
};

class ResizeObserver {
  constructor(func) {
    func([{ contentRect }]);
  }
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}

window.ResizeObserver = ResizeObserver;

const TestComponent = () => {
  const ref = useRef();
  const size = useSize(ref);

  return (
    <>
      <div>{JSON.stringify(size)}</div>
      <div
        ref={ref}
      >
        ref
      </div>
    </>
  );
};

describe('useSize', () => {
  it('Should display size params', () => {
    render(<TestComponent />);

    expect(screen.getByText(JSON.stringify(contentRect))).toBeInTheDocument();
  });
});
