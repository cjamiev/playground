import React from 'react';
import { type Reference } from '../../../model/library';

interface ReferenceCardProps {
  reference: Reference;
  onEdit: () => void;
}

const ReferenceCard: React.FC<ReferenceCardProps> = ({ reference, onEdit }) => {
  return (
    <div className='card-wrapper'>
      <>
        <div className="card-title-wrapper">
          <h2 className="card-title">{reference.value}</h2>
        </div>
        <div>
          <span className="card-label">Origin:</span> <span className="card-text">{reference.origin}</span>
        </div>
        <div>
          <span className="card-label">Definition:</span> <span className="card-text">{reference.definition}</span>
        </div>
        <div className="item-tags-row">
          <span className="card-label">Tags:</span> {reference.tags.split(",").map((tag, i) => (
            <span key={i} className="item-tag">{tag}</span>
          ))}
        </div>
        <div className="card-footer">
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(reference.value)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-google-link"
          >
            Google
          </a>
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(reference.value)}+summary`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-google-link"
          >
            Get Summary
          </a>
          <button
            onClick={onEdit}
            className="card-edit-btn"
          >
            Edit
          </button>
        </div>
      </>
    </div>
  );
};

export default ReferenceCard; 