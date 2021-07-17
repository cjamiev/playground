import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dismissAlert } from 'components/alert/alertActions';
import Button from 'components/button';
import './alert.css';

const ZERO = 0;
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

  if(!content) {
    return null;
  }

  return (
    <div className={`alert ${statusClass[status]}`}>
      {content}
      <Button label='X' classType='close' classSize='small' aria-label="Close" onClick={() => { dispatch(dismissAlert(id));}} />
    </div>
  );
};

export default Alert;