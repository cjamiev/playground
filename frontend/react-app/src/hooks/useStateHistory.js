import { useCallback, useRef, useState } from 'react';

const ZERO = 0;
const ONE = 1;
const DEFAULT_MAX_CAPACITY = 3;

const useStateHistory = (handler, capacity = DEFAULT_MAX_CAPACITY) => {
  const [history, setHistory] = useState(Array.from({ length: capacity }));
  const [currentIndex, setCurrentIndex] = useState(ZERO);

  const set = (newValue) => {
    const updatedHistory = [...history.slice(ONE), newValue];
    setHistory(updatedHistory);
    if(currentIndex < capacity - ONE) {
      setCurrentIndex(currentIndex + ONE);
    }
  };

  const back = () => {
    if (currentIndex > ZERO) {
      handler(history[currentIndex - ONE]);
      setCurrentIndex(currentIndex - ONE);
    }
  };

  const forward = () => {
    if (currentIndex < capacity - ONE) {
      setCurrentIndex(currentIndex + ONE);
      handler(history[currentIndex + ONE]);
    }
  };

  return {
    set,
    back,
    forward
  };
};

export default useStateHistory;