import React from 'react';
import { type WordPart } from '../../../model/library';

interface WordPartListProps {
  wordParts: WordPart[];
  selectedIdx: number;
  search: string;
  onSearchChange: (val: string) => void;
  onSelectWordPart: (idx: number) => void;
}

const WordPartList: React.FC<WordPartListProps> = ({ wordParts, selectedIdx, search, onSearchChange, onSelectWordPart }) => {
  return (
    <div className="list-section">
      <input
        type="text"
        placeholder="Search word parts..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className="search-bar"
      />
      <ul className="list-items">
        {wordParts.map((wp, idx) => (
          <li
            className='list-item'
            key={idx}
          >
            <button
              className={`list-item-btn${idx === selectedIdx ? ' selected' : ''}`}
              onClick={() => onSelectWordPart(idx)}
            >
              {wp.value}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordPartList; 