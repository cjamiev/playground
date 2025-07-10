import React, { useState, useEffect } from 'react';
import VideoForm from '../atoms/VideoForm';
import VideoCard from '../atoms/VideoCard';
import VideoList from '../atoms/VideoList';
import { DefaultVideo, type Video } from '../../model/library';
import api from '../../api';

const VideoPage: React.FC = () => {
  const [isLoadingVideos, setIsLoadingVideos] = useState<boolean>(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Video>(DefaultVideo);

  const filteredVideos = videos.filter((v: Video) =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.tags.split(',').some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );
  const sortedVideos = [...filteredVideos];
  const selectedVideo = sortedVideos[selectedIdx] || sortedVideos[0];

  useEffect(() => {
    if (sortedVideos.length === 0) return;
    if (!sortedVideos[selectedIdx]) setSelectedIdx(0);
  }, [search, sortedVideos.length, sortedVideos, selectedIdx]);
  const loadVideoRecords = () => {
    api.get('http://localhost:3000/library/specific-type?type=videos')
      .then(response => setVideos(JSON.parse(response.data.records)))
      .catch(error => console.error('Error:', error))
      .finally(() => { setIsLoadingVideos(false) });
  }

  useEffect(() => {
    if (isLoadingVideos) {
      loadVideoRecords();
    }
  }, [isLoadingVideos]);

  const handleSubmit = (videos: Video[]) => {
    api.put('http://localhost:3000/library/update-records', JSON.stringify({
      type: 'videos',
      records: JSON.stringify(videos)
    }))
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }

  const handleAddVideo = (form: Video) => {
    const newVideo = {
      name: form.name,
      link: form.link,
      tags: form.tags,
    };
    setVideos(prev => {
      const updatedVideos = [newVideo, ...prev];
      handleSubmit(updatedVideos);
      return updatedVideos;
    });
    setSearch('');
    setSelectedIdx(0);
  };

  const handleEditVideo = (form: Video) => {
    setVideos(prev => {
      const updatedVideos = prev.map((v) =>
        v.name === selectedVideo.name
          ? {
            name: form.name,
            link: form.link,
            tags: form.tags,
          }
          : v
      ).filter((w) => w.name !== 'delete');
      handleSubmit(updatedVideos);
      return updatedVideos;
    });
    setIsEditing(false);
    setEditForm(DefaultVideo);
  };

  const startEdit = () => {
    setEditForm({
      name: selectedVideo.name,
      link: selectedVideo.link,
      tags: selectedVideo.tags,
    });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditForm(DefaultVideo);
  };

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Videos</h1>
      <div className="page-body-layout">
        <VideoList
          videos={sortedVideos}
          selectedIdx={selectedIdx}
          search={search}
          onSearchChange={setSearch}
          onSelectVideo={setSelectedIdx}
        />
        {sortedVideos.length > 0 && (
          <VideoCard video={selectedVideo} onEdit={startEdit} />
        )}
        <VideoForm onSubmit={isEditing ? handleEditVideo : handleAddVideo} initialValues={editForm} isEditing={isEditing} cancelEdit={cancelEdit} />
      </div>
    </div>
  );
};

export default VideoPage; 