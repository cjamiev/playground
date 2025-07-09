import React from 'react';
import { type Video } from '../../model/library';

interface VideoCardProps {
  video: Video;
  onEdit: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onEdit }) => {
  return (
    <div className='card-wrapper'>
      <>
        <div className="card-title-wrapper">
          <h2 className="card-title">{video.name}</h2>
        </div>
        <div>
          <span className="card-label">Link:</span> <a href={video.link} target="_blank" rel="noopener noreferrer" className="card-google-link">Open</a>
        </div>
        <div className="item-tags-row">
          <span className="card-label">Tags:</span> {video.tags.split(",").map((tag, i) => (
            <span key={i} className="item-tag">{tag}</span>
          ))}
        </div>
        <div className="card-footer">
          <a
            href={`https://www.google.com/search?q=${encodeURIComponent(video.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-google-link"
          >
            Google Video
          </a>
          <a
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(video.name)}`}
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

export default VideoCard; 