import React from 'react';
import { type Song } from '../../model/library';

interface SongListProps {
  songs: Song[];
  selectedIdx: number;
  search: string;
  onSearchChange: (value: string) => void;
  onSelectSong: (idx: number) => void;
}

const SongList: React.FC<SongListProps> = ({
  songs,
  selectedIdx,
  search,
  onSearchChange,
  onSelectSong,
}) => {
  return (
    <div className="list-section">
      <input
        type="text"
        placeholder="Search songs..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className="search-bar"
      />
      <ul className="list-wrapper">
        {songs.map((song, idx) => (
          <li key={idx} className="list-item">
            <button
              className={`list-item-btn${selectedIdx === idx ? ' selected' : ''}`}
              onClick={() => onSelectSong(idx)}
            >
              {song.name}
            </button>
          </li>
        ))}
        {songs.length === 0 && (
          <li className="no-items-msg">No songs found.</li>
        )}
      </ul>
    </div>
  );
};

export default SongList; 