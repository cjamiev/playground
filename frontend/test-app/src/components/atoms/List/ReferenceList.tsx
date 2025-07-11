import React from 'react';
import { type Reference } from '../../../model/library';

interface ReferenceListProps {
  references: Reference[];
  selectedIdx: number;
  search: string;
  onSearchChange: (value: string) => void;
  onSelectReference: (idx: number) => void;
}

const ReferenceList: React.FC<ReferenceListProps> = ({
  references,
  selectedIdx,
  search,
  onSearchChange,
  onSelectReference,
}) => {
  return (
    <div className="list-section">
      <input
        type="text"
        placeholder="Search references..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className="search-bar"
      />
      <ul className="list-wrapper">
        {references.map((reference, idx) => (
          <li key={idx} className="list-item">
            <button
              className={`list-item-btn${selectedIdx === idx ? ' selected' : ''}`}
              onClick={() => onSelectReference(idx)}
            >
              {reference.value}
            </button>
          </li>
        ))}
        {references.length === 0 && (
          <li className="no-items-msg">No references found.</li>
        )}
      </ul>
    </div>
  );
};

export default ReferenceList; 