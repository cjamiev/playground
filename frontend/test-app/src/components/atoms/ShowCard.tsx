import React from 'react';
import { type Show } from '../../model/library';

interface ShowCardProps {
  show: Show;
  onEdit: () => void;
}

const ShowCard: React.FC<ShowCardProps> = ({ show, onEdit }) => {
  return (
    <div className='card-wrapper'>
      <>
        <div className="card-title-wrapper">
          <h2 className="card-title">{show.name}</h2>
        </div>
        <div>
          <span className="card-label">Service:</span> <span className="card-text">{show.service}</span>
        </div>
        <div>
          <span className="card-label">Rank:</span> <span className="card-text">{show.rank}</span>
        </div>
        <div className="item-tags-row">
          <span className="card-label">Tags:</span> {show.tags.split(",").map((tag, i) => (
            <span key={i} className="item-tag">{tag}</span>
          ))}
        </div>
        <div className="card-footer">
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(show.name + ' ' + show.service)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-google-link"
          >
            Google Show
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

export default ShowCard; 