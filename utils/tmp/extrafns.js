// Incrementing a clock
const ONE_LESS_THAN_SIXTY = 59;
const incrementClock = (h, m, s) => {
  if (s < ONE_LESS_THAN_SIXTY) {
    return normalizeClock(h, m, s + ONE);
  } else if (m < ONE_LESS_THAN_SIXTY) {
    return normalizeClock(h, m + ONE, ZERO);
  } else {
    return normalizeClock(h + ONE, ZERO, ZERO);
  }
};

const decrementClock = (h, m, s) => {
  if (s > ZERO) {
    return normalizeClock(h, m, s - ONE);
  } else if (m > ZERO) {
    return normalizeClock(h, m - ONE, ONE_LESS_THAN_SIXTY);
  } else if (h > ZERO) {
    return normalizeClock(h - ONE, ONE_LESS_THAN_SIXTY, ONE_LESS_THAN_SIXTY);
  } else {
    return { hours: ZERO, minutes: ZERO, seconds: ZERO };
  }
};

// Chaining dates
const time = (dateParameters = '') => {
  const date = new Date(dateParameters);
  const dateOperations = {
    setYear(y) {
      date.setYear(y);

      return this;
    },
    setMonth(m) {
      date.setMonth(m - 1);

      return this;
    },
    setDay(d) {
      date.setDate(d);

      return this;
    },
    getDateObj() {
      return date;
    },
    formattedDate() {
      return date.toDateString();
    }
  };

  return dateOperations;
};

const timeobj = time();
const result = timeobj.setYear(2020).setMonth(3).setDay(21).formattedDate();
console.log(result);

// Missing tests?
describe(':getDateAtSetTime', () => {
  it('today at zeroeth hour', () => {
    const testResultDate = DateExtend.getDateAtSetTime(today, new Clock());
    const testExpectedDate = today;
    testExpectedDate.setHours(0);
    testExpectedDate.setMinutes(0);
    testExpectedDate.setSeconds(0);
    testExpectedDate.setMilliseconds(0);

    expect(testExpectedDate).toEqual(testResultDate);
  });

  it('clock addition', () => {
    const testResultDate = DateExtend.getDateAtSetTime(
      new Date(2019, 0, 1, 1, 1, 1, 1),
      Clock.createClock(2, 2, 2)
    );
    const testExpectedDate = new Date(2019, 0, 1, 2, 2, 2, 0);

    expect(testExpectedDate).toEqual(testResultDate);
  });

  it('end of day', () => {
    const testResultDate = DateExtend.getDateAtSetTime(today, Clock.createClock(9, 0, 0));
    const testExpectedDate = today;
    testExpectedDate.setHours(9);
    testExpectedDate.setMinutes(0);
    testExpectedDate.setSeconds(0);
    testExpectedDate.setMilliseconds(0);

    expect(testExpectedDate).toEqual(testResultDate);
  });
});