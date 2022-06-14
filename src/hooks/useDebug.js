import { useEffect, useRef } from 'react';
import { clockBetweenDates, getFormattedClock } from 'utils/clock';
import { TIME } from 'constants/time';

const ONE = 1;

const useDebug = (name, props, shouldPrintConsole = true) => {
  const countRef = useRef(ONE);
  const changedProps = useRef({});
  const previousProps = useRef(props);
  const lastRenderTimestamp = useRef(Date.now());

  const propKeys = Object.keys({ ...props, ...previousProps });
  changedProps.current = propKeys.reduce((accumulator, key) => {
    if (props[key] === previousProps.current[key]) {
      return accumulator;
    }
    return {
      ...accumulator,
      [key]: { previous: previousProps.current[key], current: props[key] }
    };
  }, {});
  const debugInfo = {
    renderCount: countRef.current,
    changedProps: changedProps.current,
    timeFromLastRender: `${(Date.now() - lastRenderTimestamp.current) / TIME.A_SECOND}s`,
    lastRenderTimestamp: getFormattedClock(new Date(lastRenderTimestamp.current))
  };

  useEffect(() => countRef.current++);

  useEffect(() => {
    previousProps.current = props;
    lastRenderTimestamp.current = Date.now();
    if (shouldPrintConsole) {
      console.log('[debug-info]', name, debugInfo);
    }
  });

  return debugInfo;
};

export default useDebug;
