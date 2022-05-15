import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dismissAlert } from 'components/alert/alertActions';
import { CloseButton } from 'components/button';
import { SCAlert, SCAlertHeader, SCAlertContent } from './styles';

const ZERO = 0;
const ONE = 1;

const Alert = () => {
  const dispatch = useDispatch();
  const { queue } = useSelector((state) => state.alert);
  const { id, content, status, timer } = queue[ZERO] || {};

  const close = useCallback(() => {
    dispatch(dismissAlert(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (timer) {
      setTimeout(close, timer);
    }
  }, [close, timer]);

  if (!content) {
    return null;
  }

  return (
    <SCAlert>
      <SCAlertHeader status={status}>
        {status}
        <button onClick={close}>X</button>
      </SCAlertHeader>
      <SCAlertContent status={status}>
        <span>{content}</span>
      </SCAlertContent>
    </SCAlert>
  );
};

export default Alert;
