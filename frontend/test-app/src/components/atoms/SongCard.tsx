import React from 'react';
import { type Song } from '../../model/library';

interface SongCardProps {
  song: Song;
  onEdit: () => void;
  handleSearchClick: (selectedText: string) => void;
}

const SongCard: React.FC<SongCardProps> = ({ song, onEdit, handleSearchClick }) => {
  return (
    <div className='card-wrapper'>
      <>
        <div className="card-title-wrapper">
          <h2 className="card-title">{song.name}</h2>
        </div>
        <div>
          <span className="card-label">Album:</span> <span className="card-text">{song.album}</span>
        </div>
        <div>
          <span className="card-label">Band:</span> <span className="card-text" onClick={() => { handleSearchClick(song.band); }}>{song.band}</span>
        </div>
        <div>
          <span className="card-label">Rank:</span> <span className="card-text">{song.rank}</span>
        </div>
        <div>
          <span className="card-label">Link:</span> <a href={song.link} target="_blank" rel="noopener noreferrer" className="card-google-link">Open</a>
        </div>
        <div className="item-tags-row">
          <span className="card-label">Tags:</span> {song.tags.split(",").map((tag, i) => (
            <span key={i} className="item-tag">{tag}</span>
          ))}
        </div>
        <div className="card-footer">
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(song.name + ' ' + song.album)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-google-link"
          >
            Google Song
          </a>
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(song.name + ' ' + song.album)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-google-link"
          >
            YouTube
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

export default SongCard; 