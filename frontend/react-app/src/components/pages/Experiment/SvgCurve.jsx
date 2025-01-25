import React, { useState, useRef } from 'react';
import useKeyPress from '../../../hooks/useKeyPress';
import useDrag from '../../../hooks/useDrag';

const ONE = 1;

const Controller = ({ onChange }) => {
  const upPress = useKeyPress('ArrowUp', () => {
    onChange((current) => ({ x: current.x, y: current.y - ONE }));
  });
  const downPress = useKeyPress('ArrowDown', () => {
    onChange((current) => ({ x: current.x, y: current.y + ONE }));
  });
  const leftPress = useKeyPress('ArrowLeft', () => {
    onChange((current) => ({ x: current.x - ONE, y: current.y }));
  });
  const rightPress = useKeyPress('ArrowRight', () => {
    onChange((current) => ({ x: current.x + ONE, y: current.y }));
  });

  return (
    <div>
      <button
        onClick={() => {
          onChange((current) => ({ x: current.x, y: current.y - ONE }));
        }}
      >
        Up
      </button>
      <button
        onClick={() => {
          onChange((current) => ({ x: current.x - ONE, y: current.y }));
        }}
      >
        Left
      </button>
      <button
        onClick={() => {
          onChange((current) => ({ x: current.x + ONE, y: current.y }));
        }}
      >
        Right
      </button>
      <button
        onClick={() => {
          onChange((current) => ({ x: current.x, y: current.y + ONE }));
        }}
      >
        Down
      </button>
    </div>
  );
};

const SvgCurve = () => {
  const ref = useRef();
  const [startCoord, setStartCoord] = useState({ x: 100, y: 250 });
  const [controlPointOneCoord, setControlPointOneCoord] = useState({ x: 100, y: 100 });
  const [controlPointTwoCoord, setControlPointTwoCoord] = useState({ x: 400, y: 100 });
  const [endCoord, setEndCoord] = useState({ x: 400, y: 250 });
  const [controller, setController] = useState({ current: null, onChange: null });

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

  useDrag(ref, 'curve-start-point', handleStartCoordDrag);
  useDrag(ref, 'curve-control-point-one', handleControlPointOneCoordDrag);
  useDrag(ref, 'curve-control-point-two', handleControlPointTwoCoordDrag);
  useDrag(ref, 'curve-end-point', handleEndCoordDrag);

  return (
    <div ref={ref}>
      <svg viewBox="0 0 500 500" width="1920" height="1080" preserveAspectRatio="xMidYMid meet">
        <g>
          <circle
            data-testid="curve-start-point"
            className="svg__drag-point"
            cx={startCoord.x}
            cy={startCoord.y}
            r="16"
            onClick={() => {
              setController({ current: startCoord, onChange: setStartCoord });
            }}
          />
          <circle
            data-testid="curve-control-point-one"
            className="svg__drag-point"
            cx={controlPointOneCoord.x}
            cy={controlPointOneCoord.y}
            r="8"
            onClick={() => {
              setController({ current: controlPointOneCoord, onChange: setControlPointOneCoord });
            }}
          />
          <circle
            data-testid="curve-control-point-two"
            className="svg__drag-point"
            cx={controlPointTwoCoord.x}
            cy={controlPointTwoCoord.y}
            r="8"
            onClick={() => {
              setController({ current: controlPointTwoCoord, onChange: setControlPointTwoCoord });
            }}
          />
          <circle
            data-testid="curve-end-point"
            className="svg__drag-point"
            cx={endCoord.x}
            cy={endCoord.y}
            r="16"
            onClick={() => {
              setController({ current: endCoord, onChange: setEndCoord });
            }}
          />

          <line
            data-testid="control-point-one-line-reference"
            className="svg__reference-line"
            x1={startCoord.x}
            y1={startCoord.y}
            x2={controlPointOneCoord.x}
            y2={controlPointOneCoord.y}
          />
          <line
            data-testid="control-point-two-line-reference"
            className="svg__reference-line"
            x1={endCoord.x}
            y1={endCoord.y}
            x2={controlPointTwoCoord.x}
            y2={controlPointTwoCoord.y}
          />

          <path
            data-testid="svg-curve"
            className="svg__curve"
            d={`M${startCoord.x},${startCoord.y} C${controlPointOneCoord.x},${controlPointOneCoord.y} ${controlPointTwoCoord.x},${controlPointTwoCoord.y} ${endCoord.x},${endCoord.y}`}
          />
        </g>
      </svg>
      {controller.current && <Controller current={controller.current} onChange={controller.onChange} />}
    </div>
  );
};

export default SvgCurve;
