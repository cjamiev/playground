import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'components/modal';
import { createAlert } from 'components/alert/alertActions';
import { closeGlobalModal } from 'components/global/globalActions';
import { initializeTimer } from './globalActions';

const ZERO = 0;
const ONE = 1;

const Global = () => {
  const dispatch = useDispatch();
  const { timers, initialized, isLoading, modalQueue } = useSelector(state => state.global);
  const props = modalQueue[ZERO] || {};

  useEffect(() => {
    if(!initialized) {
      dispatch(initializeTimer());
    }
  }, [dispatch, initialized]);

  if(timers.length > ZERO) {
    const sortedTimers = timers
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

  const close = () => { dispatch(closeGlobalModal(props.id)); };

  if(isLoading) {
    const message = <div className="modal__loading">Loading...</div>;

    return (
      <div className="global__modal">
        <Modal message={message} />
      </div>
    );
  } else if (props.message) {
    return (
      <div className="global__modal">
        <Modal close={close} {...props} />
      </div>
    );
  }

  return null;
};

export default Global;
