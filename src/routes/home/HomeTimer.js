import React, { useState } from 'react';
import { IconButton } from 'components/button';
import Card from 'components/card';
import useTimer from 'hooks/useTimer';
import { formattedTimerClock } from 'clock';
import { decrementElementIndex, incrementElementIndex, swapArrayElementPositions } from 'arrayHelper';
import { TrashSVG } from 'components/icons/TrashSVG';
import { PenSVG } from 'components/icons/PenSVG';
import TimerForm from 'components/form/TimerForm';
import { SCTimerTab, SCTimers, SCHomeCardWrapper, SCHomeFooter } from './styles';

const ZERO = 0;
const ONE = 1;

const getFormattedTime = ({ weeks, days, hours, minutes, seconds }, label) => {
  if (weeks > ZERO) {
    return <p>{weeks} Weeks</p>;
  }

  if (days > ZERO) {
    return <p>{days} Days</p>;
  }

  return <p>{formattedTimerClock(hours, minutes, seconds)}</p>;
};

const TimerCard = ({ item, onRemoveTimer, onEditTimer }) => {
  const { year, month, day, hour, minute, second } = item.value;
  const newDate = new Date(year, month - ONE, day, hour, minute, second);
  const time = useTimer(newDate);

  return (
    <SCHomeCardWrapper>
      <Card
        title={item.name}
        body={getFormattedTime(time, item.name)}
        footer={
          <SCHomeFooter>
            <svg
              aria-label="Edit"
              width="45"
              height="53"
              viewBox="0 0 53 53"
              onClick={() => {
                onEditTimer(item.name, newDate);
              }}
            >
              <PenSVG transform={'translate(0,4)'} />
            </svg>
            <svg
              aria-label="Delete"
              width="45"
              height="53"
              viewBox="0 0 53 53"
              onClick={() => {
                onRemoveTimer(item);
              }}
            >
              <TrashSVG transform={'translate(0,4)'} />
            </svg>
          </SCHomeFooter>
        }
      />
    </SCHomeCardWrapper>
  );
};

const HomeTimer = ({ timers, selectedTimer, onChangeTimer, onRemoveTimer, onEditTimer }) => {
  const renderTimers =
    timers.length > ZERO ? (
      timers.map((item) => (
        <TimerCard key={item.name} item={item} onRemoveTimer={onRemoveTimer} onEditTimer={onEditTimer} />
      ))
    ) : (
      <p> No timers to display </p>
    );

  return (
    <SCTimerTab>
      <div>
        <TimerForm
          onChange={({ name, content }) => {
            const newTimer = { name, value: content, type: 'timer' };

            onChangeTimer(newTimer);
          }}
          value={selectedTimer}
        />
      </div>
      <SCTimers>{renderTimers}</SCTimers>
    </SCTimerTab>
  );
};

export default HomeTimer;
