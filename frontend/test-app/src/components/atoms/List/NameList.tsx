import React from 'react';
import { type Name } from '../../../model/library';

interface NameListProps {
  names: Name[];
  selectedIdx: number;
  search: string;
  onSearchChange: (value: string) => void;
  onSelectName: (idx: number) => void;
}

const NameList: React.FC<NameListProps> = ({
  names,
  selectedIdx,
  search,
  onSearchChange,
  onSelectName,
}) => {
  return (
    <div className="list-section">
      <input
        type="text"
        placeholder="Search names..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className="search-bar"
      />
      <ul className="list-wrapper">
        {names.map((name, idx) => (
          <li key={idx} className="list-item">
            <button
              className={`list-item-btn${selectedIdx === idx ? ' selected' : ''}`}
              onClick={() => onSelectName(idx)}
            >
              {name.value}
            </button>
          </li>
        ))}
        {names.length === 0 && (
          <li className="library-cards-no-Names">No names found.</li>
        )}
      </ul>
    </div>
  );
};

export default NameList; 