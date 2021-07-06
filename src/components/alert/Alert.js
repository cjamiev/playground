import React from 'react';
import { useSelector } from 'react-redux';
import './alert.css';

const ZERO = 0;
const statusClass = {
  'success': 'alert--success',
  'info': 'alert--info',
  'warning': 'alert--warning',
  'error': 'alert--error'
};

const Alert = () => {
  const { queue } = useSelector(state => state.alert);
  const { content, status } = queue[ZERO] || {};

  if(!content) {
    return null;
  }

  return (
    <div className={`alert ${statusClass[status]}`}>{content}</div>
  );
};

export default Alert;