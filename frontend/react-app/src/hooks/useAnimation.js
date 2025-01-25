import { useEffect, useState } from 'react';

const ZERO = 0;
const ONE = 1;
const HALF_SECOND = 500;
const ONE_SECOND = 1000;
const quarticCoefficient = 33;
const cubicCoefficient = 106;
const quadraticCoefficient = 126;
const linearCoefficient = 67;
const constantCoefficient = 15;
const exponentBase = 2;
const exponentPower = 10;
const easing = {
  linear: (n) => n,
  elastic: (n) => n
    * (quarticCoefficient * n * n * n * n
    - cubicCoefficient * n * n * n
    + quadraticCoefficient * n * n
    - linearCoefficient * n
    + constantCoefficient),
  inExpo: (n) => Math.pow(exponentBase, exponentPower * (n - ONE))
};

const useAnimation = (easingName = 'linear', duration = HALF_SECOND, delay = ZERO) => {
  const elapsed = useAnimationTimer(duration, delay);

  const n = Math.min(ONE, elapsed / duration);

  return easing[easingName](n);
};

const useAnimationTimer = (duration = ONE_SECOND, delay = ZERO) => {
  const [elapsed, setElapsed] = useState(ZERO);

  useEffect(
    () => {
      let animationFrame, timerStop, start;

      const onFrame = () => {
        setElapsed(Date.now() - start);
        loop();
      };

      const loop =() => {
        animationFrame = requestAnimationFrame(onFrame);
      };

      const onStart = () => {

        timerStop = setTimeout(() => {
          cancelAnimationFrame(animationFrame);
          setElapsed(Date.now() - start);
        }, duration);

        start = Date.now();
        loop();
      };

      const timerDelay = setTimeout(onStart, delay);

      return () => {
        clearTimeout(timerStop);
        clearTimeout(timerDelay);
        cancelAnimationFrame(animationFrame);
      };
    },
    [duration, delay]
  );

  return elapsed;
};

export default useAnimation;