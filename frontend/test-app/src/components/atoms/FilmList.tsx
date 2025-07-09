import React from 'react';
import { type Film } from '../../model/library';

interface FilmListProps {
  films: Film[];
  selectedIdx: number;
  search: string;
  onSearchChange: (value: string) => void;
  onSelectFilm: (idx: number) => void;
}

const FilmList: React.FC<FilmListProps> = ({
  films,
  selectedIdx,
  search,
  onSearchChange,
  onSelectFilm,
}) => {
  return (
    <div className="list-section">
      <input
        type="text"
        placeholder="Search films..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className="search-bar"
      />
      <ul className="list-wrapper">
        {films.map((film, idx) => (
          <li key={idx} className="list-item">
            <button
              className={`list-item-btn${selectedIdx === idx ? ' selected' : ''}`}
              onClick={() => onSelectFilm(idx)}
            >
              {film.name}
            </button>
          </li>
        ))}
        {films.length === 0 && (
          <li className="no-items-msg">No films found.</li>
        )}
      </ul>
    </div>
  );
};

export default FilmList; 