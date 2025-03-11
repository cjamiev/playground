const DEFAULT_ITERATIONS = 100;

const runFunction = (functionToTest, args, iterations) => {
  const start1 = new Date().getTime();
  for (let i = 0; i < iterations; i++) {
    functionToTest(...args);
  }
  const end1 = new Date().getTime();
  return Math.round(end1 - start1);
};

export const comparePerformanceTests = (functionOne, argsOne, functionTwo, argsTwo, iterations = DEFAULT_ITERATIONS) => {
  const time1 = runFunction(functionOne, argsOne, iterations);
  const time2 = runFunction(functionTwo, argsTwo, iterations);

  console.log('First Function:' + time1 + 'ms');
  console.log('Second Function:' + time2 + 'ms');

  if (time1 > time2) {
    const result = Math.round(100 - (time2 / time1) * 100);
    console.log('Second function is faster than first one by ' + result + '%');
  }

  if (time2 > time1) {
    const result = Math.round(100 - (time1 / time2) * 100);
    console.log('First function is faster than second one by' + result + '%');
  }
};

export const performanceTest = (functionToTest, args, iterations = DEFAULT_ITERATIONS) => {
  const time = runFunction(functionToTest, args, iterations);

  console.log(`Total Time for ${iterations} runs:` + time + 'ms');
};
