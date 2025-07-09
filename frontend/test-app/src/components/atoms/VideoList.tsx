import React from 'react';
import { type Video } from '../../model/library';

interface VideoListProps {
  videos: Video[];
  selectedIdx: number;
  search: string;
  onSearchChange: (value: string) => void;
  onSelectVideo: (idx: number) => void;
}

const VideoList: React.FC<VideoListProps> = ({
  videos,
  selectedIdx,
  search,
  onSearchChange,
  onSelectVideo,
}) => {
  return (
    <div className="list-section">
      <input
        type="text"
        placeholder="Search videos..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className="search-bar"
      />
      <ul className="list-wrapper">
        {videos.map((video, idx) => (
          <li key={idx} className="list-item">
            <button
              className={`list-item-btn${selectedIdx === idx ? ' selected' : ''}`}
              onClick={() => onSelectVideo(idx)}
            >
              {video.name}
            </button>
          </li>
        ))}
        {videos.length === 0 && (
          <li className="no-items-msg">No videos found.</li>
        )}
      </ul>
    </div>
  );
};

export default VideoList; 