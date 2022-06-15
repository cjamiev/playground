import { useState, useEffect } from 'react';

const useSize = (ref) => {
  const [size, setSize] = useState({});

  useEffect(() => {
    if(ref.current) {
      const sizeObserver = new ResizeObserver(([entry]) => setSize(entry.contentRect));
      sizeObserver.observe(ref.current);

      return () => {
        sizeObserver.disconnect();
      };
    }
  }, [ref]);

  return size;
};

export default useSize;