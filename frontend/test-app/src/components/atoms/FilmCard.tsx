import React from 'react';
import { type Film } from '../../model/library';

interface FilmCardProps {
  film: Film;
  onEdit: () => void;
}

const FilmCard: React.FC<FilmCardProps> = ({ film, onEdit }) => {
  return (
    <div className='card-wrapper'>
      <>
        <div className="card-title-wrapper">
          <h2 className="card-title">{film.name}</h2>
        </div>
        <div>
          <span className="card-label">Service:</span> <span className="card-text">{film.service}</span>
        </div>
        <div>
          <span className="card-label">Rank:</span> <span className="card-text">{film.rank}</span>
        </div>
        <div className="item-tags-row">
          <span className="card-label">Tags:</span> {film.tags.split(",").map((tag, i) => (
            <span key={i} className="item-tag">{tag}</span>
          ))}
        </div>
        <div className="card-footer">
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(film.name + ' ' + film.service)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-google-link"
          >
            Google Film
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

export default FilmCard; 