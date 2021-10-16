import React, { useState } from 'react';
import { IconButton } from 'components/button';
import Card from 'components/card';
import useTimer from 'hooks/useTimer';
import { formattedTimerClock } from 'clock';
import { decrementElementIndex, incrementElementIndex, swapArrayElementPositions } from 'arrayHelper';
import { ICON_TYPES } from 'constants/icon';

const ZERO = 0;
const ONE = 1;

const getFormattedTime = ({ weeks, days, hours, minutes, seconds }) => {
  if (weeks > ONE) {
    return `${weeks} Weeks`;
  } else if (days > ONE) {
    return `${days} Days`;
  }

  return formattedTimerClock(hours, minutes, seconds);
};

const Time = ({ label, value }) => {
  const time = useTimer(value);

  return <div data-testid={`${label} time`}>{getFormattedTime(time)}</div>;
};

const Timers = ({ timers, onRemoveTimer, onEditTimer }) => {
  return timers.map((item) => {
    const { year, month, day, hour, minute, second } = item.value;
    const newDate = new Date(year, month - ONE, day, hour, minute, second);

    return (
      <Card key={item.name}>
        <div className="home__card">
          <div className="home__card-data">
            <div className="home__card-title">{item.name}</div>
            <Time label={item.name} value={newDate} />
          </div>
          <div className="home__card-btns">
            <IconButton
              type={ICON_TYPES.TRASH}
              onClick={() => {
                onRemoveTimer(item);
              }}
            />
            <IconButton
              type={ICON_TYPES.EDIT}
              onClick={() => {
                onEditTimer(item.name, newDate);
              }}
            />
          </div>
        </div>
      </Card>
    );
  });
};

const HomeTimer = ({ timers, onRemoveTimer, onEditTimer }) => {
  return (
    <div className="flex--horizontal">
      {timers.length > ZERO ? (
        <Timers timers={timers} onRemoveTimer={onRemoveTimer} onEditTimer={onEditTimer} />
      ) : (
        <p> No timers to display </p>
      )}
    </div>
  );
};

export default HomeTimer;
