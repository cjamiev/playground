const today = new Date();
const tomorrow = new Date(today.getTime() + 86400000);
const yesterday = new Date(today.getTime() - 86400000);

const changeByDaysTestData = [
  { testMessage: 'same day', args: [today, 0], expectedResult: today },
  { testMessage: 'next day', args: [today, 1], expectedResult: tomorrow },
  { testMessage: 'yesterday', args: [today, -1], expectedResult: yesterday }
];

const daysBetweenTestData = [
  { testMessage: 'same day', args: [today, today], expectedResult: 0 },
  { testMessage: 'next day', args: [new Date('January 1, 2019 5:55:55'), new Date('January 2, 2019 4:44:44')], expectedResult: 1 },
  { testMessage: 'several months', args: [new Date('January 12, 2019 0:00:00'), new Date('April 26, 2019 0:00:00')], expectedResult: 104 },
  { testMessage: '2018 and 2019', args: [new Date('January 1, 2018 0:00:00'), new Date('January 1, 2019 0:00:00')], expectedResult: 365 }
];

const weeksBetweenTestData = [
  { testMessage: 'same day', args: [today, today], expectedResult: 0 },
  { testMessage: 'next day', args: [new Date('January 1, 2019 5:55:55'), new Date('January 2, 2019 4:44:44')], expectedResult: 0.143 },
  { testMessage: 'several months', args: [new Date('January 12, 2019 0:00:00'), new Date('April 26, 2019 0:00:00')], expectedResult: 14.857 },
  { testMessage: '2018 and 2019', args: [new Date('January 1, 2018 0:00:00'), new Date('January 1, 2019 0:00:00')], expectedResult: 52.143 }
];

module.exports = {
  changeByDaysTestData,
  daysBetweenTestData,
  weeksBetweenTestData
};