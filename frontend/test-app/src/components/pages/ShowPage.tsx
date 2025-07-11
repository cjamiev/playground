import React, { useState, useEffect } from 'react';
import ShowForm from '../atoms/Form/ShowForm';
import ShowCard from '../atoms/Card/ShowCard';
import ShowList from '../atoms/List/ShowList';
import { DefaultShow, type Show } from '../../model/library';
import api from '../../api';

const ShowPage: React.FC = () => {
  const [isLoadingShows, setIsLoadingShows] = useState<boolean>(true);
  const [shows, setShows] = useState<Show[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Show>(DefaultShow);

  const filteredShows = shows.filter((s: Show) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.service.toLowerCase().includes(search.toLowerCase()) ||
    s.tags.split(',').some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );
  const sortedShows = [...filteredShows].sort((a, b) => a.rank - b.rank);
  const selectedShow = sortedShows[selectedIdx] || sortedShows[0];

  useEffect(() => {
    if (sortedShows.length === 0) return;
    if (!sortedShows[selectedIdx]) setSelectedIdx(0);
  }, [search, sortedShows.length, sortedShows, selectedIdx]);
  const loadShowRecords = () => {
    api.get('http://localhost:3000/library/specific-type?type=shows')
      .then(response => setShows(JSON.parse(response.data.records)))
      .catch(error => console.error('Error:', error))
      .finally(() => { setIsLoadingShows(false) });
  }

  useEffect(() => {
    if (isLoadingShows) {
      loadShowRecords();
    }
  }, [isLoadingShows]);

  const handleSubmit = (shows: Show[]) => {
    api.put('http://localhost:3000/library/update-records', JSON.stringify({
      type: 'shows',
      records: JSON.stringify(shows)
    }))
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }

  const handleAddShow = (form: Show) => {
    const newShow = {
      name: form.name,
      rank: form.rank,
      service: form.service,
      tags: form.tags,
    };
    setShows(prev => {
      const updatedShows = [newShow, ...prev];
      handleSubmit(updatedShows);
      return updatedShows;
    });
    setSearch('');
    setSelectedIdx(0);
  };

  const handleEditShow = (form: Show) => {
    setShows(prev => {
      const updatedShows = prev.map((s) =>
        s.name === selectedShow.name
          ? {
            name: form.name,
            rank: form.rank,
            service: form.service,
            tags: form.tags,
          }
          : s
      ).filter((w) => w.name !== 'delete');
      handleSubmit(updatedShows);
      return updatedShows;
    });
    setIsEditing(false);
    setEditForm(DefaultShow);
  };

  const startEdit = () => {
    setEditForm({
      name: selectedShow.name,
      rank: selectedShow.rank,
      service: selectedShow.service,
      tags: selectedShow.tags,
    });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditForm(DefaultShow);
  };

  return (
    <div className="page-wrapper">
      <h1 className="page-title">Shows</h1>
      <div className="page-body-layout">
        <ShowList
          shows={sortedShows}
          selectedIdx={selectedIdx}
          search={search}
          onSearchChange={setSearch}
          onSelectShow={setSelectedIdx}
        />
        {sortedShows.length > 0 && (
          <ShowCard show={selectedShow} onEdit={startEdit} />
        )}
        <ShowForm onSubmit={isEditing ? handleEditShow : handleAddShow} initialValues={editForm} isEditing={isEditing} cancelEdit={cancelEdit} />
      </div>
    </div>
  );
};

export default ShowPage; 