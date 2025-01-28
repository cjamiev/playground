import { useEffect, useState, useCallback } from 'react';

export const useWebWorker = (workerFunction, inputData) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const memoizedWorkerFunction = useCallback(workerFunction, []);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    let worker;
    let workerScriptUrl;
    try {
      const code = memoizedWorkerFunction.toString();
      const blob = new Blob([`(${code})()`], {type: 'application/javascript'});
      workerScriptUrl = URL.createObjectURL(blob);
      worker = new Worker(workerScriptUrl);
      
      worker.postMessage(inputData);
      
      worker.onmessage = (e) => {
        setResult(e.data);
        setIsLoading(false);
      }

      worker.onerror = (e) => {
        setError(e.message);
        setIsLoading(false);
      }
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }

    return () => {
      worker.terminate();
      URL.revokeObjectURL(workerScriptUrl);
    }

  }, [inputData, memoizedWorkerFunction])

  return { error, result, isLoading}
}