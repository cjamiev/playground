import React, { useState, useEffect } from 'react';
import SongForm from '../atoms/SongForm';
import SongCard from '../atoms/SongCard';
import SongList from '../atoms/SongList';
import { DefaultSong, type Song } from '../../model/library';
import api from '../../api';

const SongPage: React.FC = () => {
  const [isLoadingSongs, setIsLoadingSongs] = useState<boolean>(true);
  const [songs, setSongs] = useState<Song[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Song>(DefaultSong);

  const filteredSongs = songs.filter((s: Song) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.album.toLowerCase().includes(search.toLowerCase()) ||
    s.band.toLowerCase().includes(search.toLowerCase()) ||
    s.tags.split(',').some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );
  const sortedSongs = [...filteredSongs].sort((a, b) => a.rank - b.rank);
  const selectedSong = sortedSongs[selectedIdx] || sortedSongs[0];

  useEffect(() => {
    if (sortedSongs.length === 0) return;
    if (!sortedSongs[selectedIdx]) setSelectedIdx(0);
  }, [search, sortedSongs.length, sortedSongs, selectedIdx]);
  const loadSongRecords = () => {
    api.get('http://localhost:3000/library/specific-type?type=songs')
      .then(response => setSongs(JSON.parse(response.data.records)))
      .catch(error => console.error('Error:', error))
      .finally(() => { setIsLoadingSongs(false) });
  }

  useEffect(() => {
    if (isLoadingSongs) {
      loadSongRecords();
    }
  }, [isLoadingSongs]);

  const handleSubmit = (songs: Song[]) => {
    api.put('http://localhost:3000/library/update-records', JSON.stringify({
      type: 'songs',
      records: JSON.stringify(songs)
    }))
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }

  const handleAddSong = (form: Song) => {
    const newSong = {
      id: String(songs.length + 1),
      name: form.name,
      album: form.album,
      band: form.band,
      rank: form.rank,
      link: form.link,
      tags: form.tags,
    };
    setSongs(prev => {
      const updatedSongs = [newSong, ...prev];
      handleSubmit(updatedSongs);
      return updatedSongs;
    });
    setSearch('');
    setSelectedIdx(0);
  };

  const handleEditSong = (form: Song) => {
    setSongs(prev => {
      const updatedSongs = prev.map((s) =>
        s.id === selectedSong.id
          ? {
            id: s.id,
            name: form.name,
            album: form.album,
            band: form.band,
            rank: form.rank,
            link: form.link,
            tags: form.tags,
          }
          : s
      ).filter((w) => w.name !== 'delete');
      handleSubmit(updatedSongs);
      return updatedSongs;
    });
    setIsEditing(false);
    setEditForm(DefaultSong);
  };

  const startEdit = () => {
    setEditForm({
      id: selectedSong.id,
      name: selectedSong.name,
      album: selectedSong.album,
      band: selectedSong.band,
      rank: selectedSong.rank,
      link: selectedSong.link,
      tags: selectedSong.tags,
    });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditForm(DefaultSong);
  };

  const handleSearchClick = (selectedText: string) => {
    setSearch(selectedText);
  }

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Songs</h1>
      <div className="page-body-layout">
        <SongList
          songs={sortedSongs}
          selectedIdx={selectedIdx}
          search={search}
          onSearchChange={setSearch}
          onSelectSong={setSelectedIdx}
        />
        {sortedSongs.length > 0 && (
          <SongCard song={selectedSong} onEdit={startEdit} handleSearchClick={handleSearchClick} />
        )}
        <SongForm onSubmit={isEditing ? handleEditSong : handleAddSong} initialValues={editForm} isEditing={isEditing} cancelEdit={cancelEdit} />
      </div>
    </div>
  );
};

export default SongPage; 