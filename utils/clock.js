const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WEEK_IN_MILLISECONDS = 604800000;
const DAY_IN_MILLISECONDS = 86400000;
const HOUR_IN_MILLISECONDS = 3600000;
const MINUTE_IN_MILLISECONDS = 60000;
const SECOND_IN_MILLISECONDS = 1000;
const SIXTY_TIMES_SIXTY = 3600;
const SIXTY = 60;
const HOURS_IN_DAY = 24;
const DOUBLE_DIGIT = 10;
const DAYS_IN_A_WEEK = 7;
const PRECISION_LEVEL = 3;
const DECIMAL_FORMAT = 2;
const ONE = 1;
const ZERO = 0;

const secondsToClock = s => {
  const hours = Math.floor(s / SIXTY_TIMES_SIXTY);
  const minutes = Math.floor(s / SIXTY) % SIXTY;
  const seconds = s % SIXTY;

  return { hours, minutes, seconds };
};

const minutesToClock = m => {
  const hours = Math.floor(m / SIXTY);
  const minutes = m % SIXTY;
  const seconds = ZERO;

  return { hours, minutes, seconds };
};

const normalizeClock = (h = ZERO, m = ZERO, s = ZERO) => {
  const clockFromSeconds = secondsToClock(s);
  const clockFromMinutes = minutesToClock(m + clockFromSeconds.minutes);

  const seconds = clockFromSeconds.seconds;
  const minutes = clockFromMinutes.minutes;
  const hours = h + clockFromMinutes.hours + clockFromSeconds.hours;

  return { hours, minutes, seconds };
};

const getFormattedMinutes = minutes => (minutes < DOUBLE_DIGIT ? `:0${minutes}` : `:${minutes}`);

const getFormattedSeconds = seconds => (seconds < DOUBLE_DIGIT ? `:0${seconds}` : `:${seconds}`);

const formattedTimerClock = (h = ZERO, m = ZERO, s = ZERO) => {
  const { hours, minutes, seconds } = normalizeClock(h, m, s);

  return `${hours}${getFormattedMinutes(minutes)}${getFormattedSeconds(seconds)}`;
};

const clockBetweenDates = (date1, date2) => {
  const diff = date1.getTime() - date2.getTime();

  if (diff < ZERO) {
    return { hours: ZERO, minutes: ZERO, seconds: ZERO };
  }

  const weeks = Math.floor(diff / WEEK_IN_MILLISECONDS);
  const days = Math.floor((diff - weeks * WEEK_IN_MILLISECONDS) / DAY_IN_MILLISECONDS);
  const hours = Math.floor((diff - weeks * WEEK_IN_MILLISECONDS - days * DAY_IN_MILLISECONDS) / HOUR_IN_MILLISECONDS);
  const minutes = Math.floor((diff - weeks * WEEK_IN_MILLISECONDS - days * DAY_IN_MILLISECONDS - hours * HOUR_IN_MILLISECONDS) / MINUTE_IN_MILLISECONDS);
  const seconds = Math.floor(
    (diff - weeks * WEEK_IN_MILLISECONDS - days * DAY_IN_MILLISECONDS - hours * HOUR_IN_MILLISECONDS - minutes * MINUTE_IN_MILLISECONDS) /
    SECOND_IN_MILLISECONDS
  );

  return { weeks, days, hours, minutes, seconds };
};

const getFormattedClock = (date) => {
  const LARGEST_SINGLE_DIGIT = 9;
  const LARGEST_AM_VALUE = 11;
  const MOD12 = 12;

  const givenDate = date ? date: new Date();
  const amOrpm = givenDate.getHours() > LARGEST_AM_VALUE ? 'PM' : 'AM';
  const minutes = givenDate.getMinutes() > LARGEST_SINGLE_DIGIT ? givenDate.getMinutes() : '0' + givenDate.getMinutes();
  const seconds = givenDate.getSeconds() > LARGEST_SINGLE_DIGIT ? givenDate.getSeconds() : '0' + givenDate.getSeconds();
  const format12Hour = givenDate.getHours() > LARGEST_SINGLE_DIGIT ? givenDate.getHours() % MOD12 : givenDate.getHours();
  const hours = format12Hour === ZERO ? '12' : format12Hour;

  return hours + ':' + minutes + ':' + seconds + ' ' + amOrpm;
};

const getFormattedDate = (date) => {
  const NUMBER_OF_LETTERS = 3;
  const PARTIAL_WEEK = 1.01;

  const givenDate = date ? date : new Date();
  const newYears = new Date(givenDate.getFullYear(), ZERO, ONE, ZERO, ZERO, ZERO);
  const firstWeekPartial = newYears.getDay() / DAYS_IN_A_WEEK + PARTIAL_WEEK;
  const timeBetweenNowAndNewYears = clockBetweenDates(givenDate, newYears);

  const displayDate = dayOfWeek[givenDate.getDay()] + ', ' + months[givenDate.getMonth()].slice(ZERO, NUMBER_OF_LETTERS) + ' ' + givenDate.getDate();
  const displayWeek = 'Week ' + Math.trunc(firstWeekPartial + timeBetweenNowAndNewYears.weeks + timeBetweenNowAndNewYears.days / DAYS_IN_A_WEEK );

  return { date: displayDate, week: displayWeek };
};

module.exports = { clockBetweenDates, formattedTimerClock, normalizeClock, getFormattedClock, getFormattedDate };