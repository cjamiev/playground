import React from 'react';
import type { Show } from '../../../model/library';

interface ShowCardProps {
  show: Show;
  onEdit: () => void;
  onClone: () => void;
  onDelete: () => void;
  onHandleClickTag: (tag: string) => void;
}

const ShowCard: React.FC<ShowCardProps> = ({ show, onEdit, onClone, onDelete, onHandleClickTag }) => {
  return (
    <div className="card-wrapper">
      <div className="card-header">
        <h2 className="card-title">{show.name}</h2>
      </div>
      <div className="card-content">
        <div>
          <span className="card-label">Rank:</span>
          <span className="card-text">{show.rank}</span>
        </div>
        <div>
          {show.tags.length ? (
            <div className="tags-container">
              <span className="card-label">Tags:</span>
              {show.tags.split(',').map((tag, i) => (
                <button key={i} className="tag-btn" onClick={() => onHandleClickTag(tag)}>
                  {tag}
                </button>
              ))}
            </div>
          ) : null}
        </div>
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

export default ShowCard;
