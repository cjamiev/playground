import React from 'react';
import './alert.css';

const statusClass = {
  'success': 'alert--success',
  'info': 'alert--info',
  'warning': 'alert--warning',
  'error': 'alert--error'
};

const Alert = ({ content, status }) => {
  return (
    <div className={`alert ${statusClass[status]}`}>{content}</div>
  );
};

export default Alert;