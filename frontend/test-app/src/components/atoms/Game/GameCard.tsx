import React from 'react';
import { type Game } from '../../../model/library';

interface GameCardProps {
  game: Game;
  onEdit: () => void;
  onClone: () => void;
  onDelete: () => void;
  onHandleClickTag: (tag: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onEdit, onClone, onDelete, onHandleClickTag }) => {
  return (
    <div className="card-wrapper">
      <div className="card-header">
        <h2 className="card-title">{game.name}</h2>
      </div>
      <div>
        <span className="card-label">Rank:</span> <span className="card-text">{game.rank}</span>
      </div>
      <div>
        <span className="card-label">Lowest Price:</span> <span className="card-text">{game.lowestPrice}</span>
      </div>
      <a
        className="url-link"
        href={`https://www.google.com/search?q=${encodeURIComponent(game.name + ' game')}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Google
      </a>
      <div>
        {game.tags.length ? (
          <div className="tags-container">
            <span className="card-label">Tags:</span>
            {game.tags.split(',').map((tag: string, i: number) => (
              <button key={i} className="tag-btn" onClick={() => onHandleClickTag(tag)}>
                {tag}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <div className="card-footer">
        <button className="primary-btn" onClick={onClone}>
          Clone
        </button>
        <button className="primary-btn" onClick={onEdit}>
          Edit
        </button>
        <button className="negative-btn" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default GameCard;
