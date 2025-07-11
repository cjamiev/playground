import React from 'react';
import { type Show } from '../../../model/library';

interface ShowListProps {
  shows: Show[];
  selectedIdx: number;
  search: string;
  onSearchChange: (value: string) => void;
  onSelectShow: (idx: number) => void;
}

const ShowList: React.FC<ShowListProps> = ({
  shows,
  selectedIdx,
  search,
  onSearchChange,
  onSelectShow,
}) => {
  return (
    <div className="list-section">
      <input
        type="text"
        placeholder="Search shows..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className="search-bar"
      />
      <ul className="list-wrapper">
        {shows.map((show, idx) => (
          <li key={idx} className="list-item">
            <button
              className={`list-item-btn${selectedIdx === idx ? ' selected' : ''}`}
              onClick={() => onSelectShow(idx)}
            >
              {show.name}
            </button>
          </li>
        ))}
        {shows.length === 0 && (
          <li className="no-items-msg">No shows found.</li>
        )}
      </ul>
    </div>
  );
};

export default ShowList; 