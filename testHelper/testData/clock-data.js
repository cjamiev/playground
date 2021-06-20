const normalizeClockTestData = [
  { testMessage: 'no arguments', args: [], expectedResult: { hours: 0, minutes: 0, seconds: 0 } },
  { testMessage: 'Clock 5:55:55', args: [5, 55, 55], expectedResult: { hours: 5, minutes: 55, seconds: 55 } },
  { testMessage: 'Minutes overflow = 60', args: [0, 60, 0], expectedResult: { hours: 1, minutes: 0, seconds: 0 } },
  { testMessage: 'Seconds overflow = 60', args: [0, 1, 0], expectedResult: { hours: 0, minutes: 1, seconds: 0 } },
  { testMessage: 'Seconds overflow = 3600', args: [0, 0, 3600], expectedResult: { hours: 1, minutes: 0, seconds: 0 } },
  { testMessage: 'Minutes = 59 && Seconds overflow = 60', args: [0, 59, 60], expectedResult: { hours: 1, minutes: 0, seconds: 0 } },
  { testMessage: 'Minutes = 61 && Seconds overflow = 3661', args: [0, 61, 3661], expectedResult: { hours: 2, minutes: 2, seconds: 1 } }
];

const dayOne = new Date(2019, 0, 1, 0, 0, 0, 0);
const dayTwo = new Date(2019, 0, 2, 0, 0, 0, 0);
const dayOnePlusOnes = new Date(2019, 0, 1, 1, 1, 1, 0);

const clockBetweenDatesTestData = [
  { testMessage: 'same day', args: [dayOne, dayOne], expectedResult: { weeks: 0, days: 0, hours: 0, minutes: 0, seconds: 0 } },
  { testMessage: 'one day difference', args: [dayTwo, dayOne], expectedResult: { weeks: 0, days: 1, hours: 0, minutes: 0, seconds: 0 } },
  { testMessage: 'one hour, one minutes, one second difference', args: [dayOnePlusOnes, dayOne], expectedResult: { weeks: 0, days: 0, hours: 1, minutes: 1, seconds: 1 } }
];

const formattedClockTestData = [
  { testMessage: 'no arguments', args: [], expectedResult: '0:00:00' },
  { testMessage: 'Clock 5:55:55', args: [5, 55, 55], expectedResult: '5:55:55' },
  { testMessage: '10 < seconds', args: [0, 0, 11], expectedResult: '0:00:11' },
  { testMessage: '10 > seconds', args: [0, 0, 9], expectedResult: '0:00:09' },
  { testMessage: '10 < minutes', args: [0, 11, 0], expectedResult: '0:11:00' },
  { testMessage: '10 > minutes', args: [0, 9, 0], expectedResult: '0:09:00' }
];

module.exports = {
  normalizeClockTestData,
  clockBetweenDatesTestData,
  formattedClockTestData
};