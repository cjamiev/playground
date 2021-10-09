import { useState } from 'react';

const useLocalStorage = (key, initialValue, parse = true) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);

    return item && parse ? JSON.parse(item) : item || initialValue;
  });

  const setValue = (value) => {
    setStoredValue(value);

    localStorage.setItem(key, parse ? JSON.stringify(value) : value);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
