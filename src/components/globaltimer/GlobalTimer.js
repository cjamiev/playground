import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAlert } from 'components/alert/alertActions';

const ZERO = 0;
const ONE = 1;

const GlobalTimer = () => {
  const dispatch = useDispatch();
  const currentTimers = JSON.parse(localStorage.getItem('globaltimers') || '[]');
  if(currentTimers.length > ZERO) {
    const sortedTimers = currentTimers
      .map(item => {
        return { name: item.name, date: new Date(item.value.year,item.value.month-ONE,item.value.day,item.value.hour,item.value.minute,item.value.second)};
      })
      .sort((item1, item2) => item1.date.getTime() - item2.date.getTime());
    const now = new Date();
    const shortestTimer = sortedTimers[ZERO];
    const time = shortestTimer.date.getTime() - now.getTime();
    const absoluteTime = time > ZERO ? time : ZERO;

    setTimeout(() => { dispatch(createAlert({ content: `Time's up for "${shortestTimer.name}"`, status: 'success' })); },absoluteTime);
  }

  return (
    <div className="invisible"></div>
  );
};

export default GlobalTimer;
