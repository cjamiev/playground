import React from 'react';
import { type Game } from '../../model/library';

interface GameListProps {
  games: Game[];
  selectedIdx: number;
  search: string;
  onSearchChange: (value: string) => void;
  onSelectGame: (idx: number) => void;
}

const GameList: React.FC<GameListProps> = ({
  games,
  selectedIdx,
  search,
  onSearchChange,
  onSelectGame,
}) => {
  return (
    <div className="list-section">
      <input
        type="text"
        placeholder="Search games..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className="search-bar"
      />
      <ul className="list-wrapper">
        {games.map((game, idx) => (
          <li key={idx} className="list-item">
            <button
              className={`list-item-btn${selectedIdx === idx ? ' selected' : ''}`}
              onClick={() => onSelectGame(idx)}
            >
              {game.name}
            </button>
          </li>
        ))}
        {games.length === 0 && (
          <li className="no-items-msg">No games found.</li>
        )}
      </ul>
    </div>
  );
};

export default GameList; 