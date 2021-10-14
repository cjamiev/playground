import { useCallback, useRef, useState } from 'react';

const ZERO = 0;
const ONE = 1;
const DEFAULT_MAX_CAPACITY = 3;

const useStateHistory = (initialValue, capacity = DEFAULT_MAX_CAPACITY) => {
  const [value, setValue] = useState(initialValue);
  const historyRef = useRef([value]);
  const pointerRef = useRef(ZERO);

  const set = useCallback(
    updateValue => {
      const resolvedValue = updateValue(value);
      if (historyRef.current[pointerRef.current] !== resolvedValue) {
        if (pointerRef.current < historyRef.current.length - ONE) {
          historyRef.current.splice(pointerRef.current + ONE);
        }
        historyRef.current.push(resolvedValue);

        while (historyRef.current.length > capacity) {
          historyRef.current.shift();
        }
        pointerRef.current = historyRef.current.length - ONE;
      }
      setValue(resolvedValue);
    },
    [capacity, value]
  );

  const back = useCallback(() => {
    if (pointerRef.current > ZERO) {
      pointerRef.current--;
      setValue(historyRef.current[pointerRef.current]);
    }
  }, []);

  const forward = useCallback(() => {
    if (pointerRef.current < historyRef.current.length - ONE) {
      pointerRef.current++;
      setValue(historyRef.current[pointerRef.current]);
    }
  }, []);

  return [
    value,
    set,
    {
      back,
      forward
    }
  ];
};

export default useStateHistory;