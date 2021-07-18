import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dismissAlert } from 'components/alert/alertActions';
import { CloseButton } from 'components/button';
import './alert.css';

const ZERO = 0;
const ONE = 1;
const statusClass = {
  'success': 'alert--success',
  'info': 'alert--info',
  'warning': 'alert--warning',
  'error': 'alert--error'
};

const Alert = () => {
  const dispatch = useDispatch();
  const { queue } = useSelector(state => state.alert);
  const { id, content, status } = queue[ZERO] || {};
  const sizeMessage = queue.length > ONE ? `${queue.length - ONE} more`: '';

  if(!content) {
    return null;
  }

  return (
    <div className={`alert ${statusClass[status]}`}>
      {content}
      <span className='alert__counter'>{sizeMessage}</span>
      <CloseButton classSize='small' classColor='error' onClick={() => { dispatch(dismissAlert(id));}} />
    </div>
  );
};

export default Alert;