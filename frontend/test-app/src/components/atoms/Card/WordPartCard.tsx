import React from 'react';
import { type WordPart, WORD_PART_TYPE } from '../../../model/library';

interface WordPartCardProps {
  wordPart: WordPart;
  onEdit: () => void;
}

const WordPartCard: React.FC<WordPartCardProps> = ({ wordPart, onEdit }) => {
  return (
    <div className="card-wrapper">
      <div className="card-title-wrapper">
        <h2 className="card-title">{wordPart.value}</h2>
      </div>
      <div>
        <span className="card-label">Type:</span> <span className="card-text">{WORD_PART_TYPE[wordPart.type]}</span>
      </div>
      <div>
        <span className="card-label">Definition:</span> <span className="card-text">{wordPart.definition}</span>
      </div>
      <button className="card-edit-btn" onClick={onEdit} style={{ marginTop: 16 }}>Edit</button>
    </div>
  );
};

export default WordPartCard; 