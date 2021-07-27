import React from 'react';
import './card.css';

const Card = ({ content }) => {
  return (
    <div className="card">
      {content}
    </div>
  );
};

export default Card;
