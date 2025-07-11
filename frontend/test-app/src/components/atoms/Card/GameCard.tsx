import React from 'react';
import { type Game } from '../../../model/library';

interface GameCardProps {
  game: Game;
  onEdit: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onEdit }) => {
  return (
    <div className='card-wrapper'>
      <>
        <div className="card-title-wrapper">
          <h2 className="card-title">{game.name}</h2>
        </div>
        <div>
          <span className="card-label">Lowest Price:</span> <span className="card-text">{game.lowestPrice}</span>
        </div>
        <div>
          <span className="card-label">Price:</span> <span className="card-text">{game.price}</span>
        </div>
        <div>
          <span className="card-label">Release Date:</span> <span className="card-text">{game.releaseDate}</span>
        </div>
        <div>
          <span className="card-label">Rank:</span> <span className="card-text">{game.rank}</span>
        </div>
        <div className="item-tags-row">
          <span className="card-label">Tags:</span> {game.tags.split(",").map((tag, i) => (
            <span key={i} className="item-tag">{tag}</span>
          ))}
        </div>
        <div className="card-footer">
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(game.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-google-link"
          >
            Google Game
          </a>
          <button
            onClick={onEdit}
            className="card-edit-btn"
          >
            Edit
          </button>
        </div>
      </>
    </div>
  );
};

export default GameCard; 