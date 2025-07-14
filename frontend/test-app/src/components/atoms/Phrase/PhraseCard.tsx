import React from 'react';
import { type Phrase } from '../../../model/library';

interface PhraseCardProps {
  phrase: Phrase;
  onEdit: () => void;
  onClone: () => void;
  onDelete: () => void;
  onHandleClickTag: (tag: string) => void;
}

const PhraseCard: React.FC<PhraseCardProps> = ({ phrase, onEdit, onClone, onDelete, onHandleClickTag }) => {
  return (
    <div className="card-wrapper">
      <div className="card-header">
        <h2 className="card-title">{phrase.value}</h2>
      </div>
      <div>
        <span className="card-label">Origin:</span> <span className="card-text">{phrase.origin}</span>
      </div>
      <a
        className="url-link"
        href={`https://www.google.com/search?q=${encodeURIComponent(phrase.value + ' phrase meaning')}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Google
      </a>
      <div>
        {phrase.tags.length ? (
          <div className="tags-container">
            <span className="card-label">Tags:</span>
            {phrase.tags.split(',').map((tag, i) => (
              <button key={i} className="tag-btn" onClick={() => onHandleClickTag(tag)}>
                {tag}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <div className="card-footer">
        <button className="primary-btn" onClick={onClone}>
          Clone
        </button>
        <button className="primary-btn" onClick={onEdit}>
          Edit
        </button>
        <button className="negative-btn" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default PhraseCard;
