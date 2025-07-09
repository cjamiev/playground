import React from 'react';
import { WORD_TYPE, type Word } from '../../model/library';

interface WordCardProps {
  word: Word;
  onEdit: () => void;
}

const WordCard: React.FC<WordCardProps> = ({ word, onEdit }) => {
  return (
    <div className='card-wrapper'>
      <>
        <div className="card-title-wrapper">
          <h2 className="card-title">{word.value}</h2>
        </div>
        <div>
          <span className="card-label">Definition:</span> <span className="card-text">{word.definition}</span>
        </div>
        <div>
          <span className="card-label">Type:</span><span className="card-text">{WORD_TYPE[word.type]}</span>
        </div>
        <div className="item-tags-row">
          <span className="card-label">Tags:</span> {word.tags.split(",").map((tag, i) => (
            <span key={i} className="item-tag">{tag}</span>
          ))}
        </div>
        <div className='card-footer'>
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(word.value)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-google-link"
          >
            Google
          </a>
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(word.value)}+antonyms`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-google-link"
          >
            Get Antonyms
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

export default WordCard; 