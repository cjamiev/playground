import { useEffect, useState } from "react";

const useDelay = (isActive, delay, duration) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setCount(0);
    }
  }, [isActive]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (count < duration && isActive) {
        setCount((prev) => prev + 1);
      } else {
        clearInterval(intervalId);
      }
    }, delay);
    return () => clearInterval(intervalId);
  }, [count, delay, duration, isActive]);

  const reset = () => {
    setCount(0);
  };

  return { count, reset };
};

export { useDelay };
