import { useEffect } from 'react';

const useOnClickOutside = (elmentRef, handleOnClick) => {

  useEffect(() => {
    const listener = (event) => {
      if (elmentRef.current && !elmentRef.current.contains(event.target)) {
        handleOnClick();
      }
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [elmentRef, handleOnClick]);
};

export default useOnClickOutside;
