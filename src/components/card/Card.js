import React from 'react';
import './card.css';

const Card = ({ title, body, footer }) => {
  return <div className="card">
    <div className="card-header">{title}</div>
    <div className="card-body">{body}</div>
    <div className="card-footer">{footer}</div>
  </div>;
};

export default Card;
