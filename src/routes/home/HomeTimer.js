import React, { useState } from 'react';
import { IconButton } from 'components/button';
import Card from 'components/card';
import useTimer from 'hooks/useTimer';
import { formattedTimerClock } from 'clock';
import { decrementElementIndex, incrementElementIndex, swapArrayElementPositions } from 'arrayHelper';
import { ICON_TYPES } from 'constants/icon';

const ZERO = 0;
const ONE = 1;

const getFormattedTime = ({ weeks, days, hours, minutes, seconds }, label) => {
  return (
    <>
      <p>{weeks} Weeks</p>
      <p>{days} Days</p>
      <p data-testid={`${label} time`}>{formattedTimerClock(hours, minutes, seconds)}</p>
    </>
  );
};

const TimerCard = ({ item, onRemoveTimer, onEditTimer }) => {
  const { year, month, day, hour, minute, second } = item.value;
  const newDate = new Date(year, month - ONE, day, hour, minute, second);
  const time = useTimer(newDate);

  return (
    <Card
      title={item.name}
      body={getFormattedTime(time, item.name)}
      footer={<>
        <IconButton
          type={ICON_TYPES.EDIT}
          onClick={() => {
            onEditTimer(item.name, newDate);
          }}
        />
        <IconButton
          type={ICON_TYPES.TRASH}
          onClick={() => {
            onRemoveTimer(item);
          }}
        />
      </>}
    />
  );
};


const HomeTimer = ({ timers, onRemoveTimer, onEditTimer }) => {
  const renderTimers = timers.length > ZERO
    ? timers.map(item => <TimerCard key={item.name} item={item} onRemoveTimer={onRemoveTimer} onEditTimer={onEditTimer} />)
    : (<p> No timers to display </p>);

  return (
    <div className="flex--horizontal">
      {renderTimers}
    </div>
  );
};

export default HomeTimer;
