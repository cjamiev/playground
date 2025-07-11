import React from 'react';
import { GENDER_TYPE, type Name } from '../../../model/library';

interface NameCardProps {
  name: Name;
  onEdit: () => void;
}

const NameCard: React.FC<NameCardProps> = ({ name, onEdit }) => {
  return (
    <div className='card-wrapper'>
      <>
        <div className="card-title-wrapper">
          <h2 className="card-title">{name.value}</h2>
        </div>
        <div className="library-cards-gender-row">
          <span className="card-label">Gender:</span> <span className="card-text">{GENDER_TYPE[name.gender]}</span>
        </div>
        <div className="library-cards-origin-row">
          <span className="card-label">Origin:</span> <span className="card-text">{name.origin}</span>
        </div>
        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(name.value)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="card-google-link"
        >
          Google
        </a>
        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(name.value)}+name+meaning`}
          target="_blank"
          rel="noopener noreferrer"
          className="card-google-link"
        >
          Get Meaning
        </a>
        <button
          onClick={onEdit}
          className="card-edit-btn"
        >
          Edit
        </button>
      </>
    </div>
  );
};

export default NameCard; 