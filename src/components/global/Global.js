import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'components/modal';
import { loadConfig, updateConfig } from 'routes/config/configActions';
import { createAlert } from 'components/alert/alertActions';
import {
  closeGlobalModal,
  hideLoadingModal,
  loadCommand,
  clearCommand,
  initializeTimer
} from './globalActions';
import { TIME } from 'constants/time';

const ZERO = 0;
const ONE = 1;

const Global = () => {
  const dispatch = useDispatch();
  const { timers, initialized, loadingQueue, modalQueue } = useSelector((state) => state.global);
  const props = modalQueue[ZERO] || {};

  useEffect(() => {
    if (!initialized) {
      dispatch(initializeTimer());
      dispatch(loadCommand());
      dispatch(loadConfig());
    }
  }, [dispatch, initialized]);

  if (timers.length > ZERO) {
    const sortedTimers = timers
      .map((item) => {
        return {
          name: item.name,
          date: new Date(
            item.value.year,
            item.value.month - ONE,
            item.value.day,
            item.value.hour,
            item.value.minute,
            item.value.second
          )
        };
      })
      .sort((item1, item2) => item1.date.getTime() - item2.date.getTime());
    const now = new Date();
    const shortestTimer = sortedTimers[ZERO];
    const timeInMilliseconds = shortestTimer.date.getTime() - now.getTime();
    const absoluteTime = timeInMilliseconds > ZERO ? timeInMilliseconds : ZERO;
    const isTimeTooLarge = timeInMilliseconds > TIME.A_DAY;

    !isTimeTooLarge &&
      setTimeout(() => {
        dispatch(createAlert({ content: `Time's up for "${shortestTimer.name}"`, status: 'success' }));
      }, absoluteTime);
  }

  const close = () => {
    dispatch(closeGlobalModal(props.id));
  };

  if (loadingQueue.length) {
    const message = <div className="modal__loading">Loading...{loadingQueue[ZERO]}</div>;
    window.scrollTo({ top: ZERO, behavior: 'smooth' });

    return (
      <div className="global__modal">
        <Modal message={message} close={() => { dispatch(hideLoadingModal(loadingQueue[ZERO]));}}/>
      </div>
    );
  } else if (props.message) {
    window.scrollTo({ top: ZERO, behavior: 'smooth' });

    return (
      <div className="global__modal">
        <Modal close={close} {...props} />
      </div>
    );
  }

  return null;
};

export default Global;
