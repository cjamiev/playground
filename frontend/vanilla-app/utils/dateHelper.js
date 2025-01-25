const DAY_IN_MILLISECONDS = 86400000;
const DAYS_IN_A_WEEK = 7;
const PRECISION_LEVEL = 3;
const ZERO = 0;

const changeByDays = (date, days) => new Date(date.getTime() + days * DAY_IN_MILLISECONDS);

const getDateAtSetTime = (date, { hours = ZERO, minutes = ZERO, seconds = ZERO }) => {
  const updatedDate = new Date(date.getTime());
  updatedDate.setHours(hours);
  updatedDate.setMinutes(minutes);
  updatedDate.setSeconds(seconds);
  updatedDate.setMilliseconds(ZERO);

  return updatedDate;
};

const daysBetween = (date1, date2) => {
  const tempDate1 = getDateAtSetTime(date1, {});
  const tempDate2 = getDateAtSetTime(date2, {});
  const numberOfDays = Math.round(
    Math.abs(tempDate1.getTime() - tempDate2.getTime()) / DAY_IN_MILLISECONDS
  );

  return isNaN(numberOfDays) ? null : numberOfDays;
};

const weeksBetween = (date1, date2) => parseFloat((daysBetween(date1, date2) / DAYS_IN_A_WEEK).toFixed(PRECISION_LEVEL));

export {
  changeByDays,
  getDateAtSetTime,
  daysBetween,
  weeksBetween
};