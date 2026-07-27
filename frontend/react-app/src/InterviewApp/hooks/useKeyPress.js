import { useEffect } from 'react';

const useKeyPress = (key, action) => {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === key) {
        action();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [action, key]);
};

export default useKeyPress;
