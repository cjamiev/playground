import React from 'react';
import { type Word } from '../../model/library';

interface WordListProps {
  words: Word[];
  selectedIdx: number;
  search: string;
  onSearchChange: (value: string) => void;
  onSelectWord: (idx: number) => void;
}

const WordList: React.FC<WordListProps> = ({
  words,
  selectedIdx,
  search,
  onSearchChange,
  onSelectWord,
}) => {
  return (
    <div className="list-section">
      <input
        type="text"
        placeholder="Search words..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className="search-bar"
      />
      <ul className="list-wrapper">
        {words.map((word, idx) => (
          <li key={idx} className="list-item">
            <button
              className={`list-item-btn${selectedIdx === idx ? ' selected' : ''}`}
              onClick={() => onSelectWord(idx)}
            >
              {word.value}
            </button>
          </li>
        ))}
        {words.length === 0 && (
          <li className="no-items-msg">No words found.</li>
        )}
      </ul>
    </div>
  );
};

export default WordList; 