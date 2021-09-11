import React from 'react';
import { screen } from '@testing-library/react';
import { fullTestWrapper, mockLocalStorage } from 'testHelper';
import { TIME } from 'constants/time';
import { ROUTES } from 'constants/routes';

mockLocalStorage({
  globaltimers: JSON.stringify([
    {
      name: 'item one',
      value: {
        month: 9,
        day: 9,
        year: 2021,
        hour: 0,
        minute: 0,
        second: 0
      },
      type: 'timer'
    },
    {
      name: 'item two',
      value: {
        month: 1,
        day: 1,
        year: 2030,
        hour: 0,
        minute: 0,
        second: 0
      },
      type: 'timer'
    }
  ])
});

const TestComponent = () => {
  return (
    <span>dummy</span>
  );
};

describe('GlobalTimer', () => {
  jest.useFakeTimers();

  it('handle timers', () => {
    fullTestWrapper(TestComponent, {}, {}, ROUTES.HOME.url, true);
    jest.advanceTimersByTime(TIME.A_SECOND);

    expect(screen.getByText('Time\'s up for "item one"')).toBeInTheDocument();
  });
});