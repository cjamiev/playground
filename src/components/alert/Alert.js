import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dismissAlert } from 'components/alert/alertActions';
import { CloseButton } from 'components/button';
import './alert.css';

const ZERO = 0;
const ONE = 1;
const OFF_SET = 150;
const statusClass = {
  success: 'alert--success',
  info: 'alert--info',
  warning: 'alert--warning',
  error: 'alert--error'
};

const Alert = () => {
  const [isSticky, setIsSticky] = useState(false);
  const dispatch = useDispatch();
  const { queue } = useSelector((state) => state.alert);
  const { id, content, status, timer } = queue[ZERO] || {};
  const sizeMessage = queue.length > ONE ? `${queue.length - ONE} more item(s)` : '';

  const close = useCallback(() => {
    dispatch(dismissAlert(id));
  }, [dispatch, id]);

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset > OFF_SET) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
  }, []);

  useEffect(() => {
    if (timer) {
      setTimeout(close, timer);
    }
  }, [close, timer]);

  if (!content) {
    return null;
  }

  const className = isSticky ? `alert ${statusClass[status]} alert--sticky` : `alert ${statusClass[status]}`;

  return (
    <div className={className}>
      {content}
      <div className="alert__counter">{sizeMessage}</div>
      <CloseButton classColor={status} onClick={close} />
    </div>
  );
};

export default Alert;
