import React from 'react';
import { type Phrase } from '../../model/library';

interface PhraseListProps {
  phrases: Phrase[];
  selectedIdx: number;
  search: string;
  onSearchChange: (value: string) => void;
  onSelectPhrase: (idx: number) => void;
}

const PhraseList: React.FC<PhraseListProps> = ({
  phrases,
  selectedIdx,
  search,
  onSearchChange,
  onSelectPhrase,
}) => {
  return (
    <div className="list-section">
      <input
        type="text"
        placeholder="Search phrases..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className="search-bar"
      />
      <ul className="list-wrapper">
        {phrases.map((phrase, idx) => (
          <li key={idx} className="list-item">
            <button
              className={`list-item-btn${selectedIdx === idx ? ' selected' : ''}`}
              onClick={() => onSelectPhrase(idx)}
            >
              {phrase.value}
            </button>
          </li>
        ))}
        {phrases.length === 0 && (
          <li className="no-items-msg">No phrases found.</li>
        )}
      </ul>
    </div>
  );
};

export default PhraseList; 