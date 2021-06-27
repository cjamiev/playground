import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { testRenderComponent } from 'testHelper/componentSetup';
import { TIME, MONTHS, DAYS_OF_THE_WEEK } from 'constants/time';
import useTimer from './useTimer';

const TestComponent = ({date}) => {
  const clock = useTimer(date);

  return <div>{`Weeks ${clock.weeks} Days ${clock.days} Hours ${clock.hours} Minutes ${clock.minutes} Seconds ${clock.seconds}`}</div>;
};

describe('useTimer', () => {
  const now = new Date();
  const oneDayFromNow = new Date(now.getTime() + TIME.A_DAY);

  it('Wait one second one day from now', () => {
    jest.useFakeTimers();
    Date.now = jest.fn(() => now);
    act(() => {
      render(<TestComponent date={oneDayFromNow} />);
      jest.advanceTimersByTime(TIME.A_SECOND);
    });

    expect(screen.getByText('Weeks 0 Days 0 Hours 23 Minutes 59 Seconds 59')).toBeInTheDocument();
  });
});