import React from 'react';
import { type Phrase } from '../../../model/library';

interface PhraseCardProps {
  phrase: Phrase;
  onEdit: () => void;
}

const PhraseCard: React.FC<PhraseCardProps> = ({ phrase, onEdit }) => {
  return (
    <div className='card-wrapper'>
      <>
        <div className="card-title-wrapper">
          <h2 className="card-title">{phrase.value}</h2>
        </div>
        <div>
          <span className="card-label">Origin:</span> <span className="card-text">{phrase.origin}</span>
        </div>
        <div className="item-tags-row">
          <span className="card-label">Tags:</span> {phrase.tags.split(",").map((tag, i) => (
            <span key={i} className="item-tag">{tag}</span>
          ))}
        </div>
        <div className="card-footer">
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(phrase.value)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-google-link"
          >
            Google
          </a>
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(phrase.value)}+meaning`}
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
        </div>
      </>
    </div>
  );
};

export default PhraseCard; 