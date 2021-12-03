import React, { useCallback, useState, useEffect, useRef } from 'react';
import { noop } from 'helper/noop';

const ONE = 1;

const useDrag = (ref, deps = [], options) => {
  const {
    onPointerDown = noop,
    onPointerUp = noop,
    onPointerMove = noop,
    onDrag = noop
  } = options;

  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = useCallback((e) => {
    setIsDragging(true);

    onPointerDown(e);
  },[onPointerDown]);

  const handlePointerUp = useCallback((e) => {
    setIsDragging(false);

    onPointerUp(e);
  },[onPointerUp]);

  const handlePointerMove = useCallback((e) => {
    onPointerMove(e);

    if (isDragging) {
      onDrag(e);
    }
  },[isDragging, onDrag, onPointerMove]);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('pointerdown', handlePointerDown);
      element.addEventListener('pointerup', handlePointerUp);
      element.addEventListener('pointermove', handlePointerMove);

      return () => {
        element.removeEventListener('pointerdown', handlePointerDown);
        element.removeEventListener('pointerup', handlePointerUp);
        element.removeEventListener('pointermove', handlePointerMove);
      };
    }

    return;
  }, [handlePointerDown, handlePointerMove, handlePointerUp, isDragging, ref]);

  return { isDragging };
};


const useKeyPress = (key, action) => {
  useEffect(() => {
    const onKeyup = (e) => {
      if (e.key === key) action();
    };
    window.addEventListener('keydown', onKeyup);
    return () => window.removeEventListener('keydown', onKeyup);
  }, [action, key]);
};

const Controller = ({ onChange }) => {
  const upPress = useKeyPress('ArrowUp', () => { onChange((current) => ({ x: current.x, y: current.y - ONE })); });
  const downPress = useKeyPress('ArrowDown', () => { onChange((current) => ({ x: current.x, y: current.y + ONE })); });
  const leftPress = useKeyPress('ArrowLeft', () => { onChange((current) => ({ x: current.x - ONE, y: current.y })); });
  const rightPress = useKeyPress('ArrowRight', () => { onChange((current) => ({ x: current.x + ONE, y: current.y })); });

  return (
    <div>
      <button onClick={() => { onChange((current) => ({ x:current.x, y: current.y - ONE }));}}>Up</button>
      <button onClick={() => { onChange((current) => ({ x:current.x - ONE, y: current.y }));}}>Left</button>
      <button onClick={() => { onChange((current) => ({ x:current.x + ONE, y: current.y }));}}>Right</button>
      <button onClick={() => { onChange((current) => ({ x:current.x, y: current.y + ONE }));}}>Down</button>
    </div>
  );
};

const SvgCurve = () => {
  const startCoordRef = useRef();
  const controlPointOneCoordRef = useRef();
  const controlPointTwoCoordRef = useRef();
  const endCoordRef = useRef();
  const [startCoord, setStartCoord] = useState({ x: 100, y: 250 });
  const [controlPointOneCoord, setControlPointOneCoord] = useState({ x: 100, y: 100 });
  const [controlPointTwoCoord, setControlPointTwoCoord] = useState({ x: 400, y: 100 });
  const [endCoord, setEndCoord] = useState({ x: 400, y: 250 });
  const [controller, setController] = useState({ current: null, onChange: null});

  const handleStartCoordDrag = (e) => {
    setStartCoord({
      x: startCoord.x + e.movementX,
      y: startCoord.y + e.movementY
    });
  };

  const handleControlPointOneCoordDrag = (e) => {
    setControlPointOneCoord({
      x: controlPointOneCoord.x + e.movementX,
      y: controlPointOneCoord.y + e.movementY
    });
  };

  const handleControlPointTwoCoordDrag = (e) => {
    setControlPointTwoCoord({
      x: controlPointTwoCoord.x + e.movementX,
      y: controlPointTwoCoord.y + e.movementY
    });
  };

  const handleEndCoordDrag = (e) => {
    setEndCoord({
      x: endCoord.x + e.movementX,
      y: endCoord.y + e.movementY
    });
  };

  useDrag(startCoordRef, [startCoord], { onDrag: handleStartCoordDrag });
  useDrag(controlPointOneCoordRef, [controlPointOneCoord], { onDrag: handleControlPointOneCoordDrag });
  useDrag(controlPointTwoCoordRef, [controlPointTwoCoord], { onDrag: handleControlPointTwoCoordDrag });
  useDrag(endCoordRef, [endCoord], { onDrag: handleEndCoordDrag });

  return (
    <div>
      <svg viewBox="0 0 500 500" width="1920" height="1080" preserveAspectRatio="xMidYMid meet">
        <g>
          <circle
            data-testid="curve-start-point"
            className="svg__drag-point"
            cx={startCoord.x}
            cy={startCoord.y}
            r="16"
            ref={startCoordRef}
            onClick={() => { setController({ current: startCoord, onChange: setStartCoord });}}
          />
          <circle
            data-testid="curve-control-point-one"
            className="svg__drag-point"
            cx={controlPointOneCoord.x}
            cy={controlPointOneCoord.y}
            r="8"
            ref={controlPointOneCoordRef}
            onClick={() => { setController({ current: controlPointOneCoord, onChange: setControlPointOneCoord });}}
          />
          <circle
            data-testid="curve-control-point-two"
            className="svg__drag-point"
            cx={controlPointTwoCoord.x}
            cy={controlPointTwoCoord.y}
            r="8"
            ref={controlPointTwoCoordRef}
            onClick={() => { setController({ current: controlPointTwoCoord, onChange: setControlPointTwoCoord });}}
          />
          <circle
            data-testid="curve-end-point"
            className="svg__drag-point"
            cx={endCoord.x}
            cy={endCoord.y}
            ref={endCoordRef}
            r="16"
            onClick={() => { setController({ current: endCoord, onChange: setEndCoord });}}
          />

          <line data-testid="control-point-one-line-reference" className="svg__reference-line" x1={startCoord.x} y1={startCoord.y} x2={controlPointOneCoord.x} y2={controlPointOneCoord.y} />
          <line data-testid="control-point-two-line-reference" className="svg__reference-line" x1={endCoord.x} y1={endCoord.y} x2={controlPointTwoCoord.x} y2={controlPointTwoCoord.y} />

          <path data-testid="svg-curve" className="svg__curve" d={`M${startCoord.x},${startCoord.y} C${controlPointOneCoord.x},${controlPointOneCoord.y} ${controlPointTwoCoord.x},${controlPointTwoCoord.y} ${endCoord.x},${endCoord.y}`} />
        </g>
      </svg>
      {controller.current && <Controller current={controller.current} onChange={controller.onChange} />}
    </div>
  );
};

export default SvgCurve;
