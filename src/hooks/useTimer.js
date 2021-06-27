import { useState, useEffect, useRef } from 'react';
import { clockBetweenDates, getFormattedDate } from 'clock';

const INACTIVE = -1;
const ONE_SECOND = 1000;

const useTimer = (date) => {
  const [clock, setClock] = useState(clockBetweenDates(date, new Date()));

  useEffect(() => {
    const timerId = setInterval(() => { setClock(clockBetweenDates(date, new Date())); }, ONE_SECOND);

    return () => {
      clearInterval(timerId);
    };
  }, [date, setClock]);

  return clock;
};

export default useTimer;